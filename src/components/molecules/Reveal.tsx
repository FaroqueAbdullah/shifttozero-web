"use client";

import { m } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Direction the content travels in from. */
  from?: "below" | "left" | "right" | "scale";
  as?: "div" | "li" | "section";
};

const offsets = {
  below: { y: 32 },
  left: { x: -40 },
  right: { x: 40 },
  scale: { scale: 0.92 },
};

/** Fades and slides its children in the first time they scroll into view. */
export function Reveal({ children, className, delay = 0, from = "below", as = "div" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
