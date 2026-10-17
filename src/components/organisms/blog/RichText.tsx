import { PortableText, type PortableTextComponents, type PortableTextBlock } from "next-sanity";
import { Icon } from "@/components/atoms/Icon";
import { SanityImage } from "@/components/atoms/SanityImage";
import type { SanityImage as SanityImageData } from "@/sanity/lib/types";

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p className="mb-6">{children}</p>,
    h2: ({ children }) => (
      <h2 className="mt-12 mb-6 border-b border-surface-container-high pb-4 font-headline-md text-headline-md text-on-surface">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mt-10 mb-4 font-headline-md text-headline-md text-on-surface">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-8 border-l-4 border-primary pl-6 text-on-surface italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-6 list-disc space-y-3 pl-6 marker:text-primary">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-6 list-decimal space-y-3 pl-6 marker:text-primary">{children}</ol>
    ),
  },
  marks: {
    strong: ({ children }) => <strong className="font-semibold text-on-surface">{children}</strong>,
    link: ({ children, value }) => {
      const href: string = value?.href ?? "#";
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          className="text-primary underline underline-offset-2 hover:text-primary-container"
          {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: SanityImageData & { caption?: string } }) => (
      <figure className="my-10">
        <SanityImage
          image={value}
          alt={value.alt ?? ""}
          width={1200}
          sizes="(min-width: 896px) 896px, 100vw"
          className="h-auto w-full rounded-xl border border-outline-variant"
        />
        {value.caption && (
          <figcaption className="mt-2 text-center font-caption text-caption text-on-surface-variant">
            {value.caption}
          </figcaption>
        )}
      </figure>
    ),
    pullQuote: ({ value }: { value: { quote: string; attribution?: string } }) => (
      <blockquote className="my-10 rounded-xl border border-outline-variant bg-surface-container-low p-6 text-center font-headline-md text-[22px] leading-8 text-primary italic md:my-12 md:rounded-l-none md:rounded-r-xl md:border-0 md:border-l-4 md:border-primary md:bg-surface-container-lowest md:p-8 md:text-left md:text-[20px] md:text-on-surface-variant md:shadow-sm">
        &ldquo;{value.quote}&rdquo;
        {value.attribution && (
          <footer className="mt-4 font-caption text-caption tracking-wider text-on-surface-variant uppercase not-italic md:font-label-md md:text-label-md md:tracking-normal md:text-on-surface md:normal-case">
            — {value.attribution}
          </footer>
        )}
      </blockquote>
    ),
    callout: ({ value }: { value: { icon?: string; title: string; text?: string } }) => (
      <aside className="my-10 rounded-xl border border-outline-variant bg-surface-container-low p-6 md:p-8">
        <h3 className="mb-3 flex items-center gap-2 font-headline-md text-headline-md text-on-surface">
          <Icon name={value.icon || "eco"} className="text-primary" />
          {value.title}
        </h3>
        {value.text && <p className="font-body-md text-body-md text-on-surface-variant">{value.text}</p>}
      </aside>
    ),
  },
};

/** Portable Text renderer for article bodies and event descriptions. */
export function RichText({ value, className }: { value?: PortableTextBlock[]; className?: string }) {
  if (!value?.length) return null;
  return (
    <div className={className ?? "font-body-lg text-body-lg text-on-surface-variant"}>
      <PortableText value={value} components={components} />
    </div>
  );
}
