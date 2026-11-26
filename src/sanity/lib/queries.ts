import { defineQuery } from "next-sanity";

/** ~1000 characters per minute (≈200 words × 5 chars). The UI rounds up to at least 1. */
const readTime = `"readTime": round(length(pt::text(body)) / 1000)`;

/**
 * whatWeDo, impact, impactStats, emissionsBreakdown, emissionsFootnote, app and appIntro are no longer
 * read: that copy is in src/content/site.ts.
 */
export const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings" && _id == "siteSettings"][0]{
  heroTitle, heroText, heroImage, methodologySteps, cta, coreValues, socialLinks, contactEmail, defaultSeo,
  volunteer, funding,
  "brochureUrl": brochure.asset->url
}`);

const postCard = `_id, title, "slug": slug.current, category, coverImage, excerpt, publishedAt, featured, tags,
  ${readTime}, "author": author->{ name, role, photo }, _updatedAt`;

export const POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc){ ${postCard} }`);

export const LATEST_POSTS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)]
  | order(publishedAt desc)[0...$limit]{ ${postCard} }`);

export const POST_QUERY = defineQuery(`*[_type == "post" && slug.current == $slug][0]{
  ${postCard}, body, seo,
  "related": *[_type == "post" && defined(slug.current) && slug.current != $slug]
    | order((category == ^.category) desc, publishedAt desc)[0...3]{ ${postCard} }
}`);

export const POST_SLUGS_QUERY = defineQuery(`*[_type == "post" && defined(slug.current)].slug.current`);

export const TEAM_QUERY = defineQuery(`*[_type == "teamMember"] | order(order asc, name asc){
  _id, name, role, department, photo, bio, linkedin
}`);

export const TOOLS_QUERY = defineQuery(`*[_type == "carbonTool"] | order(order asc, name asc){
  _id, name, organization, category, pricing, icon, logo, description, audience, inputs, url, lastChecked
}`);

export const CONTENT_COUNTS_QUERY = defineQuery(`{
  "posts": count(*[_type == "post" && !(_id in path("drafts.**"))]),
  "events": count(*[_type == "event" && !(_id in path("drafts.**"))]),
  "team": count(*[_type == "teamMember" && !(_id in path("drafts.**"))])
}`);

/** Admin tables. Drafts are only visible with a read token (public dataset returns published docs). */
export const ADMIN_POSTS_QUERY =
  defineQuery(`*[_type == "post"] | order(coalesce(publishedAt, _updatedAt) desc){
  _id, title, excerpt, category, publishedAt, _updatedAt,
  "author": author->name,
  "isDraft": _id in path("drafts.**")
}`);

export const ADMIN_EVENTS_QUERY = defineQuery(`*[_type == "event"] | order(startsAt desc){
  _id, title, eventType, mode, location, startsAt, capacity,
  "isDraft": _id in path("drafts.**")
}`);

export const ADMIN_TEAM_QUERY = defineQuery(`*[_type == "teamMember"] | order(order asc, name asc){
  _id, name, role, department, photo, linkedin,
  "isDraft": _id in path("drafts.**")
}`);
