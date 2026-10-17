import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type IconCardProps = {
  icon?: string;
  title: string;
  text?: string;
  /** "step": Home methodology card with a large faded watermark icon. "value": centered Team core value.
   * "compact": horizontal step card with a large faded number (Home on phones). */
  variant?: "step" | "value" | "compact";
  /** Number shown faded behind "compact" cards. */
  index?: number;
  /** Watermark icon for "step" cards. */
  watermark?: string;
  tone?: "primary" | "tertiary";
};

export function IconCard({
  icon,
  title,
  text,
  variant = "step",
  watermark,
  tone = "primary",
  index,
}: IconCardProps) {
  if (variant === "compact") {
    const bubble = [
      "bg-primary-container text-on-primary-container",
      "bg-tertiary-container text-on-tertiary-container",
      "bg-secondary-fixed text-on-secondary-fixed",
    ];
    return (
      <div className="relative flex items-start gap-4 overflow-hidden rounded-xl border border-surface-container-high bg-surface-container-lowest p-6">
        {index !== undefined && (
          <div
            aria-hidden
            className="absolute -top-4 -right-4 z-0 font-headline-xl text-[120px] leading-none font-bold text-surface-container-low opacity-50"
          >
            {index + 1}
          </div>
        )}
        {icon && (
          <div className={cn("z-10 rounded-full p-3", bubble[(index ?? 0) % bubble.length])}>
            <Icon name={icon} />
          </div>
        )}
        <div className="z-10 flex flex-col gap-2">
          <h3 className="font-label-md text-label-md text-on-background uppercase">{title}</h3>
          {text && <p className="font-caption text-caption text-on-surface-variant">{text}</p>}
        </div>
      </div>
    );
  }

  if (variant === "value") {
    return (
      <div className="flex flex-col items-center rounded-lg border border-outline-variant bg-surface-container-lowest p-6 text-center shadow-sm transition-shadow hover:shadow-md">
        {icon && (
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-on-primary-container">
            <Icon name={icon} className="text-[30px]" />
          </div>
        )}
        <h3 className="mb-3 font-headline-md text-headline-md text-on-background">{title}</h3>
        {text && <p className="font-body-md text-body-md text-on-surface-variant">{text}</p>}
      </div>
    );
  }

  const color = tone === "tertiary" ? "text-tertiary" : "text-primary";
  return (
    <div className="group relative overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-8 transition-shadow hover:shadow-ambient">
      {watermark && (
        <div className="absolute top-0 right-0 p-4 opacity-5 transition-opacity group-hover:opacity-10">
          <Icon name={watermark} className={cn("text-[128px]", color)} />
        </div>
      )}
      {icon && (
        <div
          className={cn(
            "mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-surface-container",
            color,
          )}
        >
          <Icon name={icon} filled className="text-[30px]" />
        </div>
      )}
      <h3 className="mb-4 font-headline-md text-headline-md text-on-surface">{title}</h3>
      {text && <p className="font-body-md text-body-md text-on-surface-variant">{text}</p>}
    </div>
  );
}
