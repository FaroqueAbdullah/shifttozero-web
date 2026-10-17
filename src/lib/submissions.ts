import "server-only";
import { and, count, desc, eq, gte, sql } from "drizzle-orm";
import { getDb } from "@/db";
import {
  submissionNotes,
  submissions,
  type NewSubmission,
  type SubmissionStatus,
  type SubmissionType,
} from "@/db/schema";

/*
 * The only module that touches submission storage. Forms, the admin inbox and
 * the dashboard go through these functions, so the backing store can change
 * without touching callers.
 */

export async function createSubmission(data: Omit<NewSubmission, "id" | "status" | "createdAt">) {
  const [row] = await getDb().insert(submissions).values(data).returning();
  return row;
}

export async function listSubmissions(filters: { type?: SubmissionType; status?: SubmissionStatus } = {}) {
  const where = and(
    filters.type ? eq(submissions.type, filters.type) : undefined,
    filters.status ? eq(submissions.status, filters.status) : undefined,
  );
  return getDb().select().from(submissions).where(where).orderBy(desc(submissions.createdAt)).limit(200);
}

export async function getSubmission(id: string) {
  const db = getDb();
  const [submission] = await db.select().from(submissions).where(eq(submissions.id, id));
  if (!submission) return null;
  const notes = await db
    .select()
    .from(submissionNotes)
    .where(eq(submissionNotes.submissionId, id))
    .orderBy(desc(submissionNotes.createdAt));
  return { ...submission, notes };
}

export async function setSubmissionStatus(id: string, status: SubmissionStatus) {
  await getDb().update(submissions).set({ status }).where(eq(submissions.id, id));
}

export async function addSubmissionNote(submissionId: string, author: string, body: string) {
  const [note] = await getDb().insert(submissionNotes).values({ submissionId, author, body }).returning();
  return note;
}

/** Counts per day since `since`, for the dashboard trend chart. */
export async function submissionCountsByDay(since: Date) {
  const day = sql<string>`to_char(date_trunc('day', ${submissions.createdAt}), 'YYYY-MM-DD')`;
  return getDb()
    .select({ day, count: count() })
    .from(submissions)
    .where(gte(submissions.createdAt, since))
    .groupBy(day)
    .orderBy(day);
}

export async function countNewSubmissions() {
  const [row] = await getDb()
    .select({ count: count() })
    .from(submissions)
    .where(eq(submissions.status, "new"));
  return row?.count ?? 0;
}
