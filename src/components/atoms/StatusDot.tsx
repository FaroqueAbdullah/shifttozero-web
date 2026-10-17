import { cn } from "@/lib/utils";

type Tone = "primary" | "tertiary" | "neutral" | "error";

const tones: Record<Tone, { text: string; dot: string }> = {
  primary: { text: "text-primary", dot: "bg-primary" },
  tertiary: { text: "text-tertiary", dot: "bg-tertiary" },
  neutral: { text: "text-on-surface-variant", dot: "bg-outline" },
  error: { text: "text-error", dot: "bg-error" },
};

/** Status with a colored dot, e.g. "Published", "Draft", "New". */
export function StatusDot({ tone = "primary", label }: { tone?: Tone; label: string }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", tones[tone].text)}>
      <span aria-hidden className={cn("h-2 w-2 rounded-full", tones[tone].dot)} />
      <span className="font-label-md text-label-md">{label}</span>
    </span>
  );
}
