import { cacheLife } from "next/cache";

/** Cached so it can be part of the static shell; refreshes daily. */
export async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
