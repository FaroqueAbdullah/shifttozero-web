/**
 * Content for /tools/app: the public documentation of the field data app,
 * adapted from the "Carbon App Blueprint" (high-level design v0.1).
 */

export const docsHero = {
  eyebrow: "High-level product documentation · v0.1",
  title: "Carbon accounting a kiln worker can do by voice",
  lede: "A multi-company app that turns what workers already know (sacks of coal, empty gas cylinders, meter readings) into a GHG inventory that managers, buyers and auditors can trust.",
  facts: ["Brick kilns + ship-breaking first", "Bangla-first, works offline", "GHG Protocol · ISO 14064-1"],
};

export const docsNav = [
  { id: "people", label: "People" },
  { id: "flow", label: "How it works" },
  { id: "demo", label: "Demo" },
  { id: "calc", label: "Calculation" },
  { id: "industries", label: "Industries" },
  { id: "ai", label: "AI" },
  { id: "design", label: "Low literacy" },
  { id: "standards", label: "Standards" },
  { id: "architecture", label: "Architecture" },
  { id: "rollout", label: "Rollout" },
];

export const people = [
  {
    icon: "smartphone",
    tag: "Android app",
    title: "Field worker",
    text: "Kiln manager, yard supervisor, store keeper. Often limited reading, shared phones, weak network.",
    points: [
      "Records daily activity by tap, voice or photo",
      "Hears every screen read aloud",
      "Sees one simple monthly result",
    ],
  },
  {
    icon: "settings",
    tag: "Web admin",
    title: "Company admin",
    text: "Sustainability lead or office manager at each company.",
    points: [
      "Sets up sites, workers and activity types",
      "Chooses units, conversions and emission factors",
      "Reviews AI flags and approves data",
    ],
  },
  {
    icon: "bar_chart",
    tag: "Web reports",
    title: "Management, buyers, auditors",
    text: "Owners, international brand buyers, banks, third-party verifiers.",
    points: [
      "Reads Scope 1–3, categories, gases, intensity",
      "Tracks progress against a reduction target",
      "Exports a verifiable inventory with evidence",
    ],
  },
];

export type Stage = {
  key: string;
  title: string;
  short: string;
  icon: string;
  text: string;
  chips: { text: string; ok?: boolean; bn?: boolean; mono?: boolean }[];
};

export const stages: Stage[] = [
  {
    key: "STAGE 1 · on the phone",
    title: "Capture",
    short: "Capture",
    icon: "photo_camera",
    text: "The worker records today's activity in whichever way is easiest: tap a number with big + and − buttons, say everything in one sentence, or photograph a receipt, meter or pile of cylinders. Entries save on the phone first, so no network is needed.",
    chips: [{ text: "Tap a number" }, { text: "Speak in Bangla" }, { text: "Take a photo" }],
  },
  {
    key: "STAGE 2 · AI, then the worker",
    title: "Understand and confirm",
    short: "Understand and confirm",
    icon: "auto_awesome",
    text: "AI turns speech into items, reads numbers off receipts and meters, and counts objects in photos. It never saves on its own: it shows what it understood, reads it back aloud, and asks a two-choice question when unsure. The worker confirms.",
    chips: [
      { text: "“বারো বস্তা কয়লা, বিশ লিটার ডিজেল”", bn: true },
      { text: "Coal · 12 sacks", ok: true },
      { text: "Diesel · 20 L", ok: true },
    ],
  },
  {
    key: "STAGE 3 · server",
    title: "Convert to base units",
    short: "Convert",
    icon: "swap_horiz",
    text: "Local units become standard ones using the conversions each company sets: sacks to kilograms, maunds to kilograms, cans to litres, meter readings to kWh used today. The original entry is kept beside the converted value.",
    chips: [
      { text: "12 sacks × 50 kg = 600 kg", mono: true },
      { text: "2 maunds × 37.3 kg = 74.6 kg", mono: true },
    ],
  },
  {
    key: "STAGE 4 · calculation engine",
    title: "Calculate and classify",
    short: "Calculate",
    icon: "calculate",
    text: "Activity data is multiplied by a versioned emission factor and converted to CO₂e with global warming potentials. Each result is tagged with its scope, source category, ISO 14064-1 category and gas.",
    chips: [
      { text: "E = A × EF × GWP", mono: true },
      { text: "Scope 1 · Stationary combustion", ok: true },
    ],
  },
  {
    key: "STAGE 5 · admin",
    title: "Check and approve",
    short: "Approve",
    icon: "verified_user",
    text: "AI flags unusual values (coal use triple last week's, a meter going backwards). The admin sees each flag with its photo or voice evidence and approves or corrects it. Every change is logged for the audit trail.",
    chips: [{ text: "Flag: coal 3× usual" }, { text: "Receipt photo matches → approved", ok: true }],
  },
  {
    key: "STAGE 6 · reports",
    title: "Report",
    short: "Report",
    icon: "bar_chart",
    text: "Approved data rolls up into two views: one plain result for workers (this month vs last month, in Bangla), and a full GHG inventory for management and auditors with scopes, categories, gases, intensity and evidence.",
    chips: [{ text: "এই মাসে ৪ টন কম", bn: true }, { text: "GHG Protocol · ISO 14064-1 export" }],
  },
];

