"use client";

import { useSearchParams } from "next/navigation";
import { CONTACT_TOPICS } from "@/lib/validation";
import { ContactForm } from "./GetInvolvedForms";

type Topic = (typeof CONTACT_TOPICS)[number];

/** Preselects the topic from ?topic=Funding (used by the Home "Support our research" button). */
export function ContactFromQuery() {
  const raw = useSearchParams().get("topic") ?? "";
  const topic = CONTACT_TOPICS.find((t) => t.toLowerCase() === raw.toLowerCase()) as Topic | undefined;
  return <ContactForm key={topic ?? "General"} defaultTopic={topic} />;
}
