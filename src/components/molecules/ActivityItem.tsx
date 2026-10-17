import { Icon } from "@/components/atoms/Icon";

type ActivityItemProps = { icon: string; text: React.ReactNode; time: string };

export function ActivityItem({ icon, text, time }: ActivityItemProps) {
  return (
    <li className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container text-primary">
        <Icon name={icon} className="text-[20px]" />
      </div>
      <div>
        <p className="font-body-md text-body-md text-on-surface">{text}</p>
        <p className="font-caption text-caption text-on-surface-variant">{time}</p>
      </div>
    </li>
  );
}