export const legend = [
  {
    term: "A",
    text: "activity data in base units (kg of coal, kWh, litres), after conversion from what the worker entered.",
  },
  {
    term: "EF",
    text: "emission factor per gas, from a versioned factor library (for example IPCC defaults or a national grid factor).",
  },
  {
    term: "GWP",
    text: "global warming potential that turns CH₄ and N₂O into CO₂e, from the IPCC assessment report the company reports against.",
  },
];

export const chain = [
  { label: "Entered", value: "১২ বস্তা কয়লা", bn: true },
  { label: "Converted", value: "600 kg coal", mono: true },
  { label: "× factors", value: "CO₂, CH₄, N₂O", mono: true },
  { label: "× GWP", value: "kg CO₂e", mono: true },
  { label: "Classified", value: "Scope 1 · Stationary combustion", end: true },
];

export const industries = [
  {
    icon: "grid_view",
    title: "Brick kilns",
    text: "Seasonal: most emissions fall in the six dry-season firing months. Intensity is kg CO₂e per 1,000 bricks.",
    types: ["Coal", "Bricks made", "Electricity", "Diesel", "Firewood", "Transport"],
  },
  {
    icon: "directions_boat",
    title: "Ship-breaking",
    text: "Tracked per ship. Intensity is kg CO₂e per tonne of steel recovered. Refrigerant release from dismantled systems is a key fugitive source.",
    types: [
      "LPG cylinders",
      "Oxygen cylinders",
      "Generator diesel",
      "Electricity",
      "Steel recovered",
      "Refrigerants",
    ],
  },
  {
    icon: "apparel",
    title: "Garments · later",
    text: "Same engine, new template. Likely types: boiler fuel, grid and captive power, refrigerants, purchased fabric.",
    types: [],
    later: true,
  },
];

export const configChain = [
  "Industry template",
  "Company",
  "Site",
  "Activity type",
  "Units · factor · classification",
];

export const aiShots = [
  {
    image: "/app-demo/voiceentry.webp",
    title: "Speak the whole day",
    text: "AI lists what it heard and asks about anything it doesn't know.",
    alt: "Voice screen: the worker's spoken sentence in Bangla, the items AI understood and a question about an unknown item, rice husk",
  },
  {
    image: "/app-demo/photoreceipt.webp",
    title: "Read a receipt or meter",
    text: "Unclear digits become a two-button choice, not a typing task.",
    alt: "Photo screen: a receipt with the amount highlighted, and a two-choice question asking whether it says 3 or 8 tonnes",
  },
  {
    image: "/app-demo/photocount.webp",
    title: "Count from a photo",
    text: "Each cylinder is boxed and numbered; fix the count with + and −.",
    alt: "Photo counting screen: seven gas cylinders boxed and numbered by AI, split into 5 LPG and 2 oxygen",
  },
];

export const aiFeatures = [
  {
    icon: "mic",
    title: "Speak the whole day",
    text: "Bangla speech recognition plus item extraction. Understands local words and units, including the extra names admins add for each type.",
  },
  {
    icon: "receipt_long",
    title: "Read receipts and meters",
    text: "Reads quantity, date and seller from fuel receipts, and digits from electricity meters. The photo is kept as evidence.",
  },
  {
    icon: "propane_tank",
    title: "Count from a photo",
    text: "Counts gas cylinders and sorts them by type. The worker fixes the count with + and − if needed.",
  },
  {
    icon: "add",
    title: "Spot missing types",
    text: "When workers keep mentioning something with no type (rice husk, say), the admin is offered a one-click new type.",
  },
  {
    icon: "warning",
    title: "Flag unusual entries",
    text: "Compares each entry with the site's history and season, and sends outliers to the admin with their evidence.",
  },
];

