import { IconCard } from "@/components/molecules/IconCard";
import type { IconItem } from "@/sanity/lib/types";

export function CoreValues({ values }: { values?: IconItem[] }) {
  if (!values?.length) return null;
  return (
    <section className="hidden rounded-xl border border-outline-variant bg-surface-container-low p-8 md:block md:p-12">
      <h2 className="mb-12 text-center font-headline-lg-mobile text-headline-lg-mobile text-on-background md:font-headline-lg md:text-headline-lg">
        Our Core Values
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {values.map((value) => (
          <IconCard
            key={value._key}
            variant="value"
            icon={value.icon}
            title={value.title ?? ""}
            text={value.text}
          />
        ))}
      </div>
    </section>
  );
}
