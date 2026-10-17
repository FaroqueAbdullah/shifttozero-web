"use client";

import { Badge } from "@/components/atoms/Badge";
import { StatusDot } from "@/components/atoms/StatusDot";
import { formatDate } from "@/lib/format";
import { POST_CATEGORIES } from "@/sanity/constants";
import type { AdminPostRow } from "@/sanity/lib/types";
import { DataTable } from "./DataTable";
import { RowActions } from "./RowActions";

const time = (r: AdminPostRow) => new Date(r.publishedAt ?? r._updatedAt).getTime();

export function BlogsTable({ posts }: { posts: AdminPostRow[] }) {
  return (
    <DataTable
      rows={posts}
      rowKey={(r) => r._id}
      itemLabel="posts"
      searchLabel="Search posts"
      searchText={(r) => `${r.title} ${r.excerpt ?? ""} ${r.author ?? ""}`}
      filter={{ label: "Filter by", options: POST_CATEGORIES, value: (r) => r.category }}
      sorts={[
        { label: "Date (Newest First)", compare: (a, b) => time(b) - time(a) },
        { label: "Date (Oldest First)", compare: (a, b) => time(a) - time(b) },
        { label: "Title (A-Z)", compare: (a, b) => a.title.localeCompare(b.title) },
      ]}
      columns={[
        {
          header: "Title",
          className: "w-1/3",
          cell: (r) => (
            <>
              <div className="mb-1 font-body-lg text-body-lg font-semibold text-on-surface">{r.title}</div>
              {r.excerpt && (
                <div className="line-clamp-1 font-caption text-caption text-on-surface-variant">
                  {r.excerpt}
                </div>
              )}
            </>
          ),
        },
        { header: "Author", cell: (r) => <span className="text-on-surface">{r.author ?? "—"}</span> },
        { header: "Category", cell: (r) => (r.category ? <Badge>{r.category}</Badge> : "—") },
        {
          header: "Date",
          cell: (r) => (
            <span className="text-on-surface-variant">{formatDate(r.publishedAt ?? r._updatedAt)}</span>
          ),
        },
        {
          header: "Status",
          cell: (r) =>
            r.isDraft ? <StatusDot tone="neutral" label="Draft" /> : <StatusDot label="Published" />,
        },
        {
          header: "Actions",
          align: "right",
          cell: (r) => <RowActions id={r._id} type="post" title={r.title} />,
        },
      ]}
    />
  );
}
