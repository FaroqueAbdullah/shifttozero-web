import Link from "next/link";
import { format } from "date-fns";
import { Icon } from "@/components/atoms/Icon";
import { StatusDot } from "@/components/atoms/StatusDot";
import type { Submission, SubmissionNote, SubmissionStatus } from "@/db/schema";
import { addNote, updateSubmissionStatus } from "@/lib/actions/adminSubmission";
import { cn } from "@/lib/utils";

export const TYPE_LABEL = {
  volunteer: "Volunteer Application",
  partnership: "Corporate Partnership",
  inquiry: "General Inquiry",
} as const;

const statusTone = { new: "primary", reviewed: "tertiary", contacted: "neutral" } as const;
const STATUSES: SubmissionStatus[] = ["new", "reviewed", "contacted"];

type InboxProps = {
  items: Submission[];
  selected: (Submission & { notes: SubmissionNote[] }) | null;
  status?: SubmissionStatus;
};

const href = (params: { id?: string; status?: string }) => {
  const q = new URLSearchParams(Object.entries(params).filter(([, v]) => v) as [string, string][]);
  return `/admin/submissions${q.size ? `?${q}` : ""}`;
};

export function SubmissionsInbox({ items, selected, status }: InboxProps) {
  return (
    <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-[400px_1fr]">
      <div className="flex flex-col gap-4">
        <nav aria-label="Filter by status" className="flex gap-2">
          {[undefined, ...STATUSES].map((s) => (
            <Link
              key={s ?? "all"}
              href={href({ status: s })}
              aria-current={status === s ? "page" : undefined}
              className={cn(
                "rounded-full border px-4 py-1.5 font-label-md text-label-md capitalize",
                status === s
                  ? "border-primary bg-primary-container text-on-primary-container"
                  : "border-outline-variant text-on-surface hover:border-primary hover:text-primary",
              )}
            >
              {s ?? "All"}
            </Link>
          ))}
        </nav>
        <ul className="divide-y divide-outline-variant overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest">
          {items.length === 0 && <li className="p-6 text-on-surface-variant">No submissions.</li>}
          {items.map((s) => (
            <li key={s.id}>
              <Link
                href={href({ id: s.id, status })}
                aria-current={s.id === selected?.id ? "true" : undefined}
                className={cn(
                  "block border-l-4 p-4 transition-colors hover:bg-surface-container-low",
                  s.id === selected?.id ? "border-primary bg-primary-container/10" : "border-transparent",
                )}
              >
                <div className="mb-1 flex items-center justify-between gap-2">
                  <StatusDot
                    tone={statusTone[s.status]}
                    label={s.status[0].toUpperCase() + s.status.slice(1)}
                  />
                  <time className="font-caption text-caption text-on-surface-variant">
                    {format(s.createdAt, "MMM d, HH:mm")}
                  </time>
                </div>
                <p className="font-label-md text-label-md text-on-surface">{s.organization ?? s.name}</p>
                <p className="font-caption text-caption text-primary">{TYPE_LABEL[s.type]}</p>
                {s.message && (
                  <p className="mt-1 line-clamp-2 font-body-md text-body-md text-on-surface-variant">
                    {s.message}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6 md:p-8">
        {!selected ? (
          <div className="flex h-full min-h-64 flex-col items-center justify-center text-center text-on-surface-variant">
            <Icon name="inbox" className="mb-3 text-[48px] text-outline" />
            Select a submission to view details.
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4 border-b border-outline-variant pb-6 md:flex-row md:items-start md:justify-between">
              <div>
                <p className="font-caption text-caption text-on-surface-variant">
                  Received {format(selected.createdAt, "PPp")}
                </p>
                <h2 className="font-headline-md text-headline-md text-on-surface">{selected.name}</h2>
                <p className="font-label-md text-label-md text-primary">{TYPE_LABEL[selected.type]}</p>
              </div>
              <div className="flex gap-2">
                <form action={updateSubmissionStatus} className="flex gap-2">
                  <input type="hidden" name="id" value={selected.id} />
                  <label htmlFor="submission-status" className="sr-only">
                    Status
                  </label>
                  <select
                    id="submission-status"
                    name="status"
                    defaultValue={selected.status}
                    className="rounded-lg border-outline-variant bg-surface font-label-md text-label-md text-on-surface focus:border-primary focus:ring-primary"
                  >
                    <option value="new">Mark as New</option>
                    <option value="reviewed">Mark as Reviewed</option>
                    <option value="contacted">Mark as Contacted</option>
                  </select>
                  <button className="rounded-lg border border-secondary px-4 py-2 font-label-md text-label-md text-secondary hover:bg-secondary/5">
                    Save
                  </button>
                </form>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent("Re: your message to Shift to Zero Carbon")}`}
                  className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary hover:bg-primary-container hover:text-on-primary-container"
                >
                  <Icon name="reply" className="text-[18px]" /> Reply
                </a>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {(
                [
                  ["sell", "Topic", selected.topic],
                  ["mail", "Email Address", selected.email],
                  ["domain", "Organization", selected.organization],
                  ["call", "Phone Number", selected.phone],
                  ["factory", "Sector", selected.sector],
                  ["psychology", "Skills", selected.skills],
                  ["location_on", "Location", selected.location],
                ] as const
              )
                .filter(([, , v]) => v)
                .map(([icon, k, v]) => (
                  <div key={k} className="rounded-lg border border-outline-variant bg-surface p-4">
                    <dt className="mb-1 font-caption text-caption text-on-surface-variant">{k}</dt>
                    <dd className="flex items-center gap-2 text-on-surface">
                      <Icon name={icon} className="text-[18px] text-primary" />
                      <span className="break-all">{v}</span>
                    </dd>
                  </div>
                ))}
            </dl>

            {selected.message && (
              <div>
                <h3 className="mb-3 font-label-md text-label-md text-on-surface-variant uppercase">
                  Message Content
                </h3>
                <p className="rounded-lg bg-surface-container-low p-6 font-body-md text-body-md whitespace-pre-line text-on-surface">
                  {selected.message}
                </p>
              </div>
            )}

            <div>
              <h3 className="mb-3 font-label-md text-label-md text-on-surface-variant uppercase">
                Internal Notes
              </h3>
              <ul className="mb-4 space-y-2">
                {selected.notes.map((n) => (
                  <li key={n.id} className="rounded-lg bg-surface-container-low p-3">
                    <p className="font-caption text-caption text-on-surface-variant">
                      {n.author} · {format(n.createdAt, "PPp")}
                    </p>
                    <p className="whitespace-pre-line text-on-surface">{n.body}</p>
                  </li>
                ))}
              </ul>
              <form action={addNote} className="flex flex-col gap-2">
                <input type="hidden" name="id" value={selected.id} />
                <label htmlFor="note-body" className="sr-only">
                  Internal note
                </label>
                <textarea
                  id="note-body"
                  name="body"
                  rows={3}
                  required
                  placeholder="Add an internal note..."
                  className="rounded-lg border-outline-variant bg-surface text-on-surface placeholder:text-outline focus:border-primary focus:ring-primary"
                />
                <button className="self-end rounded-lg bg-primary px-4 py-2 font-label-md text-label-md text-on-primary hover:bg-primary-container hover:text-on-primary-container">
                  Save Note
                </button>
              </form>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
