import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

const control =
  "w-full rounded border-outline-variant bg-surface px-4 py-3 text-on-surface transition-colors placeholder:text-outline focus:border-primary focus:ring-1 focus:ring-primary aria-[invalid=true]:border-error aria-[invalid=true]:ring-error";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(control, className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(control, className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(control, "pr-10", className)} {...props} />;
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label className={cn("mb-2 block font-label-md text-label-md text-on-surface", className)} {...props} />
  );
}

export function FieldError({ id, children }: { id?: string; children?: React.ReactNode }) {
  if (!children) return null;
  return (
    <p id={id} role="alert" className="mt-1 font-caption text-caption text-error">
      {children}
    </p>
  );
}
