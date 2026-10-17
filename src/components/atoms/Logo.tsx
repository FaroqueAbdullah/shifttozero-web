import Image from "next/image";
import { cn } from "@/lib/utils";

/** The logo PNG has a white background, so it always sits on a rounded white tile. */
export function Logo({
  size = 40,
  className,
  priority,
}: {
  size?: number;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Shift to Zero Carbon logo"
      width={Math.round(size * 1.026)}
      height={size}
      priority={priority}
      className={cn("rounded-md bg-white", className)}
    />
  );
}
