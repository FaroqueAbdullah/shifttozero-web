import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

const steps = [
  { icon: "mic", label: "Worker says", value: "“আজ বারো বস্তা কয়লা গেছে”", bangla: true },
  { icon: "landscape", label: "App understands", value: "Coal · 12 sacks · 600 kg" },
  {
    icon: "check",
    label: "Inventory records",
    value: "Scope 1 · Stationary combustion · tCO₂e",
    result: true,
  },
];

/** One spoken sentence becoming an emission record: three cards rise in with arrows between. */
export function FlowCards({ className }: { className?: string }) {
  return (
    <div
      className={cn("flex flex-col gap-3.5", className)}
      aria-label="Example: one spoken sentence becomes an emission record"
    >
      {steps.map((s, i) => (
        <div key={s.label} className="contents">
          {i > 0 && (
            <span
              className="self-center text-on-surface-variant motion-safe:animate-fade-in"
              style={{ animationDelay: `${0.55 + (i - 1) * 0.6}s` }}
            >
              <Icon name="arrow_downward" />
            </span>
          )}
          <div
            className="flex items-center gap-3.5 rounded-[20px] bg-surface-container-lowest px-[18px] py-4 shadow-ambient motion-safe:animate-rise"
            style={{ animationDelay: `${0.15 + i * 0.6}s` }}
          >
            <span
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-xl",
                s.result
                  ? "bg-primary-container/25 text-primary"
                  : "bg-secondary-container text-on-secondary-container",
              )}
            >
              <Icon name={s.icon} />
            </span>
            <span>
              <small className="block font-caption text-[12px] font-semibold tracking-[0.08em] text-on-surface-variant uppercase">
                {s.label}
              </small>
              <b className={cn("text-[17px] text-on-surface", s.bangla && "font-bengali")}>{s.value}</b>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
