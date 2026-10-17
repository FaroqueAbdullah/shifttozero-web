import { Icon } from "@/components/atoms/Icon";
import { studioEditUrl } from "@/lib/studio";

/** Edit and delete both happen in Sanity Studio (opens the document there). */
export function RowActions({ id, type, title }: { id: string; type: string; title: string }) {
  const href = studioEditUrl(id, type);
  return (
    <div className="flex justify-end gap-2 opacity-100 transition-opacity lg:opacity-0 lg:group-focus-within:opacity-100 lg:group-hover:opacity-100">
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Edit ${title} in Studio`}
        title="Edit in Studio"
        className="rounded-full p-2 text-secondary transition-colors hover:bg-surface-container-high"
      >
        <Icon name="edit" className="text-[20px]" />
      </a>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`Delete ${title} in Studio`}
        title="Delete in Studio (opens the document)"
        className="rounded-full p-2 text-error transition-colors hover:bg-error-container hover:text-on-error-container"
      >
        <Icon name="delete" className="text-[20px]" />
      </a>
    </div>
  );
}
