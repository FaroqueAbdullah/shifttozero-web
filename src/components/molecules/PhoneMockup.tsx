"use client";

import { AnimatePresence, m } from "motion/react";
import { Icon } from "@/components/atoms/Icon";
import { SanityImage } from "@/components/atoms/SanityImage";
import type { SanityImage as SanityImageData } from "@/sanity/lib/types";
import { cn } from "@/lib/utils";

type PhoneMockupProps = {
  appName: string;
  /** Which feature step is showing (0-3). */
  active: number;
  /** Optional real screenshots, one per step; built-in screens are used when missing. */
  screenshots?: (SanityImageData & { _key: string })[];
  className?: string;
};

/* Built-in screens illustrating each feature, drawn with design-system tokens. */

function PictureScreen() {
  const tiles = [
    { icon: "factory", label: "Factory" },
    { icon: "bolt", label: "Power" },
    { icon: "local_fire_department", label: "Fuel" },
    { icon: "water_drop", label: "Water" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <p className="font-label-md text-label-md text-on-surface">What does this site use most?</p>
      <div className="grid flex-1 grid-cols-2 gap-3">
        {tiles.map((t, i) => (
          <div
            key={t.label}
            className={cn(
              "flex flex-col items-center justify-center gap-1 rounded-xl border-2",
              i === 1
                ? "border-primary bg-primary-container/20 text-primary"
                : "border-outline-variant text-on-surface-variant",
            )}
          >
            <Icon name={t.icon} filled className="text-[36px]" />
            <span className="font-caption text-caption">{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function VoiceScreen() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-4">
      <p className="text-center font-label-md text-label-md text-on-surface">
        How many hours do the machines run?
      </p>
      <div className="relative flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-primary/30 motion-safe:animate-pulse-ring" />
        <span className="absolute inset-0 rounded-full bg-primary/20 [animation-delay:0.7s] motion-safe:animate-pulse-ring" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-on-primary">
          <Icon name="mic" filled className="text-[40px]" />
        </span>
      </div>
      <div className="flex h-10 items-center gap-1" aria-hidden>
        {[0.2, 0.5, 0.8, 0.4, 1, 0.6, 0.3, 0.7, 0.45].map((h, i) => (
          <span
            key={i}
            className="w-1.5 origin-center rounded-full bg-primary motion-safe:animate-wave"
            style={{ height: `${h * 100}%`, animationDelay: `${i * 0.09}s` }}
          />
        ))}
      </div>
      <p className="font-caption text-caption text-on-surface-variant">Listening… speak in Bangla</p>
    </div>
  );
}

function OfflineScreen() {
  const rows = [
    { name: "Garment unit, Gazipur", icon: "cloud_off", tone: "text-outline" },
    { name: "Brick kiln, Savar", icon: "cloud_off", tone: "text-outline" },
    { name: "Tannery, Hemayetpur", icon: "cloud_done", tone: "text-primary" },
  ];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center gap-2 rounded-lg bg-secondary-container px-3 py-2 font-caption text-caption text-on-secondary-container">
        <Icon name="wifi_off" className="text-[16px]" /> Offline: 2 surveys waiting to sync
      </div>
      <ul className="flex flex-col gap-2">
        {rows.map((r) => (
          <li
            key={r.name}
            className="flex items-center justify-between rounded-lg border border-outline-variant px-3 py-3"
          >
            <span className="font-caption text-caption text-on-surface">{r.name}</span>
            <Icon name={r.icon} className={cn("text-[20px]", r.tone)} />
          </li>
        ))}
      </ul>
      <div className="mt-auto rounded-lg bg-primary py-2 text-center font-label-md text-label-md text-on-primary">
        Sync when online
      </div>
    </div>
  );
}

function VolunteerScreen() {
  const checks = ["Consent recorded", "Site photos (3)", "Energy questions", "Voice notes"];
  return (
    <div className="flex h-full flex-col gap-3 p-4">
      <div className="flex items-center gap-3">
        <div className="flex -space-x-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-primary-container text-on-primary-container">
            <Icon name="person" filled className="text-[18px]" />
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-surface-container-lowest bg-tertiary-container text-on-tertiary-container">
            <Icon name="support_agent" filled className="text-[18px]" />
          </span>
        </div>
        <p className="font-caption text-caption text-on-surface-variant">Guided by volunteer Rahim</p>
      </div>
      <ul className="flex flex-col gap-2">
        {checks.map((c, i) => (
          <li key={c} className="flex items-center gap-2 font-caption text-caption text-on-surface">
            <Icon
              name={i < 3 ? "check_circle" : "radio_button_unchecked"}
              filled={i < 3}
              className={cn("text-[18px]", i < 3 ? "text-primary" : "text-outline")}
            />
            {c}
          </li>
        ))}
      </ul>
      <div className="mt-auto h-2 overflow-hidden rounded-full bg-surface-container-high">
        <div className="h-full w-3/4 rounded-full bg-primary" />
      </div>
      <p className="text-center font-caption text-caption text-on-surface-variant">Survey 75% complete</p>
    </div>
  );
}

const screens = [PictureScreen, VoiceScreen, OfflineScreen, VolunteerScreen];

/** Phone frame whose screen cross-fades to match the active feature step. */
export function PhoneMockup({ appName, active, screenshots, className }: PhoneMockupProps) {
  const index = Math.max(0, Math.min(active, screens.length - 1));
  const shot = screenshots?.[index];
  const Screen = screens[index];

  return (
    <div
      className={cn(
        "relative mx-auto aspect-[9/18.5] w-[260px] rounded-[44px] border-[10px] border-inverse-surface bg-inverse-surface shadow-2xl shadow-primary/20 md:w-[300px]",
        className,
      )}
    >
      <div className="absolute top-2 left-1/2 z-20 h-5 w-24 -translate-x-1/2 rounded-full bg-inverse-surface" />
      <div className="relative h-full overflow-hidden rounded-[34px] bg-surface-container-lowest">
        <div className="flex items-center justify-between border-b border-outline-variant px-4 pt-8 pb-2">
          <span className="flex items-center gap-1 font-label-md text-label-md text-primary">
            <Icon name="eco" filled className="text-[18px]" /> {appName}
          </span>
          <span className="font-caption text-caption text-on-surface-variant">
            {index + 1}/{screens.length}
          </span>
        </div>
        <div className="relative h-[calc(100%-56px)]">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
            >
              {shot?.asset ? (
                <SanityImage
                  image={shot}
                  alt={`${appName} screen ${index + 1}`}
                  fill
                  sizes="300px"
                  className="object-cover"
                />
              ) : (
                <Screen />
              )}
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
