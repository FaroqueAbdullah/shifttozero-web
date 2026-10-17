/** Option lists shared by schemas and UI filters. Free of `sanity` imports so client components can use them. */
export const POST_CATEGORIES = ["Technology", "Policy", "Case Study", "Community"] as const;
export const EVENT_TYPES = ["Summit", "Workshop", "Webinar", "Conference"] as const;
export const EVENT_MODES = ["In person", "Virtual", "Recorded"] as const;
export const TOOL_CATEGORIES = [
  "Free & standards",
  "Business platforms",
  "Industry-specific",
  "Product footprint (LCA)",
  "Developer API",
] as const;
export const TOOL_PRICING = ["Free", "Paid"] as const;
export const DEPARTMENTS = ["Leadership", "Engineering", "Policy", "Operations"] as const;

export type PostCategory = (typeof POST_CATEGORIES)[number];
export type EventType = (typeof EVENT_TYPES)[number];
export type EventMode = (typeof EVENT_MODES)[number];
export type ToolCategory = (typeof TOOL_CATEGORIES)[number];
export type ToolPricing = (typeof TOOL_PRICING)[number];
export type Department = (typeof DEPARTMENTS)[number];
