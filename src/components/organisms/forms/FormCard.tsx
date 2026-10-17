import type { ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { cn } from "@/lib/utils";

type FormCardProps = {
  id?: string;
  icon: string;
  title: string;
  description: string;
  tone?: "primary" | "secondary";
  children: ReactNode;
};

/** Card frame shared by the Get Involved forms. */
export function FormCard({ id, icon, title, description, tone = "secondary", children }: FormCardProps) {
  return (
    <section
      id={id}
      className="relative flex scroll-mt-24 flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest p-8 shadow-sm"
    >
      {tone === "primary" && (
        <div className="pointer-events-none absolute top-0 right-0 h-32 w-32 rounded-bl-full bg-primary/5" />
      )}
      <div className="relative z-10 mb-8 flex items-center gap-4">
        <div
          className={cn(
            "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
            tone === "primary"
              ? "bg-primary-container text-on-primary-container"
              : "bg-secondary-container text-on-secondary-container",
          )}
        >
          <Icon name={icon} filled className="text-[28px]" />
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-on-surface md:font-headline-lg md:text-headline-lg">
          {title}
        </h2>
      </div>
      <p className="relative z-10 mb-8 font-body-md text-body-md text-on-surface-variant">{description}</p>
      <div className="relative z-10 flex flex-grow flex-col">{children}</div>
    </section>
  );
}
