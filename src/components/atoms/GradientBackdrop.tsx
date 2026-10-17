import { cn } from "@/lib/utils";

/** Slowly drifting brand-colour glows behind a section (CSS only; static with reduced motion). */
export function GradientBackdrop({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      <div className="absolute -top-1/4 -left-1/4 h-[70%] w-[60%] rounded-full bg-primary-container/25 blur-3xl motion-safe:animate-drift" />
      <div className="absolute top-1/3 -right-1/4 h-[60%] w-[55%] rounded-full bg-tertiary-container/20 blur-3xl motion-safe:animate-drift-slow" />
      <div className="absolute -bottom-1/3 left-1/4 h-[50%] w-[45%] rounded-full bg-primary-fixed-dim/20 blur-3xl motion-safe:animate-drift" />
      <div className="absolute inset-0 bg-tech-pattern opacity-40" />
    </div>
  );
}
