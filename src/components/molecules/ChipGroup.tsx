"use client";

import { Chip } from "@/components/atoms/Chip";
import { cn } from "@/lib/utils";

type ChipGroupProps<T extends string> = {
  label: string;
  options: readonly T[];
  value: T | "all";
  onChange: (value: T | "all") => void;
  allLabel?: string;
  shape?: "pill" | "rounded";
  className?: string;
};

/** Single-select filter chips with an "All" option. */
export function ChipGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  allLabel = "All",
  shape,
  className,
}: ChipGroupProps<T>) {
  return (
    <div role="group" aria-label={label} className={cn("flex gap-2 overflow-x-auto pb-1", className)}>
      <Chip
        active={value === "all"}
        shape={shape}
        onClick={() => onChange("all")}
        className="whitespace-nowrap"
      >
        {allLabel}
      </Chip>
      {options.map((option) => (
        <Chip
          key={option}
          active={value === option}
          shape={shape}
          onClick={() => onChange(option)}
          className="whitespace-nowrap"
        >
          {option}
        </Chip>
      ))}
    </div>
  );
}
