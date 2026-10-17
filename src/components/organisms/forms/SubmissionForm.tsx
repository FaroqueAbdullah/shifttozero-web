"use client";

import { useActionState, useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import type { FormState } from "@/lib/actions/submit";
import { cn } from "@/lib/utils";

type Action = (prev: FormState, formData: FormData) => Promise<FormState>;

type SubmissionFormProps = {
  action: Action;
  submitLabel: string;
  submitIcon: string;
  /** "solid": filled primary button. "outline": primary outline (Companies form in the design). */
  submitStyle?: "solid" | "outline";
  successTitle: string;
  successText: string;
  /** Render prop gets the field errors from the last submit. */
  children: (errors: Record<string, string[] | undefined>) => ReactNode;
};

/**
 * Wraps a Server Action form: anti-spam fields, pending state, error summary
 * and success message. Works without JavaScript (plain form post).
 */
export function SubmissionForm({
  action,
  submitLabel,
  submitIcon,
  submitStyle = "solid",
  successTitle,
  successText,
  children,
}: SubmissionFormProps) {
  const [state, formAction, pending] = useActionState(action, { status: "idle" });
  const startedAt = useRef<HTMLInputElement>(null);

  // Stamp the time the form became interactive (used by the server-side bot check).
  useEffect(() => {
    if (startedAt.current) startedAt.current.value = String(Date.now());
  }, []);

  if (state.status === "success") {
    return (
      <div
        role="status"
        className="flex flex-grow flex-col items-center justify-center rounded-lg bg-primary-container/15 p-8 text-center"
      >
        <Icon name="check_circle" filled className="mb-4 text-[48px] text-primary" />
        <p className="font-headline-md text-headline-md text-on-surface">{successTitle}</p>
        <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{successText}</p>
      </div>
    );
  }

  const errors = state.status === "error" ? (state.fieldErrors ?? {}) : {};

  return (
    <form action={formAction} className="flex flex-grow flex-col gap-6" noValidate={false}>
      {state.status === "error" && (
        <p
          role="alert"
          className="rounded-lg bg-error-container px-4 py-3 font-body-md text-body-md text-on-error-container"
        >
          {state.message}
        </p>
      )}

      {children(errors)}

      {/* Anti-spam: honeypot (hidden from people) and form start time. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`website-${submitLabel}`}>Website</label>
        <input
          id={`website-${submitLabel}`}
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
        />
      </div>
      <input ref={startedAt} type="hidden" name="startedAt" defaultValue="0" />

      <div className="mt-auto pt-4">
        <button
          type="submit"
          disabled={pending}
          className={cn(
            "flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 font-label-md text-label-md transition-all disabled:opacity-60",
            submitStyle === "solid"
              ? "bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container"
              : "border-2 border-primary text-primary hover:bg-primary/5",
          )}
        >
          {pending ? "Sending…" : submitLabel}
          <Icon
            name={pending ? "progress_activity" : submitIcon}
            className={cn("text-[20px]", pending && "animate-spin")}
          />
        </button>
      </div>
    </form>
  );
}
