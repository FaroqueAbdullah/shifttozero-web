import { Avatar } from "@/components/atoms/Avatar";
import { urlFor } from "@/sanity/lib/image";
import type { EventDetail } from "@/sanity/lib/types";

type Item = NonNullable<EventDetail["agenda"]>[number];

export function AgendaItem({ item }: { item: Item }) {
  const photo = item.speaker?.photo?.asset ? urlFor(item.speaker.photo).width(64).height(64).url() : null;
  return (
    <div className="flex flex-col border-b border-outline-variant transition-colors last:border-0 hover:bg-surface-bright md:flex-row">
      <div className="flex items-center border-outline-variant bg-surface-container-low p-6 md:w-48 md:justify-center md:border-r">
        <span className="font-label-md text-label-md text-primary">{item.time}</span>
      </div>
      <div className="flex-grow p-6">
        <h3 className="mb-2 font-body-lg text-body-lg font-semibold text-on-surface md:font-headline-md md:text-headline-md">
          {item.title}
        </h3>
        {item.description && (
          <p className="mb-4 font-body-md text-body-md text-on-surface-variant">{item.description}</p>
        )}
        {item.speaker?.name && (
          <div className="flex items-center gap-3">
            <Avatar
              name={item.speaker.name}
              src={photo}
              size={32}
              className="border border-outline-variant"
            />
            <span className="font-caption text-caption font-semibold text-on-surface">
              {item.speaker.name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
