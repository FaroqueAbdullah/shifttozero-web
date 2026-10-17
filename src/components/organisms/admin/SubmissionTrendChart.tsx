type Point = { day: string; label: string; count: number };

/**
 * Single-series bar chart (submissions per day). One hue (primary token), no legend:
 * the title names the series. Each bar has a hover/focus tooltip; a visually hidden
 * table carries the same data for screen readers.
 */
export function SubmissionTrendChart({ points }: { points: Point[] }) {
  const max = Math.max(1, ...points.map((p) => p.count));
  const total = points.reduce((s, p) => s + p.count, 0);
  const peak = points.reduce((a, b) => (b.count > a.count ? b : a), points[0]);

  return (
    <section className="flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest lg:col-span-2">
      <div className="flex items-center justify-between border-b border-outline-variant p-6">
        <h2 className="font-headline-md text-headline-md text-on-surface">Submission Trends</h2>
        <span className="font-caption text-caption text-on-surface-variant">
          {total} in the last {points.length} days
        </span>
      </div>

      <div className="flex min-h-[300px] flex-1 flex-col justify-end p-6">
        {total === 0 ? (
          <p className="m-auto font-body-md text-body-md text-on-surface-variant">
            No submissions in this period yet.
          </p>
        ) : (
          <div
            className="relative flex h-56 items-end gap-[2px] border-b border-outline-variant/60"
            aria-hidden
          >
            {points.map((p) => (
              <div
                key={p.day}
                className="group relative flex h-full flex-1 items-end justify-center"
                tabIndex={0}
              >
                <div
                  className="w-full max-w-12 rounded-t bg-primary/70 transition-colors group-hover:bg-primary group-focus:bg-primary"
                  style={{ height: `${(p.count / max) * 100}%`, minHeight: p.count ? 4 : 0 }}
                />
                {/* Direct label on the peak only; others via tooltip. */}
                {p === peak && (
                  <span
                    className="absolute font-caption text-caption text-on-surface"
                    style={{ bottom: `calc(${(p.count / max) * 100}% + 4px)` }}
                  >
                    {p.count}
                  </span>
                )}
                <div className="pointer-events-none absolute bottom-full z-10 mb-2 hidden rounded-lg border border-outline-variant bg-surface-container-highest px-3 py-2 whitespace-nowrap shadow-ambient group-hover:block group-focus:block">
                  <p className="font-caption text-caption text-on-surface-variant">{p.label}</p>
                  <p className="font-label-md text-label-md text-on-surface">
                    {p.count} submission{p.count === 1 ? "" : "s"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="mt-2 flex gap-[2px]" aria-hidden>
          {points.map((p) => (
            <span
              key={p.day}
              className="flex-1 text-center font-caption text-caption text-on-surface-variant"
            >
              {p.label.split(",")[0]}
            </span>
          ))}
        </div>

        <table className="sr-only">
          <caption>Submissions per day</caption>
          <thead>
            <tr>
              <th scope="col">Day</th>
              <th scope="col">Submissions</th>
            </tr>
          </thead>
          <tbody>
            {points.map((p) => (
              <tr key={p.day}>
                <td>{p.label}</td>
                <td>{p.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
