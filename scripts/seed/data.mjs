/**
 * Sample content taken from the Stitch designs ("Shift to Zero Carbon Portal").
 *
 * Public claims (what we do, where we are, the emissions chart, industries) now live in
 * src/content/site.ts and the contact email in src/lib/site-config.ts, not Sanity. The matching
 * values below are kept in line with those files so a re-seed never brings back old claims.
 * `npm run seed:delete` removes every seeded document.
 */

export const settings = {
  heroTitle: "Pioneering the Next Era of Industrial Decarbonization.",
  heroText:
    "We bridge the gap between heavy industry and environmental stewardship. Transform your operations, measure your impact, and lead the movement toward a zero-carbon future.",
  heroImage: "homeHero",
  emissionsBreakdown: [
    { label: "Power generation", percent: 40 },
    { label: "Ready-made garments", percent: 27 },
    { label: "Cement", percent: 15 },
    { label: "Leather and other", percent: 18 },
  ],
  emissionsFootnote: "Share of total industrial emissions in Bangladesh. Source and year to be added.",
  methodologySteps: [
    {
      icon: "calculate",
      title: "Calculate",
      text: "Deploy advanced measurement tools to accurately establish baseline emissions across scopes 1, 2, and 3. Identify key areas for immediate reduction.",
    },
    {
      icon: "visibility",
      title: "Disclose",
      text: "Maintain absolute transparency through standardized reporting frameworks. Build trust with stakeholders by openly sharing progress and challenges.",
    },
    {
      icon: "savings",
      title: "Invest",
      text: "Strategically allocate resources into green technology adaptation and infrastructure upgrades to continuously drive down net carbon output.",
    },
  ],
  impactStats: [],
  cta: {
    title: "Ready to transform your operations?",
    text: "Join the coalition of industry leaders committing to a sustainable, zero-carbon future.",
  },
  coreValues: [
    {
      icon: "visibility",
      title: "Radical Transparency",
      text: "We believe open data is the foundation of trust. We share our methodologies, successes, and failures openly.",
    },
    {
      icon: "bolt",
      title: "Action-Oriented",
      text: "Theory is important, but execution matters more. We focus on pragmatic, scalable solutions for immediate impact.",
    },
    {
      icon: "science",
      title: "Science-First",
      text: "Every policy recommendation and technological assessment is rooted in peer-reviewed, empirical evidence.",
    },
  ],
  // Not read by the site; the address is CONTACT_EMAIL in src/lib/site-config.ts.
  contactEmail: "hello@shifttozero.org",
};

/**
 * Team members are not seeded: the design's sample people were fictional. The confirmed team is
 * listed in src/content/site.ts (TODO(Faroque): other co-founders).
 */
export const team = [];

/** Popular carbon calculators, verified on each official site on 2026-10-17. */
export const tools = [
  {
    name: "GHG Protocol Calculation Tools",
    organization: "Greenhouse Gas Protocol (WRI / WBCSD)",
    category: "Free & standards",
    pricing: "Free",
    icon: "calculate",
    description:
      "Free spreadsheet tools and emission factor workbooks for calculating emissions from sources such as stationary combustion, transport and electricity.",
    audience: "Companies and GHG practitioners",
    inputs: "Activity data in Excel worksheets",
    url: "https://ghgprotocol.org/calculation-tools-and-guidance",
  },
  {
    name: "openLCA",
    organization: "GreenDelta GmbH",
    category: "Product footprint (LCA)",
    pricing: "Free",
    icon: "inventory_2",
    description:
      "Free, open-source life cycle assessment and footprint software, with a Collaboration Server for shared databases and onlineLCA for web use.",
    audience: "Industry, consultants and researchers",
    inputs: "LCA databases and process data",
    url: "https://www.openlca.org/",
  },
  {
    name: "Higg Facility Environmental Module (Higg FEM)",
    organization: "Cascale, delivered via Worldly",
    category: "Industry-specific",
    pricing: "Paid",
    icon: "apparel",
    description:
      "Self-assessment, verifiable by third parties, of a manufacturing facility's energy, GHG, water, wastewater, air emissions, waste and chemicals.",
    audience: "Apparel and footwear manufacturers",
    inputs: "Facility energy, water and waste data",
    url: "https://cascale.org/tools-programs/higg-index-tools/facility-tools/",
  },
  {
    name: "Watershed",
    organization: "Watershed Technology, Inc.",
    category: "Business platforms",
    pricing: "Paid",
    icon: "corporate_fare",
    description:
      "Sustainability data platform for measuring, reporting and reducing corporate emissions, water and land impacts, with AI-assisted data handling.",
    audience: "Enterprise sustainability teams",
    inputs: "Spreadsheets, invoices and supply chain data",
    url: "https://watershed.com/",
  },
  {
    name: "Persefoni",
    organization: "Persefoni AI, Inc.",
    category: "Business platforms",
    pricing: "Paid",
    icon: "account_balance",
    description:
      "Carbon accounting platform for Scope 1-3 footprinting, climate disclosure reporting and decarbonization planning for companies and financial institutions.",
    audience: "Businesses and financial institutions",
    inputs: "Operational and spend data",
    url: "https://www.persefoni.com/",
  },
  {
    name: "Sweep",
    organization: "Sweep",
    category: "Business platforms",
    pricing: "Paid",
    icon: "monitoring",
    description:
      "Platform for collecting carbon and ESG data, including supplier data, and reporting against frameworks such as CSRD, ISSB, CDP and GHG Protocol.",
    audience: "Enterprise and mid-market companies",
    inputs: "Purchase, supplier and operational data",
    url: "https://www.sweep.net/",
  },
  {
    name: "Greenly",
    organization: "Greenly",
    category: "Business platforms",
    pricing: "Paid",
    icon: "eco",
    description:
      "Carbon management platform for company carbon footprints, reduction plans, CSRD/VSME reporting, product LCAs and supplier engagement.",
    audience: "SMEs to large companies",
    inputs: "Company activity and supplier data",
    url: "https://greenly.earth/en-gb",
  },
  {
    name: "SimaPro",
    organization: "SimaPro B.V. (One Click LCA group)",
    category: "Product footprint (LCA)",
    pricing: "Paid",
    icon: "inventory_2",
    description:
      "Life cycle assessment software, in cloud and desktop editions, for modelling and analysing the environmental impacts of products and processes.",
    audience: "LCA experts and sustainability teams",
    inputs: "Life cycle inventory datasets",
    url: "https://simapro.com/",
  },
  {
    name: "Climatiq",
    organization: "Climatiq",
    category: "Developer API",
    pricing: "Paid",
    icon: "code",
    description:
      "Emissions calculation engine and API with an emission factor database, used to calculate product, purchase and freight emissions.",
    audience: "Developers and software platforms",
    inputs: "Activity and spend data via API",
    url: "https://www.climatiq.io/",
  },
];

