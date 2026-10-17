import type { PortableTextBlock } from "next-sanity";
import type { Department, EventMode, EventType, PostCategory, ToolCategory, ToolPricing } from "../constants";

/** Result shapes for the queries in ./queries.ts. Keep in sync when a projection changes. */

export type SanityImage = {
  _type?: "image";
  asset?: { _ref: string; _type: "reference" };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
};

export type IconItem = { _key: string; icon?: string; title?: string; text?: string };
export type StatItem = { _key: string; icon?: string; value?: string; label?: string };

export type SiteSettings = {
  heroTitle?: string;
  heroText?: string;
  heroImage?: SanityImage;
  emissionsBreakdown?: { _key: string; label: string; percent: number }[];
  emissionsFootnote?: string;
  impactStats?: StatItem[];
  methodologySteps?: IconItem[];
  cta?: { title?: string; text?: string };
  coreValues?: IconItem[];
  socialLinks?: { _key: string; platform?: string; url?: string }[];
  contactEmail?: string;
  brochureUrl?: string | null;
  impact?: {
    eyebrow?: string;
    title?: string;
    asOf?: string;
    factories?: { value?: number; suffix?: string; label?: string; note?: string };
    carbon?: { value?: number; decimals?: number; suffix?: string; label?: string; note?: string };
  };
  appIntro?: {
    eyebrow?: string;
    title?: string;
    text?: string;
    comparison?: { _key: string; typical?: string; ours?: string }[];
  };
  whatWeDo?: { eyebrow?: string; title?: string; text?: string; pillars?: IconItem[] };
  app?: {
    name?: string;
    title?: string;
    text?: string;
    steps?: IconItem[];
    screenshots?: (SanityImage & { _key: string })[];
  };
  volunteer?: { title?: string; text?: string; roles?: IconItem[]; skills?: string[] };
  funding?: {
    title?: string;
    text?: string;
    allocation?: { _key: string; label: string; percent: number }[];
  };
};

export type PersonSummary = { name: string; role?: string; photo?: SanityImage };

export type PostCard = {
  _id: string;
  title: string;
  slug: string;
  category: PostCategory;
  coverImage?: SanityImage;
  excerpt?: string;
  publishedAt?: string;
  featured?: boolean;
  tags?: string[];
  readTime?: number;
  author?: PersonSummary | null;
};

export type Post = PostCard & {
  body?: PortableTextBlock[];
  related: PostCard[];
};

export type EventCta = { label?: "Register Now" | "Watch Replay" | "Request Invite"; url?: string };

export type EventCard = {
  _id: string;
  title: string;
  slug: string;
  eventType: EventType;
  mode: EventMode;
  location?: string;
  startsAt: string;
  endsAt?: string;
  capacity?: number;
  summary?: string;
  heroImage?: SanityImage;
  cta?: EventCta;
};

export type EventDetail = EventCard & {
  about?: PortableTextBlock[];
  highlights?: StatItem[];
  venue?: { name?: string; address?: string; mapUrl?: string };
  agenda?: {
    _key: string;
    time?: string;
    title?: string;
    description?: string;
    speaker?: PersonSummary | null;
  }[];
};

export type TeamMember = {
  _id: string;
  name: string;
  role: string;
  department?: Department;
  photo?: SanityImage;
  bio?: string;
  linkedin?: string;
};

export type CarbonTool = {
  _id: string;
  name: string;
  organization?: string;
  category: ToolCategory;
  pricing?: ToolPricing;
  icon?: string;
  logo?: SanityImage;
  description: string;
  audience?: string;
  inputs?: string;
  url: string;
  lastChecked?: string;
};

export type ContentCounts = { posts: number; events: number; team: number };

export type AdminPostRow = {
  _id: string;
  title: string;
  excerpt?: string;
  category?: PostCategory;
  publishedAt?: string;
  _updatedAt: string;
  author?: string;
  isDraft: boolean;
};

export type AdminEventRow = {
  _id: string;
  title: string;
  eventType?: EventType;
  mode?: EventMode;
  location?: string;
  startsAt?: string;
  capacity?: number;
  isDraft: boolean;
};

export type AdminTeamRow = {
  _id: string;
  name: string;
  role?: string;
  department?: Department;
  photo?: SanityImage;
  linkedin?: string;
  isDraft: boolean;
};
