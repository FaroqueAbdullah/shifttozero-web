/**
 * Facts about Shift to Zero Carbon that appear on several pages.
 *
 * This copy lives in code, not in Sanity, so every change to a public claim goes through
 * review before it ships. Keep it modest and factual: no numbers, partners, names or
 * results that the team has not confirmed.
 */

/** One-line description, used in metadata, Open Graph, JSON-LD and the footer. */
export const ORG_SUMMARY =
  "A Bangladeshi climate movement working on industrial greenhouse-gas emissions in Bangladesh.";

/**
 * Industries in scope, in display order.
 * TODO(Faroque): confirm 5th industry. The scope is five industries. This list is the four the home
 * page already named (power, garments, cement, leather) plus brick kilns; one of these may not be
 * confirmed. Ship-breaking appears only on /tools/app as an STZ Collect target.
 */
export const INDUSTRIES = ["brick kilns", "garments", "cement", "leather", "power"] as const;

/** "brick kilns, garments, cement, leather and power" */
export const industriesSentence = `${INDUSTRIES.slice(0, -1).join(", ")} and ${INDUSTRIES.at(-1)}`;

/** Research → Share → Act. Shown on Home and About. */
export const pillars = [
  {
    _key: "research",
    icon: "science",
    title: "Research",
    text: "Measure where industrial emissions really come from.",
  },
  {
    _key: "share",
    icon: "campaign",
    title: "Share",
    text: "Publish open, plain-language findings anyone can use.",
  },
  {
    _key: "act",
    icon: "eco",
    title: "Act",
    text: "Work with factories on reductions that pay for themselves.",
  },
];

/** Home, section 1. */
export const whatWeDo = {
  eyebrow: "Climate movement · Bangladesh · pilot phase",
  title: "Cutting industrial carbon in Bangladesh, one factory at a time.",
  text: `Shift to Zero Carbon is a Bangladeshi climate movement, started in mid-2025 by a group of software and electrical engineers. We study how Bangladesh's factories (${industriesSentence}) produce emissions, and turn that research into practical, affordable ways to reduce them.`,
  pillars,
};

/**
 * Bangladesh industrial emissions chart on Home.
 * TODO(Faroque): add the source and year for these four shares. They came with the original
 * design and no source is recorded in the repo. Brick kilns are not shown because no figure
 * for them was given; do not add one without a source.
 */
export const emissions = {
  title: "Bangladesh industrial emissions",
  breakdown: [
    { _key: "power", label: "Power generation", percent: 40 },
    { _key: "rmg", label: "Ready-made garments", percent: 27 },
    { _key: "cement", label: "Cement", percent: 15 },
    { _key: "other", label: "Leather and other", percent: 18 },
  ],
  footnote: "Share of total industrial emissions in Bangladesh.",
  /** Shown under the chart. Replace with e.g. "Source: <publisher>, <year>." */
  source: "Source and year to be added.",
};

/** Home: replaces the old impact numbers with what has actually happened so far. */
export const whereWeAre = {
  eyebrow: "Where we are",
  title: "Early days, and honest about it.",
  text: "We started in mid-2025 and are in our pilot phase. This is what we have done so far.",
  items: [
    {
      icon: "flag",
      title: "Pilot phase",
      text: "We are testing our approach with a few factories before we grow.",
      href: "/about",
      cta: "About us",
    },
    {
      icon: "apparel",
      title: "2 garment factories supported",
      text: "We helped two garment companies adopt existing third-party emissions software.",
      href: "/tools#integration",
      cta: "Integration support",
    },
    {
      icon: "travel_explore",
      title: "Field research at a brick kiln",
      text: "We looked for the kiln's most carbon-intensive step, and learned why simple forms fail there.",
      href: "/field-notes/why-a-spreadsheet-failed-at-a-brick-kiln",
      cta: "Read the field note",
    },
    {
      icon: "construction",
      title: "STZ Collect in development",
      text: "A voice-first data-collection app for workers who cannot read. Design and early prototype, v0.1.",
      href: "/tools/app",
      cta: "See the design",
    },
  ],
};

/** STZ Collect status, used wherever the app is named. */
export const APP_NAME = "STZ Collect";
export const APP_STATUS = "in development · v0.1";

/** /tools, section 1 (was Sanity `appIntro`; the wording now names STZ Collect and its status). */
export const appIntro = {
  eyebrow: `${APP_NAME} · ${APP_STATUS}`,
  title: "Most carbon tools are built for analysts. Most emissions happen on the factory floor.",
  text: `Today's carbon calculators assume a sustainability team: spreadsheets, English, emission factors and scopes. But in Bangladesh's brick kilns, garment units and ship-breaking yards, the people who know how much coal was burned are workers and supervisors, often with limited reading, shared phones and weak networks. We are designing ${APP_NAME}, an app that lets them record what they already know (sacks of coal, gas cylinders, meter readings) by tapping, speaking in Bangla or taking a photo, and turns it into a standards-based GHG inventory.`,
  comparison: [
    { _key: "who", typical: "A trained sustainability analyst", ours: "A kiln worker or yard supervisor" },
    {
      _key: "how",
      typical: "Typing into forms and spreadsheets",
      ours: "Tap, speak in Bangla, or take a photo",
    },
    {
      _key: "units",
      typical: "English and technical units",
      ours: "Bangla and local units: sacks, maunds, cylinders",
    },
    { _key: "net", typical: "A reliable internet connection", ours: "Works offline and syncs later" },
    {
      _key: "when",
      typical: "Data gathered months later for a report",
      ours: "Recorded daily, on site, with evidence",
    },
  ],
};

/** The two tracks of work. Shown on About; Track 1 is expanded on /tools#integration. */
export const tracks = [
  {
    id: "integration",
    label: "Track 1",
    icon: "integration_instructions",
    title: "Integration support",
    text: "Some factories have staff who can manage complex data. We help them adopt existing third-party emissions software. We did not build that software; we help a factory start using it. So far we have supported 2 garment companies this way.",
    href: "/tools#integration",
    cta: "How integration support works",
  },
  {
    id: "collect",
    label: "Track 2",
    icon: "record_voice_over",
    title: APP_NAME,
    text: `Many workers who hold the data cannot read, so forms fail them. ${APP_NAME} is a voice-first data-collection app for brick kilns, garment units and ship-breaking yards. It is in development: design and early prototype, v0.1.`,
    href: "/tools/app",
    cta: `Read the ${APP_NAME} design`,
  },
];

/**
 * Team shown on /about. Only confirmed people are listed.
 * TODO(Faroque): add the other co-founders (name, role, one-line background). Do not add
 * placeholder people; leave them out until confirmed.
 */
export const team = [{ name: "Faroque Abdullah", role: "Co-founder & Research Lead" }];

/** /about */
export const about = {
  title: "About Shift to Zero Carbon",
  lede: `${ORG_SUMMARY} We are in our pilot phase.`,
  who: [
    "Shift to Zero Carbon (STZ) is a Bangladeshi climate movement. We work on one problem: greenhouse-gas emissions from industry in Bangladesh.",
    "A group of Bangladeshi software and electrical engineers started STZ in mid-2025. We are in our pilot phase, which means we are testing our approach with a small number of factories before we grow.",
    "Our long-term goal is low-cost, low-effort carbon measurement and reduction for industries across South Asia.",
  ],
};
