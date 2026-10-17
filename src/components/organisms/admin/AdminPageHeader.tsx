import type { ReactNode } from "react";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return (
    <header className="flex flex-col gap-4 px-margin-mobile pt-10 pb-8 md:flex-row md:items-end md:justify-between lg:px-margin-desktop">
      <div>
        <h1 className="mb-2 font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-xl md:text-headline-xl">
          {title}
        </h1>
        {description && <p className="font-body-lg text-body-lg text-on-surface-variant">{description}</p>}
      </div>
      {actions && <div className="flex shrink-0 gap-3">{actions}</div>}
    </header>
  );
}
