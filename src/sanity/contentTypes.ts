/**
 * Document types whose changes revalidate the site. Kept free of `sanity`
 * imports so server code (route handlers, fetch helpers) can use it.
 */
export const CONTENT_TYPES = ["post", "event", "teamMember", "carbonTool", "siteSettings"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];
