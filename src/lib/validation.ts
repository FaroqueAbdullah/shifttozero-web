import { z } from "zod";

const name = z.string().trim().min(2, "Please enter your name").max(120);
const email = z.email("Please enter a valid email").max(200);
const optional = (max: number) => z.string().trim().max(max).optional().or(z.literal(""));

/** Anti-spam fields present on every public form. */
export const antiSpam = {
  /** Honeypot: hidden from people, bots fill it. Must stay empty. */
  website: z.string().max(0).optional().or(z.literal("")),
  /** Epoch ms when the form was rendered. */
  startedAt: z.coerce.number(),
};

export const INDUSTRY_SECTORS = [
  "Manufacturing",
  "Energy & Utilities",
  "Transportation",
  "Construction & Materials",
  "Other",
] as const;

export const volunteerSchema = z.object({
  name,
  email,
  skills: optional(300),
  message: optional(2000),
  ...antiSpam,
});

export const partnershipSchema = z.object({
  organization: z.string().trim().min(2, "Please enter your company name").max(200),
  sector: z.enum(INDUSTRY_SECTORS, { error: "Please select an industry" }),
  name,
  email,
  message: optional(2000),
  ...antiSpam,
});

export const CONTACT_TOPICS = ["General", "Funding", "Partnership", "Media", "Volunteering"] as const;

export const inquirySchema = z.object({
  topic: z.enum(CONTACT_TOPICS).catch("General"),
  name,
  email,
  organization: optional(200),
  phone: optional(40),
  message: z.string().trim().min(10, "Please write a short message").max(4000),
  ...antiSpam,
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;
export type PartnershipInput = z.infer<typeof partnershipSchema>;
export type InquiryInput = z.infer<typeof inquirySchema>;
