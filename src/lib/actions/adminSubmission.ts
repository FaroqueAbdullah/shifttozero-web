"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { submissionStatus } from "@/db/schema";
import { requireAdmin } from "@/lib/dal";
import { addSubmissionNote, setSubmissionStatus } from "@/lib/submissions";

const statusInput = z.object({ id: z.uuid(), status: z.enum(submissionStatus.enumValues) });
const noteInput = z.object({ id: z.uuid(), body: z.string().trim().min(1).max(4000) });

export async function updateSubmissionStatus(formData: FormData) {
  await requireAdmin();
  const { id, status } = statusInput.parse(Object.fromEntries(formData));
  await setSubmissionStatus(id, status);
  revalidatePath("/admin/submissions");
}

export async function addNote(formData: FormData) {
  const admin = await requireAdmin();
  const { id, body } = noteInput.parse(Object.fromEntries(formData));
  await addSubmissionNote(id, admin.name, body);
  revalidatePath("/admin/submissions");
}
