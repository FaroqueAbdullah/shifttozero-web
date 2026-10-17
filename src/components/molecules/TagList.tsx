export function TagList({ tags }: { tags?: string[] }) {
  if (!tags?.length) return null;
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full bg-surface-container px-3 py-1 font-caption text-caption text-on-surface-variant"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
