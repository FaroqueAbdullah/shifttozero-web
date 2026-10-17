import { Icon } from "@/components/atoms/Icon";

export function KpiCard({
  icon,
  tag,
  label,
  value,
}: {
  icon: string;
  tag: string;
  label: string;
  value: number | string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-colors hover:border-primary/50">
      <div className="absolute top-0 right-0 -mt-4 -mr-4 h-24 w-24 rounded-bl-full bg-primary/5 transition-transform group-hover:scale-110" />
      <div className="relative z-10 mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-container/20 text-primary">
          <Icon name={icon} filled />
        </div>
        <span className="rounded bg-surface-container px-2 py-1 font-label-md text-label-md text-on-surface-variant">
          {tag}
        </span>
      </div>
      <div className="relative z-10">
        <p className="mb-1 font-label-md text-label-md text-on-surface-variant">{label}</p>
        <p className="font-headline-lg text-headline-lg text-on-surface">{value}</p>
      </div>
    </div>
  );
}
