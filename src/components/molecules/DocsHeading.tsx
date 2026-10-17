import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

/** Eyebrow + title + lede used at the top of each docs section. */
export function DocsHeading({ eyebrow, title, lede }: { eyebrow: string; title: string; lede?: ReactNode }) {
  return (
    <Reveal className="mb-12 flex max-w-3xl flex-col gap-3.5">
      <p className="font-label-md text-label-md tracking-wider text-on-surface-variant uppercase">
        {eyebrow}
      </p>
      <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
        {title}
      </h2>
      {lede && <p className="font-body-lg text-body-lg text-on-surface-variant">{lede}</p>}
    </Reveal>
  );
}
