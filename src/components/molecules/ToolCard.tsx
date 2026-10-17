import { Icon } from "@/components/atoms/Icon";
import { SanityImage } from "@/components/atoms/SanityImage";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { CarbonTool } from "@/sanity/lib/types";

/** Icon tile tint per category. */
const tint: Record<string, string> = {
  "Free & standards": "bg-primary-container/20 text-primary",
  "Business platforms": "bg-secondary-container text-secondary",
  "Industry-specific": "bg-tertiary-fixed text-tertiary",
  "Product footprint (LCA)": "bg-primary-container/20 text-primary",
  "Developer API": "bg-surface-container-high text-on-surface-variant",
};

function ToolLogo({ tool }: { tool: CarbonTool }) {
  return tool.logo?.asset ? (
    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border border-outline-variant bg-white">
      <SanityImage image={tool.logo} alt="" fill sizes="48px" className="object-contain p-1" />
    </span>
  ) : (
    <span
      className={cn(
        "grid h-12 w-12 shrink-0 place-items-center rounded-lg",
        tint[tool.category] ?? tint["Free & standards"],
      )}
    >
      <Icon name={tool.icon || "calculate"} filled />
    </span>
  );
}

const external = { target: "_blank", rel: "noreferrer" } as const;

/** A listed carbon calculator. "card": directory grid. "row": compact row on phones. */
export function ToolCard({
  tool,
  variant = "card",
  className,
}: {
  tool: CarbonTool;
  variant?: "card" | "row";
  className?: string;
}) {
  if (variant === "row") {
    return (
      <a
        href={tool.url}
        {...external}
        className={cn(
          "flex items-start gap-4 rounded-xl border border-outline-variant bg-surface-container-lowest p-4",
          className,
        )}
      >
        <ToolLogo tool={tool} />
        <div className="flex min-w-0 flex-col gap-1">
          <h3 className="font-headline-md text-[18px] leading-6 text-on-surface">{tool.name}</h3>
          {tool.organization && (
            <p className="font-caption text-caption text-on-surface-variant">{tool.organization}</p>
          )}
          <p className="line-clamp-2 font-caption text-caption text-on-surface-variant">{tool.description}</p>
          <div className="mt-1 flex flex-wrap gap-1.5">
            <span className="rounded bg-surface-variant px-2 py-0.5 font-caption text-caption text-on-surface-variant">
              {tool.category}
            </span>
            {tool.pricing && (
              <span className="rounded bg-primary-container/20 px-2 py-0.5 font-caption text-caption text-primary">
                {tool.pricing}
              </span>
            )}
          </div>
        </div>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    );
  }

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-ambient",
        className,
      )}
    >
      <div className="absolute top-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <ToolLogo tool={tool} />
          <div>
            <h3 className="font-headline-md text-headline-md leading-tight text-on-surface">{tool.name}</h3>
            {tool.organization && (
              <p className="font-caption text-caption text-on-surface-variant">{tool.organization}</p>
            )}
          </div>
        </div>
        {tool.pricing && (
          <span
            className={cn(
              "shrink-0 rounded-full px-2.5 py-1 font-caption text-caption font-semibold",
              tool.pricing === "Free"
                ? "bg-primary-container/20 text-primary"
                : "bg-surface-variant text-on-surface-variant",
            )}
          >
            {tool.pricing}
          </span>
        )}
      </div>
      <p className="font-body-md text-body-md text-on-surface-variant">{tool.description}</p>
      {(tool.audience || tool.inputs) && (
        <dl className="grid grid-cols-1 gap-2 rounded-lg bg-surface-container-low p-3 font-caption text-caption">
          {tool.audience && (
            <div className="flex gap-2">
              <dt className="flex shrink-0 items-center gap-1 whitespace-nowrap text-on-surface-variant">
                <Icon name="person" className="text-[16px]" /> Built for
              </dt>
              <dd className="font-semibold text-on-surface">{tool.audience}</dd>
            </div>
          )}
          {tool.inputs && (
            <div className="flex gap-2">
              <dt className="flex shrink-0 items-center gap-1 whitespace-nowrap text-on-surface-variant">
                <Icon name="input" className="text-[16px]" /> Main inputs
              </dt>
              <dd className="font-semibold text-on-surface">{tool.inputs}</dd>
            </div>
          )}
        </dl>
      )}
      <div className="mt-auto flex items-center justify-between gap-3 pt-2">
        <span className="rounded bg-surface-variant px-2 py-1 font-caption text-caption text-on-surface-variant">
          {tool.category}
        </span>
        <a
          href={tool.url}
          {...external}
          className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:underline"
        >
          Visit <Icon name="open_in_new" className="text-[16px]" />
          <span className="sr-only">{tool.name} (opens in a new tab)</span>
        </a>
      </div>
      {tool.lastChecked && (
        <p className="font-caption text-caption text-outline">
          Details checked {formatDate(tool.lastChecked)}
        </p>
      )}
    </div>
  );
}
