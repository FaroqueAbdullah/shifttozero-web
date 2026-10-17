import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "../env";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // Next.js caching + webhook revalidation handle freshness, so the CDN is safe to use.
  useCdn: true,
});
