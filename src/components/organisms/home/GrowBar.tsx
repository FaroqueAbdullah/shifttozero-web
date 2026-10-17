"use client";

import { m } from "motion/react";
import { cn } from "@/lib/utils";

/** Bar that grows to its value when scrolled into view (single series, value shown next to it). */
export function GrowBar({
  percent,
  delay = 0,
  className,
}: {
  percent: number;
  delay?: number;
  className?: string;
}) {
  return (
    <div className="h-2.5 overflow-hidden rounded-full bg-surface-container-high" aria-hidden>
      <m.div
        className={cn("h-full origin-left rounded-full", className)}
        style={{ width: `${percent}%` }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ duration: 1.1, delay, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
