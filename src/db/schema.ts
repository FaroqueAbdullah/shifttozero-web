import { index, pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const submissionType = pgEnum("submission_type", ["volunteer", "partnership", "inquiry"]);
export const submissionStatus = pgEnum("submission_status", ["new", "reviewed", "contacted"]);

export const submissions = pgTable(
  "submissions",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    type: submissionType("type").notNull(),
    status: submissionStatus("status").notNull().default("new"),
    name: text("name").notNull(),
    email: text("email").notNull(),
    organization: text("organization"),
    phone: text("phone"),
    location: text("location"),
    sector: text("sector"),
    /** Contact form topic, e.g. "Funding". */
    topic: text("topic"),
    skills: text("skills"),
    message: text("message"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("submissions_created_at_idx").on(t.createdAt), index("submissions_status_idx").on(t.status)],
);

export const submissionNotes = pgTable(
  "submission_notes",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    submissionId: uuid("submission_id")
      .notNull()
      .references(() => submissions.id, { onDelete: "cascade" }),
    author: text("author").notNull(),
    body: text("body").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [index("submission_notes_submission_id_idx").on(t.submissionId)],
);

export type Submission = typeof submissions.$inferSelect;
export type NewSubmission = typeof submissions.$inferInsert;
export type SubmissionNote = typeof submissionNotes.$inferSelect;
export type SubmissionType = (typeof submissionType.enumValues)[number];
export type SubmissionStatus = (typeof submissionStatus.enumValues)[number];
