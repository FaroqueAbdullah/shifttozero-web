import Image, { type ImageProps } from "next/image";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";

type SanityImageProps = Omit<ImageProps, "src" | "alt"> & {
  image: (SanityImageSource & { alt?: string }) | null | undefined;
  alt?: string;
  /** Requested width for the CDN; next/image picks responsive sizes from `sizes`. */
  width?: number;
  height?: number;
};

/** Sanity CDN image through next/image. Respects the editor's crop and hotspot. */
export function SanityImage({ image, alt, width = 1200, height, ...props }: SanityImageProps) {
  if (!image) return null;
  let builder = urlFor(image).width(width).fit("crop");
  if (height) builder = builder.height(height);
  const src = builder.url();
  const altText = alt ?? (typeof image === "object" && "alt" in image ? image.alt : undefined) ?? "";

  return props.fill ? (
    <Image src={src} alt={altText} {...props} />
  ) : (
    <Image src={src} alt={altText} width={width} height={height ?? Math.round(width * 0.5625)} {...props} />
  );
}
