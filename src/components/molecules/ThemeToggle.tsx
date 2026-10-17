"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/atoms/Icon";
import { THEME_STORAGE_KEY, type Theme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

const getTheme = () => (document.documentElement.dataset.theme === "dark" ? "dark" : "light") as Theme;

export function ThemeToggle({ className }: { className?: string }) {
  // null on the server: the real theme is only known in the browser.
  const theme = useSyncExternalStore<Theme | null>(subscribe, getTheme, () => null);
  const next: Theme = theme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage blocked (private mode): the theme still applies for this page view.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme ? `Switch to ${next} mode` : "Toggle theme"}
      title={theme ? `Switch to ${next} mode` : undefined}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-primary",
        className,
      )}
    >
      <Icon
        name={theme === "dark" ? "light_mode" : "dark_mode"}
        className={cn("text-[20px]", !theme && "opacity-0")}
      />
    </button>
  );
}
