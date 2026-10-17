import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type StatTileProps = {
  value: string;
  label: string;
  icon?: string;
  /**
   * "impact": large centered card (Home "Our Collective Impact").
   * "glance": icon bubble + value + caption (Event "At a Glance").
   * "figure": plain value over caption (Home emissions summary).
   */
  variant?: "impact" | "glance" | "figure";
  highlighted?: boolean;
  /** Ribbon text on a highlighted impact tile, e.g. "Verified Impact". */
  ribbon?: string;
  tone?: "primary" | "secondary" | "tertiary";
};

const bubble = {
  primary: "bg-primary-container text-on-primary-container",
  secondary: "bg-secondary-container text-on-secondary-container",
  tertiary: "bg-tertiary-container text-on-tertiary-container",
};

export function StatTile({
  value,
  label,
  icon,
  variant = "impact",
  highlighted,
  ribbon,
  tone = "primary",
}: StatTileProps) {
  if (variant === "figure") {
    return (
      <div>
        <div className="font-headline-md text-headline-md text-on-surface">{value}</div>
        <div className="font-caption text-caption text-on-surface-variant">{label}</div>
      </div>
    );
  }

  if (variant === "glance") {
    return (
      <div className="flex items-start gap-4">
        {icon && (
          <div
            className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-full", bubble[tone])}
          >
            <Icon name={icon} filled />
          </div>
        )}
        <div>
          <p className="font-label-md text-label-md text-on-surface">{value}</p>
          <p className="font-caption text-caption text-on-surface-variant">{label}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-xl bg-surface-container-lowest p-8 text-center transition-shadow hover:shadow-ambient",
        highlighted ? "border-2 border-primary shadow-lg shadow-primary/10" : "border border-outline-variant",
      )}
    >
      {highlighted && ribbon && (
        <div className="absolute top-0 right-0 rounded-bl-lg bg-primary px-3 py-1 font-caption text-caption font-bold tracking-wider text-on-primary uppercase">
          {ribbon}
        </div>
      )}
      {icon && (
        <div className="mb-4 text-primary">
          <Icon name={icon} filled={highlighted} className="text-[96px]" />
        </div>
      )}
      <div
        className={cn(
          "mb-2 font-headline-lg-mobile text-headline-lg-mobile md:font-headline-xl md:text-headline-xl",
          highlighted ? "text-primary" : "text-on-surface",
        )}
      >
        {value}
      </div>
      <div className="font-headline-md text-headline-md text-on-surface-variant">{label}</div>
    </div>
  );
}
