import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/atoms/Icon";
import { PageHero } from "@/components/organisms/site/PageHero";
import { fieldNotes } from "@/content/fieldNotes";
import { pageMetadata } from "@/lib/seo";

const description =
  "Short, plain-language notes on what we learn in the field. This is where we share our research.";

export const metadata: Metadata = pageMetadata({ path: "/field-notes", title: "Field notes", description });

export default function FieldNotesPage() {
  return (
    <>
      <PageHero title="Field notes" description={description} />
      <div className="container-page pb-24">
        <ul className="flex max-w-3xl flex-col gap-gutter">
          {fieldNotes.map((note) => (
            <li key={note.slug}>
              <Link
                href={`/field-notes/${note.slug}`}
                className="group flex flex-col gap-3 rounded-card border border-outline-variant bg-surface-container-lowest p-6 transition-colors hover:border-primary/40 md:p-8"
              >
                <span className="font-label-md text-label-md tracking-wider text-primary uppercase">
                  {note.topic}
                </span>
                <span className="font-headline-md text-headline-md text-on-surface group-hover:text-primary">
                  {note.title}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">{note.summary}</span>
                <span className="flex items-center gap-1 font-label-md text-label-md text-primary">
                  Read the note <Icon name="arrow_forward" className="text-[18px]" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
