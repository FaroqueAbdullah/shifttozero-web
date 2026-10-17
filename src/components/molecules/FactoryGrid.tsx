"use client";

import { m } from "motion/react";
import { Icon } from "@/components/atoms/Icon";

/**
 * Row of factory icons that light up one after another when scrolled into view.
 * Purely decorative alongside the real number; the caption states the scale.
 */
export function FactoryGrid({ total, icons = 20 }: { total: number; icons?: number }) {
  const per = Math.max(1, Math.round(total / icons));
  return (
    <div>
      <div className="grid grid-cols-10 gap-1.5 sm:gap-2" aria-hidden>
        {Array.from({ length: icons }, (_, i) => (
          <span
            key={i}
            className="relative flex aspect-square items-center justify-center overflow-hidden rounded-md bg-surface-container text-outline"
          >
            <Icon name="factory" filled className="text-[16px] sm:text-[20px]" />
            {/* Lit state fades and scales in over the dim tile. */}
            <m.span
              className="absolute inset-0 flex items-center justify-center bg-primary-container text-on-primary-container"
              initial={{ opacity: 0, scale: 0.4 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.35, delay: 0.25 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <Icon name="factory" filled className="text-[16px] sm:text-[20px]" />
            </m.span>
          </span>
        ))}
      </div>
      <p className="mt-2 font-caption text-caption text-on-surface-variant">
        Each icon ≈ {per.toLocaleString("en-US")} factories
      </p>
    </div>
  );
}
