import { TeamCard } from "@/components/molecules/TeamCard";
import type { TeamMember } from "@/sanity/lib/types";
import { EmptyState } from "../EmptyState";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  if (!members.length) return <EmptyState icon="group" title="Team coming soon" />;
  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:hidden">
        {members.map((member) => (
          <TeamCard key={member._id} member={member} variant="compact" />
        ))}
      </div>
      <div className="hidden grid-cols-2 gap-gutter md:grid lg:grid-cols-3">
        {members.map((member) => (
          <TeamCard key={member._id} member={member} />
        ))}
      </div>
    </>
  );
}
