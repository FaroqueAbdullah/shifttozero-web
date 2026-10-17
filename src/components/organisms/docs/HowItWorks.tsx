"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { DocsHeading } from "@/components/molecules/DocsHeading";
import { stages } from "@/content/appDocs";
import { cn } from "@/lib/utils";

/** "From a spoken sentence to a verified inventory": sticky stage panel + step list with a filling rail. */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = listRef.current;
      if (!box) return;
      const mid = window.innerHeight * 0.5;
      const r = box.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (mid - r.top) / r.height)));
      let idx = 0;
      box.querySelectorAll<HTMLElement>("[data-stage]").forEach((el, k) => {
        if (el.getBoundingClientRect().top < mid) idx = k;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const stage = stages[active];

  return (
    <section id="flow" className="scroll-mt-32 bg-surface-container-low py-20 md:py-[88px]">
      <div className="container-page">
        <DocsHeading
          eyebrow="How it works"
          title="From a spoken sentence to a verified inventory"
          lede="Every entry passes through the same six stages, in this order. Scroll through them."
        />
        <div className="grid grid-cols-1 items-start gap-12 min-[860px]:grid-cols-[0.9fr_1.1fr]">
          {/* Sticky stage panel (desktop) */}
          <aside
            aria-hidden
            className="sticky top-40 hidden min-h-[400px] flex-col gap-5 overflow-hidden rounded-[32px] bg-primary p-8 text-on-primary min-[860px]:flex"
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={active}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-mono text-[14px] opacity-80">
                  STAGE {active + 1} / {stages.length}
                </p>
                <div className="my-4 grid h-[88px] w-[88px] place-items-center rounded-3xl bg-white/10">
                  <Icon name={stage.icon} className="text-[44px]" />
                </div>
                <h3 className="font-headline-lg text-headline-lg">{stage.short}</h3>
                <div className="mt-4 flex flex-col gap-2.5 text-[15px]">
                  {stage.chips.map((c) => (
                    <div
                      key={c.text}
                      className={cn(
                        "flex items-center gap-2.5 rounded-[14px] px-3.5 py-2.5",
                        c.ok ? "bg-primary-fixed-dim/30" : "bg-white/10",
                        c.bn && "font-bengali",
                        c.mono && "font-mono",
                      )}
                    >
                      {c.ok && <Icon name="check" className="text-[18px]" />}
                      {c.text}
                    </div>
                  ))}
                </div>
              </m.div>
            </AnimatePresence>
            <div className="mt-auto flex gap-1.5">
              {stages.map((s, i) => (
                <i
                  key={s.key}
                  className={cn(
                    "block h-1.5 flex-1 rounded-full transition-colors duration-300",
                    i <= active ? "bg-primary-fixed-dim" : "bg-white/20",
                  )}
                />
              ))}
            </div>
          </aside>

          {/* Steps with a progress rail */}
          <div ref={listRef} className="relative flex flex-col gap-5 pl-9">
            <div
              className="absolute top-2 bottom-2 left-[11px] w-[3px] rounded bg-outline-variant"
              aria-hidden
            >
              <div
                className="absolute inset-x-0 top-0 rounded bg-primary transition-[height] duration-150"
                style={{ height: `${fill * 100}%` }}
              />
            </div>
            {stages.map((s, i) => (
              <article
                key={s.key}
                data-stage
                className={cn(
                  "relative flex flex-col gap-2 rounded-3xl border bg-surface-container-lowest p-6 transition-all duration-300",
                  i === active ? "border-primary shadow-ambient" : "border-outline-variant",
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-[30px] -left-8 h-[15px] w-[15px] rounded-full border-[3px] transition-all duration-300",
                    i <= active
                      ? "border-primary bg-primary"
                      : "border-outline-variant bg-surface-container-lowest",
                  )}
                />
                <span className="font-mono text-[13px] text-on-surface-variant">{s.key}</span>
                <h3 className="font-headline-md text-headline-md text-on-surface">{s.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{s.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
