"use client";

import { AnimatePresence, m } from "motion/react";
import { useSyncExternalStore, type KeyboardEvent } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";
import { PartnershipForm, VolunteerForm } from "./GetInvolvedForms";

const tabs = [
  { id: "individuals", label: "Individuals", icon: "person", Form: VolunteerForm },
  { id: "companies", label: "Companies", icon: "domain", Form: PartnershipForm },
] as const;

type TabId = (typeof tabs)[number]["id"];

const ease = [0.22, 1, 0.36, 1] as const;

// The URL hash is the source of truth, so links like /get-involved#companies open the right tab.
const subscribe = (onChange: () => void) => {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
};
const getHash = () => window.location.hash.slice(1);
const getServerHash = () => "";

/** Switches between the volunteer and partnership forms with an animated tab bar. */
export function GetInvolvedTabs() {
  const hash = useSyncExternalStore(subscribe, getHash, getServerHash);
  const index = Math.max(
    0,
    tabs.findIndex((t) => t.id === hash),
  );
  const active = tabs[index];

  const select = (id: TabId) => {
    if (id === active.id) return;
    history.replaceState(null, "", `#${id}`);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    e.preventDefault();
    const next = tabs[(index + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
    select(next.id);
    document.getElementById(`${next.id}-tab`)?.focus();
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      {/* Anchor targets so hash links scroll here before the client picks the tab. */}
      {tabs.map((t) => (
        <span key={t.id} id={t.id} className="absolute -top-24 block" aria-hidden />
      ))}

      <div
        role="tablist"
        aria-label="Ways to get involved"
        onKeyDown={onKeyDown}
        className="relative mb-10 grid grid-cols-2 rounded-full border border-outline-variant bg-surface-container p-1"
      >
        <m.div
          aria-hidden
          className="absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-full bg-primary shadow-md"
          initial={false}
          animate={{ x: `${index * 100}%` }}
          transition={{ type: "spring", stiffness: 400, damping: 34 }}
        />
        {tabs.map((t, i) => {
          const selected = i === index;
          return (
            <button
              key={t.id}
              id={`${t.id}-tab`}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${t.id}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(t.id)}
              className={cn(
                "relative z-10 flex items-center justify-center gap-2 rounded-full px-4 py-3 font-label-md text-label-md transition-colors duration-300",
                selected ? "text-on-primary" : "text-on-surface-variant hover:text-on-surface",
              )}
            >
              <m.span
                className="flex"
                animate={selected ? { rotate: [0, -12, 12, 0], scale: [1, 1.2, 1] } : { rotate: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <Icon name={t.icon} filled={selected} className="text-[20px]" />
              </m.span>
              For {t.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait" initial={false} custom={index}>
        <m.div
          key={active.id}
          id={`${active.id}-panel`}
          role="tabpanel"
          aria-labelledby={`${active.id}-tab`}
          custom={index}
          variants={{
            enter: (dir: number) => ({ opacity: 0, x: dir ? 48 : -48, scale: 0.98 }),
            center: { opacity: 1, x: 0, scale: 1 },
            exit: (dir: number) => ({ opacity: 0, x: dir ? -48 : 48, scale: 0.98 }),
          }}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.35, ease }}
        >
          <active.Form />
        </m.div>
      </AnimatePresence>
    </div>
  );
}
