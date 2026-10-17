import "server-only";
import { Resend } from "resend";
import type { Submission } from "@/db/schema";

const LABELS: Record<Submission["type"], string> = {
  volunteer: "Volunteer application",
  partnership: "Corporate partnership",
  inquiry: "General inquiry",
};

function escape(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

/** Notify the team about a new submission. Never throws: a failed email must not lose the submission. */
export async function notifyNewSubmission(s: Submission) {
  const { RESEND_API_KEY, NOTIFY_EMAIL_TO, NOTIFY_EMAIL_FROM, NEXT_PUBLIC_SITE_URL } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL_TO || !NOTIFY_EMAIL_FROM) {
    console.warn("Resend not configured; skipping submission email");
    return;
  }

  const rows = [
    ["Name", s.name],
    ["Email", s.email],
    ["Topic", s.topic],
    ["Organization", s.organization],
    ["Sector", s.sector],
    ["Phone", s.phone],
    ["Skills", s.skills],
    ["Message", s.message],
  ].filter((r): r is [string, string] => Boolean(r[1]));

  const html = `
    <h2>New ${LABELS[s.type]}</h2>
    <table cellpadding="6">${rows
      .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escape(v).replace(/\n/g, "<br>")}</td></tr>`)
      .join("")}</table>
    <p><a href="${NEXT_PUBLIC_SITE_URL ?? ""}/admin/submissions?id=${s.id}">Open in admin</a></p>`;

  try {
    await new Resend(RESEND_API_KEY).emails.send({
      from: NOTIFY_EMAIL_FROM,
      to: NOTIFY_EMAIL_TO.split(",").map((e) => e.trim()),
      replyTo: s.email,
      subject: `New ${LABELS[s.type]}${s.topic ? ` (${s.topic})` : ""}: ${s.organization ?? s.name}`,
      html,
    });
  } catch (err) {
    console.error("Failed to send submission email", err);
  }
}