export const principles = [
  { title: "One question per screen", text: "A short Bangla sentence, a large picture, one main button." },
  {
    title: "Units people already use",
    text: "Sacks, trucks, maunds, cans, cylinders. Conversion happens behind the scenes.",
  },
  {
    title: "Everything can be heard",
    text: "A speaker button on every screen, and a spoken read-back before saving.",
  },
  {
    title: "Big, forgiving controls",
    text: "Touch targets of 56 px and more, + and − instead of keyboards, easy undo.",
  },
  {
    title: "Offline first",
    text: "Saves on the phone and sends when the network returns, and says so plainly.",
  },
  {
    title: "Help is one tap away",
    text: "A call button to a named person at the company, always in the menu.",
  },
];

export const scopes = [
  {
    tone: "bg-secondary",
    title: "Scope 1 · Direct GHG emissions",
    text: "From sources the company owns or controls.",
    items: [
      "Stationary combustion (kiln coal, generators, biomass CH₄/N₂O)",
      "Mobile combustion (company vehicles)",
      "Process emissions (carbonate decomposition in clay)",
      "Fugitive emissions (refrigerant leaks and releases)",
    ],
  },
  {
    tone: "bg-primary",
    title: "Scope 2 · Energy indirect emissions",
    text: "From purchased electricity, heat or steam.",
    items: ["Location-based (grid average factor)", "Market-based (supplier-specific), reported alongside"],
  },
  {
    tone: "bg-tertiary",
    title: "Scope 3 · Other indirect emissions",
    text: "In the value chain, from 15 standard categories. Most relevant here:",
    items: [
      "Cat. 3 Fuel- and energy-related activities",
      "Cat. 4 Upstream transportation and distribution",
      "Cat. 9 Downstream transportation and distribution",
    ],
  },
];

export const recordFields = [
  {
    field: "Scope and source category",
    values: "Scope 1–3 · stationary, mobile, process, fugitive · Scope 3 Cat. 1–15",
    why: "GHG Protocol Corporate and Scope 3 Standards",
  },
  {
    field: "ISO 14064-1 category",
    values: "1 Direct · 2 Imported energy · 3 Transportation · 4 Products used · 5 Use of products · 6 Other",
    why: "ISO 14064-1:2018 inventory and verification",
  },
  {
    field: "Gas",
    values: "CO₂ · CH₄ · N₂O · HFCs · PFCs · SF₆ · NF₃",
    why: "Gas-level reporting and GWP conversion",
  },
  {
    field: "Biogenic flag",
    values: "Biogenic CO₂ kept as a memo item outside the scopes",
    why: "Required separate reporting for biomass",
  },
  {
    field: "Factor version and source",
    values: "Library, year, region, GWP set",
    why: "Reproducible results and base-year recalculation",
  },
  {
    field: "Evidence and method",
    values: "Photo, voice clip, meter reading · tap / voice / photo · AI confidence",
    why: "Audit trail for ISO 14064-3 verification",
  },
];

export const tiers = [
  {
    label: "Clients",
    boxes: [
      { title: "Field app", text: "Android · Bangla · local database and sync queue", hl: true },
      { title: "Admin web", text: "Types, units, factors, sites, approvals" },
      { title: "Reports web", text: "Dashboards and exports" },
    ],
  },
  {
    label: "Edge",
    boxes: [
      { title: "API gateway", text: "Auth by phone + PIN, per-company access rules" },
      { title: "Sync service", text: "Accepts offline batches, resolves conflicts" },
    ],
  },
  {
    label: "Services",
    boxes: [
      { title: "Configuration", text: "Industry templates and company overrides" },
      { title: "AI services", text: "Speech, document reading, object counting, anomaly checks" },
      { title: "Calculation engine", text: "A × EF × GWP, classification", hl: true },
      { title: "Reporting and export", text: "GHG Protocol, ISO 14064-1, CSV" },
    ],
  },
  {
    label: "Data",
    boxes: [
      { title: "Company database", text: "Entries, emissions, audit log, per tenant" },
      { title: "Factor library", text: "Versioned factors and GWP sets" },
      { title: "Evidence storage", text: "Photos and voice clips" },
    ],
  },
];

export const phases = [
  {
    phase: "Phase 1",
    title: "Pilot two industries",
    items: [
      "Tap entry, offline sync, Bangla read-aloud",
      "Admin setup for bricks and ship-breaking",
      "Test with a handful of real workers per site",
    ],
    now: true,
  },
  {
    phase: "Phase 2",
    title: "Add AI input",
    items: [
      "Voice entry and receipt/meter reading",
      "Photo counting for cylinders",
      "Anomaly flags and approval flow",
    ],
  },
  {
    phase: "Phase 3",
    title: "Full reporting",
    items: [
      "GHG Protocol and ISO 14064-1 exports",
      "Targets, intensity and site comparison",
      "Verifier access to evidence",
    ],
  },
  {
    phase: "Phase 4",
    title: "More industries",
    items: ["Garments template", "Company-to-company benchmarks"],
  },
];