/** Posts and events are not seeded: the design's samples were fictional or not run by STZ. */
export const posts = [];

export const events = [];

/** New animated Home page sections (added to existing site settings only where missing). */
export const homeSections = {
  appIntro: {
    eyebrow: "STZ Collect · in development · v0.1",
    title: "Most carbon tools are built for analysts. Most emissions happen on the factory floor.",
    text: "Today's carbon calculators assume a sustainability team: spreadsheets, English, emission factors and scopes. But in Bangladesh's brick kilns, garment units and ship-breaking yards, the people who know how much coal was burned are workers and supervisors, often with limited reading, shared phones and weak networks. We are designing STZ Collect, an app that lets them record what they already know (sacks of coal, gas cylinders, meter readings) by tapping, speaking in Bangla or taking a photo, and turns it into a standards-based GHG inventory.",
    comparison: [
      { typical: "A trained sustainability analyst", ours: "A kiln worker or yard supervisor" },
      { typical: "Typing into forms and spreadsheets", ours: "Tap, speak in Bangla, or take a photo" },
      { typical: "English and technical units", ours: "Bangla and local units: sacks, maunds, cylinders" },
      { typical: "A reliable internet connection", ours: "Works offline and syncs later" },
      { typical: "Data gathered months later for a report", ours: "Recorded daily, on site, with evidence" },
    ],
  },
  whatWeDo: {
    eyebrow: "Climate movement · Bangladesh · pilot phase",
    title: "Cutting industrial carbon in Bangladesh, one factory at a time.",
    text: "Shift to Zero Carbon is a Bangladeshi climate movement, started in mid-2025 by a group of software and electrical engineers. We study how Bangladesh's factories (brick kilns, garments, cement, leather and power) produce emissions, and turn that research into practical, affordable ways to reduce them.",
    pillars: [
      { icon: "science", title: "Research", text: "Measure where industrial emissions really come from." },
      { icon: "campaign", title: "Share", text: "Publish open, plain-language findings anyone can use." },
      { icon: "eco", title: "Act", text: "Work with factories on reductions that pay for themselves." },
    ],
  },
  app: {
    name: "STZ Collect",
    title: "Data collection anyone can use.",
    text: "Good climate decisions need good data, and much of it lives with factory workers and communities who may not read or write easily. Our app collects it with pictures, icons and voice instead of long forms.",
    steps: [
      {
        icon: "touch_app",
        title: "Pick with pictures",
        text: "Icons and photos replace text menus, so no reading is needed.",
      },
      {
        icon: "mic",
        title: "Speak, don't type",
        text: "Answer questions by voice in Bangla; we transcribe later.",
      },
      {
        icon: "wifi_off",
        title: "Works offline",
        text: "Saves everything on the phone and syncs when a connection returns.",
      },
      {
        icon: "diversity_3",
        title: "Volunteer assisted",
        text: "Trained volunteers guide people through each survey on site.",
      },
    ],
  },
  volunteer: {
    title: "Lend your time. Change an industry.",
    text: "We need people on the ground and behind the screen. No climate background required, just curiosity and a few hours a month.",
    roles: [
      { icon: "map", title: "Field data collector", text: "Visit factories and help workers use the app." },
      { icon: "query_stats", title: "Data analyst", text: "Clean, check and study emissions data." },
      {
        icon: "translate",
        title: "Community liaison",
        text: "Bangla and local-dialect support for surveys.",
      },
      { icon: "brush", title: "Communications", text: "Write, design and share our findings." },
    ],
    skills: [
      "Field work",
      "Data analysis",
      "Bangla",
      "Research",
      "Design",
      "Writing",
      "Training",
      "Community outreach",
    ],
  },
  funding: {
    title: "Fund research that cuts real emissions.",
    text: "Your support pays for field studies, the STZ Collect app, and free reports for factories that can't afford consultants.",
    allocation: [
      { label: "Field research", percent: 45 },
      { label: "App & data", percent: 30 },
      { label: "Free factory reports", percent: 15 },
      { label: "Operations", percent: 10 },
    ],
  },
};
