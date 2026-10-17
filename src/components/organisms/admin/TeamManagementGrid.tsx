"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/atoms/Icon";
import { ChipGroup } from "@/components/molecules/ChipGroup";
import { studioEditUrl } from "@/lib/studio";
import { DEPARTMENTS, type Department } from "@/sanity/constants";
import { urlFor } from "@/sanity/lib/image";
import type { AdminTeamRow } from "@/sanity/lib/types";
import { Avatar } from "@/components/atoms/Avatar";
import { EmptyState } from "../EmptyState";

const sorts = {
  order: { label: "Display order", fn: () => 0 },
  name: { label: "Name (A-Z)", fn: (a: AdminTeamRow, b: AdminTeamRow) => a.name.localeCompare(b.name) },
  role: {
    label: "Role",
    fn: (a: AdminTeamRow, b: AdminTeamRow) => (a.role ?? "").localeCompare(b.role ?? ""),
  },
};

export function TeamManagementGrid({ members }: { members: AdminTeamRow[] }) {
  const [dept, setDept] = useState<Department | "all">("all");
  const [sort, setSort] = useState<keyof typeof sorts>("order");

  const visible = useMemo(
    () => members.filter((m) => dept === "all" || m.department === dept).sort(sorts[sort].fn),
    [members, dept, sort],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-xl border border-outline-variant bg-surface p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <ChipGroup
          label="Filter by department"
          options={DEPARTMENTS}
          value={dept}
          onChange={setDept}
          allLabel="All Members"
        />
        <label className="flex items-center gap-2">
          <span className="font-label-md text-label-md text-on-surface-variant">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as keyof typeof sorts)}
            className="cursor-pointer rounded-lg border-outline-variant bg-surface py-1.5 font-label-md text-label-md text-on-surface focus:border-primary focus:ring-primary"
          >
            {Object.entries(sorts).map(([k, s]) => (
              <option key={k} value={k}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <EmptyState icon="group" title="No team members found" />
      ) : (
        <div className="grid grid-cols-1 gap-gutter sm:grid-cols-2 xl:grid-cols-4">
          {visible.map((m) => (
            <div
              key={m._id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-outline-variant bg-surface transition-all duration-300 hover:border-outline hover:shadow-ambient"
            >
              <div className="relative h-24 bg-gradient-to-br from-surface-container to-secondary-container">
                <div className="absolute -bottom-10 left-6">
                  <Avatar
                    name={m.name}
                    src={m.photo?.asset ? urlFor(m.photo).width(160).height(160).url() : null}
                    size={80}
                    className="rounded-xl border-4 border-surface shadow-sm"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col px-6 pt-12 pb-6">
                <div className="mb-1 flex items-start justify-between gap-2">
                  <h3 className="font-body-lg text-body-lg font-semibold text-on-surface">{m.name}</h3>
                  {m.isDraft && (
                    <span className="rounded bg-surface-container px-2 py-0.5 font-caption text-caption text-on-surface-variant">
                      Draft
                    </span>
                  )}
                </div>
                <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{m.role}</p>
                {m.department && (
                  <p className="mt-auto flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
                    <Icon name="domain" className="text-[16px]" /> {m.department}
                  </p>
                )}
              </div>
              <div className="border-t border-outline-variant bg-surface-container-lowest p-4">
                <a
                  href={studioEditUrl(m._id, "teamMember")}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-lg border border-secondary py-2 text-center font-label-md text-label-md text-secondary transition-colors hover:bg-secondary/5"
                >
                  Edit in Studio
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
