import { Icon } from "@/components/atoms/Icon";
import { Reveal } from "./Reveal";

type Row = { _key: string; typical?: string; ours?: string };

/** Two-column "typical tools assume / our app assumes" comparison; rows slide in one by one. */
export function ComparisonTable({ rows }: { rows: Row[] }) {
  if (!rows.length) return null;
  return (
    <div className="overflow-hidden rounded-card border border-outline-variant bg-surface-container-lowest">
      <div className="grid grid-cols-2 border-b border-outline-variant bg-surface-container-low">
        <p className="px-4 py-3 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase md:px-6">
          Typical carbon tools assume
        </p>
        <p className="border-l border-outline-variant px-4 py-3 font-label-md text-label-md tracking-wider text-primary uppercase md:px-6">
          Our app assumes
        </p>
      </div>
      <ul>
        {rows.map((row, i) => (
          <Reveal
            as="li"
            key={row._key}
            delay={i * 0.08}
            className="grid grid-cols-2 border-b border-keyline last:border-0"
          >
            <span className="flex items-start gap-2 px-4 py-4 font-body-md text-body-md text-on-surface-variant md:px-6">
              <Icon name="close" className="mt-0.5 text-[18px] text-outline" />
              {row.typical}
            </span>
            <span className="flex items-start gap-2 border-l border-outline-variant bg-primary-container/[0.06] px-4 py-4 font-body-md text-body-md text-on-surface md:px-6">
              <Icon name="check_circle" filled className="mt-0.5 text-[18px] text-primary" />
              {row.ours}
            </span>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
