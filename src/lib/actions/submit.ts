"use server";

import type { z } from "zod";
import { notifyNewSubmission } from "@/lib/email";
import { looksLikeSpam } from "@/lib/spam";
import { createSubmission } from "@/lib/submissions";
import { inquirySchema, partnershipSchema, volunteerSchema } from "@/lib/validation";

export type FormState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string; fieldErrors?: Record<string, string[] | undefined> };

async function handle<S extends z.ZodType<{ website?: string; startedAt: number }>>(
  schema: S,
  formData: FormData,
  toRow: (data: z.infer<S>) => Parameters<typeof createSubmission>[0],
): Promise<FormState> {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const fieldErrors: Record<string, string[]> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      (fieldErrors[key] ??= []).push(issue.message);
    }
    return { status: "error", message: "Please check the highlighted fields.", fieldErrors };
  }

  // Pretend success so bots get no signal.
  if (looksLikeSpam(parsed.data)) return { status: "success" };

  try {
    const row = await createSubmission(toRow(parsed.data));
    await notifyNewSubmission(row);
    return { status: "success" };
  } catch (err) {
    console.error("Failed to save submission", err);
    return { status: "error", message: "Something went wrong. Please try again later." };
  }
}

export async function submitVolunteer(_prev: FormState, formData: FormData) {
  return handle(volunteerSchema, formData, (d) => ({
    type: "volunteer",
    name: d.name,
    email: d.email,
    skills: d.skills || null,
    message: d.message || null,
  }));
}

export async function submitPartnership(_prev: FormState, formData: FormData) {
  return handle(partnershipSchema, formData, (d) => ({
    type: "partnership",
    name: d.name,
    email: d.email,
    organization: d.organization,
    sector: d.sector,
    message: d.message || null,
  }));
}

export async function submitInquiry(_prev: FormState, formData: FormData) {
  return handle(inquirySchema, formData, (d) => ({
    type: "inquiry",
    topic: d.topic,
    name: d.name,
    email: d.email,
    organization: d.organization || null,
    phone: d.phone || null,
    message: d.message,
  }));
}
