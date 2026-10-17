"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { appDemoSteps } from "@/content/appDemo";
import { cn } from "@/lib/utils";

type AppDemoProps = {
  title?: string;
  text?: string;
  /** Section anchor; "app" on Home, "demo" on the docs page. */
  id?: string;
  /**
   * Distance (px) from the top of the viewport where the phone sticks. Must clear every
   * sticky bar above it: 96 under the site header; more where a sub-nav is also sticky.
   */
  stickyTop?: number;
};

/**
 * Section 2: "A morning at the kiln". A sticky phone shows each app screen while the
 * steps scroll past; a green ring marks where the worker taps next. On narrow screens
 * the phone is replaced by an inline screenshot under each step.
 * Ported from the Carbon App Blueprint demo (same layout, timings and palette).
 */
export function AppDemo({ title, text, id = "app", stickyTop = 96 }: AppDemoProps) {
  const steps = appDemoSteps;
  const [current, setCurrent] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const tapRef = useRef<HTMLSpanElement>(null);

  // Active step = last step whose top has passed 55% of the viewport height.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const items = listRef.current?.querySelectorAll<HTMLLIElement>("[data-demo-step]");
      if (!items?.length) return;
      const line = window.innerHeight * 0.55;
      let idx = 0;
      items.forEach((el, k) => {
        if (el.getBoundingClientRect().top < line) idx = k;
      });
      setCurrent(idx);
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

  // Move the tap ring and restart its pulse whenever the step changes.
  useEffect(() => {
    const el = tapRef.current;
    if (!el) return;
    const tap = steps[current]?.tap;
    el.classList.remove("demo-tap-go");
    if (!tap) {
      el.style.opacity = "0";
      return;
    }
    el.style.left = `${tap[0]}%`;
    el.style.top = `${tap[1]}%`;
    el.style.opacity = "";
    void el.offsetWidth; // reflow so the animation starts again
    el.classList.add("demo-tap-go");
  }, [current, steps]);

  return (
    <section id={id} className="app-demo scroll-mt-20 bg-[var(--demo-bg)] py-[88px] text-[var(--demo-fg)]">
      <div className="mx-auto max-w-[1120px] px-4">
        <div className="mb-12 flex max-w-[760px] flex-col gap-[14px]">
          <p className="text-[12px] font-semibold tracking-[0.08em] text-[var(--demo-muted)] uppercase">
            Demo · a morning at the kiln
          </p>
          <h2 className="text-[clamp(28px,4vw,40px)] leading-[1.15] font-bold tracking-[-0.015em] text-balance text-[var(--demo-fg)]">
            {title || "Data collection anyone can use."}
          </h2>
          {text && <p className="max-w-[66ch] text-[19px] leading-[1.6] text-[var(--demo-muted)]">{text}</p>}
          <p className="max-w-[66ch] text-[17px] leading-[1.6] text-[var(--demo-muted)]">
            Scroll to walk through one daily entry, screen by screen. The green ring shows where the worker
            taps next. Under each step: what the system does behind the scenes.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-0 min-[860px]:grid-cols-2 min-[860px]:gap-16">
          {/* Sticky phone (desktop) */}
          <div className="hidden min-[860px]:block" aria-hidden>
            <div className="sticky flex flex-col items-center gap-[18px]" style={{ top: stickyTop }}>
              <div
                className="w-[min(340px,calc((100vh-var(--demo-reserve))*0.462))] rounded-[34px] bg-[#0a0a0a] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
                style={{ "--demo-reserve": `${stickyTop + 104}px` } as React.CSSProperties}
              >
                <div className="relative aspect-[390/844] overflow-hidden rounded-[27px] bg-[#f4f6f8]">
                  {steps.map((step, k) => (
                    <Image
                      key={step.image}
                      src={step.image}
                      alt=""
                      width={585}
                      height={1266}
                      priority={k === 0}
                      sizes="340px"
                      className={cn(
                        "absolute inset-0 h-full w-full transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] motion-reduce:transition-none",
                        k === current
                          ? "z-[2] translate-y-0 scale-100 opacity-100"
                          : k < current
                            ? "-translate-y-[5%] scale-[0.97] opacity-0"
                            : "translate-y-[7%] scale-[0.97] opacity-0",
                      )}
                    />
                  ))}
                  <span
                    ref={tapRef}
                    className="pointer-events-none absolute z-[3] -mt-[27px] -ml-[27px] h-[54px] w-[54px] rounded-full border-[3px] border-[#57a11f] bg-[rgba(87,161,31,0.2)] opacity-0 transition-[left,top] duration-[400ms]"
                  />
                </div>
              </div>
              <div className="flex items-center gap-4 text-[14px] text-[var(--demo-muted)]">
                <span className="font-mono tabular-nums">
                  {current + 1} / {steps.length}
                </span>
                <span className="flex gap-1.5">
                  {steps.map((step, k) => (
                    <i
                      key={step.image}
                      className={cn(
                        "block h-2 rounded-full transition-all duration-300",
                        k === current ? "w-6 bg-[var(--demo-green)]" : "w-2 bg-white/25",
                      )}
                    />
                  ))}
                </span>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol ref={listRef} className="m-0 list-none p-0 min-[860px]:pt-[8vh] min-[860px]:pb-[18vh]">
            {steps.map((step, k) => (
              <li
                key={step.image}
                data-demo-step
                className={cn(
                  "flex max-w-[470px] flex-col justify-center gap-[14px] border-t border-white/15 py-8 transition-opacity duration-[400ms] motion-reduce:transition-none",
                  "min-[860px]:min-h-[78vh] min-[860px]:border-t-0 min-[860px]:py-0",
                  k === current ? "min-[860px]:opacity-100" : "min-[860px]:opacity-50",
                )}
              >
                <span className="text-[12px] font-semibold tracking-[0.08em] text-[var(--demo-green-text)] uppercase">
                  {step.who}
                </span>
                <h3 className="text-[clamp(24px,3vw,30px)] leading-[1.15] font-bold tracking-[-0.015em] text-balance text-[var(--demo-fg)]">
                  {step.title}
                </h3>
                <p className="text-[17px] leading-[1.6] text-[var(--demo-muted)]">{step.text}</p>
                <div className="rounded-2xl border border-white/[0.18] px-4 py-[14px] text-[14px] leading-[1.55] text-[var(--demo-muted)]">
                  <b className="mb-1 block text-[12px] tracking-[0.08em] text-[var(--demo-fg)] uppercase">
                    Behind the scenes
                  </b>
                  {step.system}
                </div>
                {/* Narrow screens: inline screenshot instead of the sticky phone */}
                <Image
                  src={step.image}
                  alt={step.alt}
                  width={585}
                  height={1266}
                  sizes="260px"
                  className="mt-1.5 h-auto w-[min(260px,72%)] rounded-[26px] border-[7px] border-[#0a0a0a] min-[860px]:hidden"
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
