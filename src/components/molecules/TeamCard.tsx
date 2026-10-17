import { Icon } from "@/components/atoms/Icon";
import { SanityImage } from "@/components/atoms/SanityImage";
import { cn } from "@/lib/utils";
import type { TeamMember } from "@/sanity/lib/types";

export function TeamCard({
  member,
  variant = "card",
  className,
}: {
  member: TeamMember;
  /** "card": photo card. "compact": round photo, name and role (Team on phones). */
  variant?: "card" | "compact";
  className?: string;
}) {
  if (variant === "compact") {
    return (
      <div
        className={cn(
          "flex flex-col items-center rounded-xl border border-outline-variant bg-surface-container-lowest p-4 text-center",
          className,
        )}
      >
        <div className="relative mb-3 h-[72px] w-[72px] overflow-hidden rounded-full ring-2 ring-primary ring-offset-2 ring-offset-surface-container-lowest">
          <SanityImage
            image={member.photo}
            alt={member.name}
            fill
            sizes="72px"
            className="object-cover object-top"
          />
        </div>
        <h3 className="font-label-md text-label-md text-on-surface">{member.name}</h3>
        <p className="font-caption text-caption text-on-surface-variant">{member.role}</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-shadow duration-300 hover:shadow-ambient",
        className,
      )}
    >
      <div className="relative h-64 w-full bg-surface-container-highest">
        <SanityImage
          image={member.photo}
          alt={member.name}
          fill
          sizes="(min-width: 1024px) 384px, (min-width: 768px) 50vw, 100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-1 font-headline-md text-headline-md text-on-background">{member.name}</h3>
        <p className="mb-4 font-label-md text-label-md text-primary">{member.role}</p>
        {member.bio && <p className="font-body-md text-body-md text-on-surface-variant">{member.bio}</p>}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-1 font-label-md text-label-md text-secondary hover:text-primary"
          >
            <Icon name="link" className="text-[18px]" /> LinkedIn
          </a>
        )}
      </div>
    </div>
  );
}
