/**
 * Loads the Stitch sample content into Sanity.
 *
 *   npm run seed           create or update all sample documents (safe to re-run)
 *   npm run seed:delete    remove every sample document and uploaded sample image
 *
 * Needs SANITY_API_WRITE_TOKEN (Editor) in .env.local. Delete the token afterwards.
 * Sample document IDs start with "seed-" (no dots, so they stay public in a public dataset).
 */
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import nextEnv from "@next/env";
import { createClient } from "@sanity/client";
import { events, homeSections, posts, settings, team, tools } from "./data.mjs";

nextEnv.loadEnvConfig(process.cwd());

const {
  NEXT_PUBLIC_SANITY_PROJECT_ID: projectId,
  NEXT_PUBLIC_SANITY_DATASET: dataset,
  SANITY_API_WRITE_TOKEN: token,
} = process.env;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset: dataset || "production",
  apiVersion: "2026-10-01",
  token,
  useCdn: false,
});

const key = () => randomUUID().replaceAll("-", "").slice(0, 12);
const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
const ref = (id) => ({ _type: "reference", _ref: id });
const SOURCE = "stz-seed";

async function remove() {
  const ids = await client.fetch(`*[string::startsWith(_id, "seed-")]._id`);
  const assets = await client.fetch(`*[_type == "sanity.imageAsset" && source.name == $s]._id`, {
    s: SOURCE,
  });
  if (ids.length) {
    // Delete documents first; assets can only go once nothing references them.
    await ids.reduce((tx, id) => tx.delete(id), client.transaction()).commit();
  }
  for (const id of assets)
    await client.delete(id).catch((e) => console.warn("Could not delete asset", id, e.message));
  console.log(`Deleted ${ids.length} documents and ${assets.length} images. Site settings were kept.`);
}

/** Portable Text: plain block shorthand → full Sanity blocks. */
function toBlocks(items = []) {
  return items.map((item) => {
    if (item._type !== "block") return { _key: key(), ...item };
    const { text, ...rest } = item;
    return {
      _key: key(),
      markDefs: [],
      ...rest,
      ...(rest.listItem ? { level: 1 } : {}),
      // "**Label:** rest" → bold label span + plain span.
      children: text.startsWith("**")
        ? [
            { _type: "span", _key: key(), text: text.slice(2, text.indexOf("**", 2)), marks: ["strong"] },
            { _type: "span", _key: key(), text: text.slice(text.indexOf("**", 2) + 2), marks: [] },
          ]
        : [{ _type: "span", _key: key(), text, marks: [] }],
    };
  });
}

async function uploadImages() {
  const urls = JSON.parse(await readFile(new URL("./images.json", import.meta.url), "utf8"));
  const out = {};
  const entries = Object.entries(urls);
  // Small batches: the image host and Sanity are both happier without a burst.
  for (let i = 0; i < entries.length; i += 4) {
    await Promise.all(
      entries.slice(i, i + 4).map(async ([name, url]) => {
        const existing = await client.fetch(
          `*[_type == "sanity.imageAsset" && source.name == $s && source.id == $id][0]._id`,
          { s: SOURCE, id: name },
        );
        if (existing) {
          out[name] = existing;
          return;
        }
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Image ${name} failed: ${res.status}`);
        const asset = await client.assets.upload("image", Buffer.from(await res.arrayBuffer()), {
          filename: `${name}.jpg`,
          source: { name: SOURCE, id: name, url },
        });
        out[name] = asset._id;
        process.stdout.write(".");
      }),
    );
  }
  console.log(`\nImages ready (${entries.length}).`);
  return out;
}

async function seed() {
  const img = await uploadImages();
  const image = (name, alt) =>
    name ? { _type: "image", asset: ref(img[name]), ...(alt ? { alt } : {}) } : undefined;

  const docs = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      ...settings,
      heroImage: image(settings.heroImage, "Industrial facility at sunrise"),
      emissionsBreakdown: settings.emissionsBreakdown.map((x) => ({ _key: key(), ...x })),
      methodologySteps: settings.methodologySteps.map((x) => ({ _key: key(), ...x })),
      impactStats: settings.impactStats.map((x) => ({ _key: key(), ...x })),
      coreValues: settings.coreValues.map((x) => ({ _key: key(), ...x })),
    },
    ...team.map((m) => ({
      _id: `seed-team-${m.id}`,
      _type: "teamMember",
      name: m.name,
      role: m.role,
      department: m.department,
      bio: m.bio,
      order: m.order,
      photo: image(m.photo),
    })),
    ...tools.map((t, i) => ({
      _id: `seed-tool-${slugify(t.name)}`,
      _type: "carbonTool",
      ...t,
      lastChecked: "2026-10-17",
      order: i + 1,
    })),
    ...posts.map((post) => ({
      _id: `seed-post-${post.id}`,
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: slugify(post.title) },
      category: post.category,
      featured: Boolean(post.featured),
      tags: post.tags,
      excerpt: post.excerpt,
      publishedAt: post.publishedAt,
      author: ref(`seed-team-${post.author}`),
      coverImage: image(post.image, post.title),
      body: toBlocks(post.body),
    })),
    ...events.map((e) => ({
      _id: `seed-event-${e.id}`,
      _type: "event",
      title: e.title,
      slug: { _type: "slug", current: slugify(e.title) },
      eventType: e.eventType,
      mode: e.mode,
      location: e.location,
      startsAt: e.startsAt,
      endsAt: e.endsAt,
      capacity: e.capacity,
      summary: e.summary,
      heroImage: image(e.image),
      cta: e.cta,
      about: e.about ? toBlocks(e.about) : undefined,
      highlights: e.highlights?.map((h) => ({ _key: key(), ...h })),
      agenda: e.agenda?.map(({ speaker, ...a }) => ({
        _key: key(),
        ...a,
        ...(speaker ? { speaker: ref(`seed-team-${speaker}`) } : {}),
      })),
      venue: e.venue,
    })),
  ];

  // Strip undefined fields: the API rejects them.
  const clean = JSON.parse(JSON.stringify(docs));
  // Site settings are only created if missing, so edits made in the Studio are never overwritten.
  await clean
    .reduce(
      (tx, doc) => (doc._id === "siteSettings" ? tx.createIfNotExists(doc) : tx.createOrReplace(doc)),
      client.transaction(),
    )
    .commit();
  // Remove sample tools that are no longer in the list.
  const toolIds = clean.filter((d) => d._type === "carbonTool").map((d) => d._id);
  const stale = await client.fetch(`*[_type == "carbonTool" && string::startsWith(_id, "seed-") && !(_id in $ids)]._id`, { ids: toolIds });
  if (stale.length) await stale.reduce((tx, id) => tx.delete(id), client.transaction()).commit();

  // New Home sections: fill in only what's missing, never overwrite edits.
  const withKeys = (o) =>
    JSON.parse(JSON.stringify(o), (k, v) =>
      Array.isArray(v) ? v.map((x) => (x && typeof x === "object" ? { _key: key(), ...x } : x)) : v,
    );
  await client.patch("siteSettings").setIfMissing(withKeys(homeSections)).commit();

  console.log(
    `Seeded ${clean.length} documents (1 settings, ${team.length} team, ${tools.length} tools, ${posts.length} posts, ${events.length} events).`,
  );
}

const run = process.argv.includes("--delete") ? remove : seed;
run().catch((err) => {
  console.error(err);
  process.exit(1);
});
