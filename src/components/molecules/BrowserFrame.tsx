import Image from "next/image";
import { Reveal } from "./Reveal";

type BrowserFrameProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  address: string;
  caption: string;
};

/** Screenshot of a web screen in a simple browser frame, faded at the bottom. */
export function BrowserFrame({ src, alt, width, height, address, caption }: BrowserFrameProps) {
  return (
    <Reveal as="div" className="mt-10">
      <figure className="overflow-hidden rounded-[20px] border border-outline-variant bg-surface-container-lowest shadow-ambient">
        <div
          className="flex items-center gap-1.5 border-b border-outline-variant bg-surface-container-low px-3.5 py-2.5"
          aria-hidden
        >
          <i className="block h-2.5 w-2.5 rounded-full bg-outline-variant" />
          <i className="block h-2.5 w-2.5 rounded-full bg-outline-variant" />
          <i className="block h-2.5 w-2.5 rounded-full bg-outline-variant" />
          <span className="ml-2.5 font-mono text-[12px] text-on-surface-variant">{address}</span>
        </div>
        <div className="relative max-h-[620px] overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            sizes="(min-width: 1280px) 1184px, 100vw"
            className="block h-auto w-full"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-surface-container-lowest" />
        </div>
        <figcaption className="border-t border-outline-variant px-4 py-3.5 font-body-md text-[14px] text-on-surface-variant">
          {caption}
        </figcaption>
      </figure>
    </Reveal>
  );
}
