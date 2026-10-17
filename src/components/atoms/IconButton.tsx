import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";

type Tone = "default" | "danger";

type IconButtonProps = ComponentProps<"button"> & {
  icon: string;
  /** Required: icon-only buttons need an accessible name. */
  label: string;
  tone?: Tone;
  bordered?: boolean;
};

export function IconButton({
  icon,
  label,
  tone = "default",
  bordered,
  className,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-primary",
        tone === "danger"
          ? "text-error hover:bg-error-container hover:text-on-error-container"
          : "text-on-surface-variant hover:bg-surface-container-high hover:text-primary",
        bordered && "border border-outline-variant",
        className,
      )}
      {...props}
    >
      <Icon name={icon} className="text-[20px]" />
    </button>
  );
}
