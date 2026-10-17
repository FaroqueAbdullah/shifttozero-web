export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-10-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

/** Placeholder keeps builds working before the Sanity project exists; queries will fail until it's set. */
export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "missing-project-id";

export const isSanityConfigured = Boolean(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);
