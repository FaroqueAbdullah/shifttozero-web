import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Icon } from "@/components/atoms/Icon";
import { JsonLd } from "@/components/atoms/JsonLd";
import { fieldNotes, getFieldNote } from "@/content/fieldNotes";
import { absoluteUrl, ORGANIZATION_ID, pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return fieldNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/field-notes/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) return {};
  return pageMetadata({
    path: `/field-notes/${slug}`,
    title: note.title,
    description: note.summary,
    type: "article",
  });
}

export default async function FieldNotePage({ params }: PageProps<"/field-notes/[slug]">) {
  const { slug } = await params;
  const note = getFieldNote(slug);
  if (!note) notFound();

  return (
    <div className="container-page py-12 md:py-20">
      <JsonLd
        data={{
          "@type": "Article",
          headline: note.title,
          description: note.summary,
          url: absoluteUrl(`/field-notes/${slug}`),
          mainEntityOfPage: absoluteUrl(`/field-notes/${slug}`),
          author: { "@id": ORGANIZATION_ID },
          publisher: { "@id": ORGANIZATION_ID },
        }}
      />
      <article className="mx-auto max-w-3xl">
        <Link
          href="/field-notes"
          className="mb-8 inline-flex min-h-14 items-center gap-1 font-label-md text-label-md text-primary hover:underline"
        >
          <Icon name="arrow_back" className="text-[18px]" /> All field notes
        </Link>
        <header className="mb-10">
          <p className="mb-4 font-label-md text-label-md tracking-wider text-primary uppercase">
            {note.topic}
          </p>
          <h1 className="mb-6 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
            {note.title}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface">{note.summary}</p>
        </header>

        <div className="font-body-md text-body-md text-on-surface-variant md:font-body-lg md:text-body-lg [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:font-headline-md [&_h2]:text-headline-md [&_h2]:text-on-surface [&_li]:mb-2 [&_p]:mb-4 [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:pl-6">
          {note.body.map((block, i) =>
            block.type === "h2" ? (
              <h2 key={i}>{block.text}</h2>
            ) : block.type === "ul" ? (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{block.text}</p>
            ),
          )}
        </div>

        <nav aria-label="Related" className="mt-12 flex flex-col gap-2 border-t border-outline-variant pt-8">
          {note.related.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="flex min-h-14 items-center gap-1 font-label-md text-label-md text-primary hover:underline"
            >
              {r.label} <Icon name="arrow_forward" className="text-[18px]" />
            </Link>
          ))}
        </nav>
      </article>
    </div>
  );
}
