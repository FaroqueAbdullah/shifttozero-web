"use client";

import { useState } from "react";
import { Icon } from "@/components/atoms/Icon";

const buttonClass =
  "flex h-10 w-10 items-center justify-center rounded-full border border-outline-variant bg-surface-container-lowest text-on-surface-variant transition-all hover:border-primary hover:text-primary";

/** "Share" uses the device share sheet where available; "Copy link" copies the URL. */
export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    if (navigator.share) {
      await navigator.share({ title, url }).catch(() => {});
    } else {
      await copy();
    }
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: nothing useful to do.
    }
  }

  return (
    <div className="flex items-center gap-4">
      <span className="font-label-md text-label-md text-on-surface-variant">Share this article:</span>
      <button type="button" onClick={share} className={buttonClass} aria-label="Share">
        <Icon name="share" className="text-[20px]" />
      </button>
      <button type="button" onClick={copy} className={buttonClass} aria-label="Copy link">
        <Icon name={copied ? "check" : "link"} className="text-[20px]" />
      </button>
      <span aria-live="polite" className="font-caption text-caption text-primary">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
