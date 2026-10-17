"use client";

import { useDeferredValue, useMemo, useState, type ReactNode } from "react";
import { Icon } from "@/components/atoms/Icon";
import { SearchInput } from "@/components/molecules/SearchInput";
import { cn } from "@/lib/utils";

export type Column<T> = {
  header: string;
  cell: (row: T) => ReactNode;
  className?: string;
  align?: "left" | "right";
};

export type FilterDef<T> = {
  label: string;
  options: readonly string[];
  value: (row: T) => string | undefined;
};
export type SortDef<T> = { label: string; compare: (a: T, b: T) => number };

type DataTableProps<T> = {
  rows: T[];
  rowKey: (row: T) => string;
  columns: Column<T>[];
  /** Text searched by the search box. */
  searchText: (row: T) => string;
  searchLabel: string;
  filter?: FilterDef<T>;
  sorts?: SortDef<T>[];
  itemLabel: string;
  pageSize?: number;
};

/** Search, filter chips, sort and pagination over an in-memory list (admin tables). */
export function DataTable<T>({
  rows,
  rowKey,
  columns,
  searchText,
  searchLabel,
  filter,
  sorts = [],
  itemLabel,
  pageSize = 10,
}: DataTableProps<T>) {
  const [query, setQuery] = useState("");
  const [filterValue, setFilterValue] = useState("all");
  const [sortIndex, setSortIndex] = useState(0);
  const [page, setPage] = useState(0);
  const deferredQuery = useDeferredValue(query);

  const result = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    const list = rows.filter(
      (r) =>
        (!filter || filterValue === "all" || filter.value(r) === filterValue) &&
        (!q || searchText(r).toLowerCase().includes(q)),
    );
    return sorts[sortIndex] ? [...list].sort(sorts[sortIndex].compare) : list;
  }, [rows, filter, filterValue, deferredQuery, searchText, sorts, sortIndex]);

  const pages = Math.max(1, Math.ceil(result.length / pageSize));
  const current = Math.min(page, pages - 1);
  const visible = result.slice(current * pageSize, current * pageSize + pageSize);
  const reset = () => setPage(0);

  const chip = (value: string, label: string) => (
    <button
      key={value}
      type="button"
      aria-pressed={filterValue === value}
      onClick={() => {
        setFilterValue(value);
        reset();
      }}
      className={cn(
        "rounded-full border px-4 py-1.5 font-label-md text-label-md whitespace-nowrap transition-colors",
        filterValue === value
          ? "border-primary bg-primary-container text-on-primary-container"
          : "border-outline-variant text-on-surface hover:border-primary hover:text-primary",
      )}
    >
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface p-4 shadow-sm xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <SearchInput
            label={searchLabel}
            placeholder={`${searchLabel}...`}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              reset();
            }}
            className="md:w-64"
          />
          {filter && (
            <div role="group" aria-label={filter.label} className="flex items-center gap-2 overflow-x-auto">
              <span className="font-label-md text-label-md tracking-wider whitespace-nowrap text-on-surface-variant uppercase">
                {filter.label}:
              </span>
              {chip("all", "All")}
              {filter.options.map((o) => chip(o, o))}
            </div>
          )}
        </div>
        {sorts.length > 1 && (
          <label className="flex items-center gap-2">
            <span className="font-label-md text-label-md text-on-surface-variant">Sort:</span>
            <select
              value={sortIndex}
              onChange={(e) => setSortIndex(Number(e.target.value))}
              className="cursor-pointer rounded-lg border-outline-variant bg-surface py-1.5 font-label-md text-label-md text-on-surface focus:border-primary focus:ring-primary"
            >
              {sorts.map((s, i) => (
                <option key={s.label} value={i}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>

      <div className="overflow-hidden rounded-xl border border-outline-variant bg-surface shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="border-b border-outline-variant bg-surface-container-lowest">
                {columns.map((c) => (
                  <th
                    key={c.header}
                    scope="col"
                    className={cn(
                      "px-6 py-4 font-label-md text-label-md tracking-wider text-on-surface-variant uppercase",
                      c.align === "right" && "text-right",
                      c.className,
                    )}
                  >
                    {c.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant">
              {visible.map((row) => (
                <tr key={rowKey(row)} className="group transition-colors hover:bg-surface-container-low">
                  {columns.map((c) => (
                    <td
                      key={c.header}
                      className={cn("px-6 py-4 align-middle", c.align === "right" && "text-right")}
                    >
                      {c.cell(row)}
                    </td>
                  ))}
                </tr>
              ))}
              {visible.length === 0 && (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-6 py-12 text-center font-body-md text-body-md text-on-surface-variant"
                  >
                    No {itemLabel} found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-outline-variant bg-surface-container-lowest p-4">
          <span className="font-caption text-caption text-on-surface-variant" aria-live="polite">
            {result.length
              ? `Showing ${current * pageSize + 1}-${current * pageSize + visible.length} of ${result.length} ${itemLabel}`
              : `0 ${itemLabel}`}
          </span>
          {pages > 1 && (
            <nav aria-label="Pagination" className="flex gap-1">
              <PageButton label="Previous page" disabled={current === 0} onClick={() => setPage(current - 1)}>
                <Icon name="chevron_left" className="text-[18px]" />
              </PageButton>
              {Array.from({ length: pages }, (_, i) => (
                <PageButton key={i} label={`Page ${i + 1}`} active={i === current} onClick={() => setPage(i)}>
                  {i + 1}
                </PageButton>
              ))}
              <PageButton
                label="Next page"
                disabled={current === pages - 1}
                onClick={() => setPage(current + 1)}
              >
                <Icon name="chevron_right" className="text-[18px]" />
              </PageButton>
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

function PageButton({
  children,
  label,
  active,
  disabled,
  onClick,
}: {
  children: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-current={active ? "page" : undefined}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded font-label-md text-label-md transition-colors disabled:opacity-50",
        active
          ? "bg-primary-container text-on-primary-container"
          : "text-on-surface-variant hover:bg-surface-container-low",
      )}
    >
      {children}
    </button>
  );
}
