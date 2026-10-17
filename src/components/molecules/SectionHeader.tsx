import Link from "next/link";
import type { ReactNode } from "react";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  title: ReactNode;
  description?: ReactNode;
  /** "center": big centered title (Methodology, Impact). "bar": title + link with a rule underneath. */
  variant?: "center" | "bar";
  action?: { href: string; label: string; arrow?: boolean };
  /** Heading size for the "bar" variant. */
  size?: "md" | "lg";
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeader({
  title,
  description,
  variant = "center",
  action,
  as = "h2",
  size = "md",
  className,
}: SectionHeaderProps) {
  if (variant === "bar") {
    return (
      <div
        className={cn("flex items-end justify-between gap-4 border-b border-outline-variant pb-4", className)}
      >
        <Heading as={as} size={size} className="text-on-surface">
          {title}
        </Heading>
        {action && (
          <Link
            href={action.href}
            className="flex shrink-0 items-center gap-1 font-label-md text-label-md text-primary hover:underline"
          >
            {action.label}
            {action.arrow && <Icon name="arrow_forward" className="text-[18px]" />}
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className={cn("mb-16 text-center", className)}>
      <Heading as={as} size="lg" className="text-on-surface">
        {title}
      </Heading>
      {description && <Text className="mx-auto mt-4 max-w-2xl">{description}</Text>}
    </div>
  );
}
