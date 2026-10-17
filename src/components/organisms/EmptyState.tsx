import { Icon } from "@/components/atoms/Icon";

/** Shown when a list or filter has no results. */
export function EmptyState({
  icon = "search_off",
  title,
  text,
}: {
  icon?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-dashed border-outline-variant px-6 py-16 text-center">
      <Icon name={icon} className="mb-4 text-[48px] text-outline" />
      <p className="font-headline-md text-headline-md text-on-surface">{title}</p>
      {text && <p className="mt-2 max-w-md font-body-md text-body-md text-on-surface-variant">{text}</p>}
    </div>
  );
}
