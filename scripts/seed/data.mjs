/**
 * Sample content taken from the Stitch designs ("Shift to Zero Carbon Portal").
 * Dates are shifted relative to Oct 2026 so "upcoming" and "past" sections both have items.
 * Replace with real content before launch (`npm run seed:delete` removes everything below).
 */

const p = (text, style = "normal") => ({ _type: "block", style, text });
const li = (text) => ({ _type: "block", style: "normal", listItem: "bullet", text });

export const settings = {
  heroTitle: "Pioneering the Next Era of Industrial Decarbonization.",
  heroText:
    "We bridge the gap between heavy industry and environmental stewardship. Transform your operations, measure your impact, and lead the movement toward a zero-carbon future.",
  heroImage: "homeHero",
  emissionsBreakdown: [
    { label: "Power Gen", percent: 40 },
    { label: "RMG Sector", percent: 27 },
    { label: "Cement", percent: 15 },
    { label: "Leather/Other", percent: 18 },
  ],
  emissionsFootnote: "*Data reflects total industrial emissions in Bangladesh.",
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
  impactStats: [
    { icon: "corporate_fare", value: "500+", label: "Companies Onboarded" },
    { icon: "eco", value: "1.2M+ Tons", label: "CO₂e Emissions Reduced" },
    { icon: "volunteer_activism", value: "10,000+", label: "Volunteers Involved" },
  ],
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
  contactEmail: "hello@shifttozero.org",
};

export const team = [
  {
    id: "elena",
    name: "Dr. Elena Rostova",
    role: "Executive Director",
    department: "Leadership",
    photo: "teamElena",
    bio: "Former lead at the Global Industrial Coalition. Dedicated to systemic change in heavy manufacturing.",
    order: 1,
  },
  {
    id: "marcus",
    name: "Marcus Thorne",
    role: "Carbon Systems Engineer",
    department: "Engineering",
    photo: "teamMarcus",
    bio: "Expert in thermodynamics and waste heat recovery. Translates complex data into actionable industrial models.",
    order: 2,
  },
  {
    id: "sarah",
    name: "Sarah Jenkins",
    role: "Policy Analyst",
    department: "Policy",
    photo: "teamSarah",
    bio: "Specializes in regulatory frameworks for carbon pricing and international emissions trading mechanisms.",
    order: 3,
  },
  {
    id: "david",
    name: "David Chen",
    role: "Head of Industrial Partnerships",
    department: "Operations",
    photo: "teamDavid",
    bio: "Over 20 years of experience bridging the gap between heavy industry stakeholders and environmental goals.",
    order: 4,
  },
  {
    id: "aisha",
    name: "Aisha Patel",
    role: "Data Analytics Lead",
    department: "Engineering",
    photo: "teamAisha",
    bio: "Pioneers our proprietary emissions tracking software. Turns massive datasets into clear mitigation pathways.",
    order: 5,
  },
  {
    id: "tomas",
    name: "Tomás Silva",
    role: "Materials Scientist",
    department: "Engineering",
    photo: "teamTomas",
    bio: "Researches low-carbon concrete and steel alternatives, focusing on commercial viability and scalability.",
    order: 6,
  },
];

/** Popular carbon calculators, verified on each official site on 2026-10-17. */
export const tools = [
  {
    name: "GHG Protocol Calculation Tools",
    organization: "Greenhouse Gas Protocol (WRI / WBCSD)",
    category: "Free & standards",
    pricing: "Free",
    icon: "calculate",
    description: "Free spreadsheet tools and emission factor workbooks for calculating emissions from sources such as stationary combustion, transport and electricity.",
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
    description: "Free, open-source life cycle assessment and footprint software, with a Collaboration Server for shared databases and onlineLCA for web use.",
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
    description: "Self-assessment, verifiable by third parties, of a manufacturing facility's energy, GHG, water, wastewater, air emissions, waste and chemicals.",
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
    description: "Sustainability data platform for measuring, reporting and reducing corporate emissions, water and land impacts, with AI-assisted data handling.",
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
    description: "Carbon accounting platform for Scope 1-3 footprinting, climate disclosure reporting and decarbonization planning for companies and financial institutions.",
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
    description: "Platform for collecting carbon and ESG data, including supplier data, and reporting against frameworks such as CSRD, ISSB, CDP and GHG Protocol.",
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
    description: "Carbon management platform for company carbon footprints, reduction plans, CSRD/VSME reporting, product LCAs and supplier engagement.",
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
    description: "Life cycle assessment software, in cloud and desktop editions, for modelling and analysing the environmental impacts of products and processes.",
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
    description: "Emissions calculation engine and API with an emission factor database, used to calculate product, purchase and freight emissions.",
    audience: "Developers and software platforms",
    inputs: "Activity and spend data via API",
    url: "https://www.climatiq.io/",
  },
];

const shortBody = (excerpt) => [
  p(excerpt),
  p(
    "This is sample content imported from the design. Replace it with the full article in Sanity Studio before launch.",
  ),
];

export const posts = [
  {
    id: "carbon-capture",
    title: "The Future of Carbon Capture: Scaling Direct Air Technology in Heavy Manufacturing",
    category: "Technology",
    featured: true,
    author: "elena",
    publishedAt: "2026-10-12T09:00:00Z",
    image: "postCarbonCapture",
    tags: ["Direct Air Capture", "Heavy Manufacturing", "Industrial Decarbonization", "Tech Innovations"],
    excerpt:
      "An in-depth analysis of recent breakthroughs in direct air capture systems and their viable integration into existing industrial infrastructure, promising significant reductions in net emissions by 2030.",
    body: [
      p(
        "The transition to net-zero emissions requires more than just reducing future outputs; it necessitates active removal of historical carbon. Direct Air Capture (DAC) technology is moving from experimental lab settings to full-scale industrial deployment, representing a critical pivot point for heavy manufacturing sectors.",
      ),
      p(
        "Historically, heavy industries such as steel, cement, and chemical manufacturing have been the most challenging to decarbonize due to the intense heat requirements and chemical processes inherent in their operations. While point-source capture has made strides, DAC offers a complementary solution: scrubbing CO2 directly from the ambient air, regardless of where the emissions originated.",
      ),
      p("The Mechanics of Modern DAC", "h2"),
      p(
        "Modern DAC facilities operate essentially as massive air purifiers. Large fans draw ambient air through a filter lined with chemical sorbents that selectively bind with CO2 molecules. Once saturated, the filter is heated to release the pure CO2, which is then captured for geological storage or utilized in creating synthetic fuels and low-carbon concrete.",
      ),
      li(
        "**Liquid Solvent Systems:** Utilize aqueous solutions (like potassium hydroxide) to bind with CO2. They require significant heat for the regeneration phase but are highly scalable.",
      ),
      li(
        "**Solid Sorbent Systems:** Use solid materials with amine functional groups. These can operate at lower temperatures, making them suitable for integration with industrial waste heat.",
      ),
      li(
        "**Electrochemical Methods:** Emerging technologies that use electricity to drive the capture and release cycle, offering potential for integration with renewable energy grids.",
      ),
      {
        _type: "pullQuote",
        quote:
          "The integration of Solid Sorbent DAC utilizing waste heat from existing heavy manufacturing processes isn't just an environmental imperative; it's a profound economic optimization of industrial energy flows.",
        attribution: "Dr. Elena Rostova",
      },
      p("Economic Viability and Scaling Challenges", "h2"),
      p(
        "The primary hurdle for DAC has always been the cost per ton of CO2 captured. Ambient air contains only about 420 parts per million of CO2, meaning massive volumes of air must be processed. However, recent advancements in sorbent materials and modular facility design are driving down costs.",
      ),
      p(
        "For heavy manufacturing, the key to economic viability lies in co-location. By situating DAC facilities adjacent to existing plants, operators can utilize low-grade waste heat to power the regeneration cycle of solid sorbent systems. This synergy significantly reduces the energy penalty associated with DAC, improving the overall lifecycle cost.",
      ),
      {
        _type: "callout",
        icon: "eco",
        title: "The Co-Location Advantage",
        text: "Recent pilot studies show that co-locating DAC with steel manufacturing and utilizing excess thermal energy can reduce the operational cost of carbon capture by up to 35% compared to standalone DAC facilities relying on grid power.",
      },
      p(
        "As we move towards 2030, the policy landscape, including carbon pricing and incentives like the 45Q tax credit in the US, will be instrumental in bridging the gap between current costs and commercial parity. The technology is proven; the next decade is about ruthless execution and industrial-scale deployment.",
      ),
    ],
  },
  {
    id: "eu-cbam",
    title: "Navigating the New EU Carbon Border Adjustment Mechanism",
    category: "Policy",
    author: "sarah",
    publishedAt: "2026-10-08T09:00:00Z",
    image: "postCbam",
    tags: ["CBAM", "Regulation", "Supply Chain"],
    excerpt:
      "What heavy industry leaders need to know about the upcoming CBAM regulations and how to prepare compliance strategies without disrupting supply chains.",
  },
  {
    id: "retrofitting-steel",
    title: "Retrofitting Steel: A Case Study in 40% Emission Reduction",
    category: "Case Study",
    author: "tomas",
    publishedAt: "2026-10-02T09:00:00Z",
    image: "postSteel",
    tags: ["Steel", "Hydrogen", "Retrofitting"],
    excerpt:
      "Explore how NordicSteel implemented hydrogen-based reduction processes in their legacy plants, achieving remarkable short-term decarbonization targets.",
  },
  {
    id: "ai-energy",
    title: "AI-Driven Optimization for Industrial Energy Consumption",
    category: "Technology",
    author: "aisha",
    publishedAt: "2026-09-26T09:00:00Z",
    image: "postAi",
    tags: ["AI", "Energy Efficiency"],
    excerpt:
      "Leveraging machine learning algorithms to predict and optimize peak energy usage in manufacturing facilities, reducing both costs and carbon footprint simultaneously.",
  },
  {
    id: "scope-3-mandates",
    title: "Scope 3 Reporting Mandates: A Practical Guide",
    category: "Policy",
    author: "sarah",
    publishedAt: "2026-09-18T09:00:00Z",
    image: "postScope3",
    tags: ["Scope 3", "Reporting"],
    excerpt:
      "New disclosure rules are reaching deep into supply chains. A step-by-step guide to collecting supplier data and reporting Scope 3 emissions with confidence.",
  },
  {
    id: "hydrogen-heavy-industry",
    title: "Hydrogen in Heavy Industry",
    category: "Technology",
    author: "marcus",
    publishedAt: "2026-09-10T09:00:00Z",
    image: "postHydrogen",
    tags: ["Hydrogen", "Steel"],
    excerpt:
      "Green hydrogen is moving from pilot to production. Where it makes economic sense today, and what still stands in the way of large-scale adoption.",
  },
  {
    id: "cement-plant",
    title: "Cement Plant Decarbonization",
    category: "Case Study",
    author: "tomas",
    publishedAt: "2026-09-02T09:00:00Z",
    image: "postCement",
    tags: ["Cement", "Case Study"],
    excerpt:
      "How a mid-sized cement producer cut kiln emissions with alternative fuels, clinker substitution and real-time process monitoring.",
  },
  {
    id: "volunteer-spotlight",
    title: "Volunteer Spotlight: 2026",
    category: "Community",
    author: "david",
    publishedAt: "2026-08-25T09:00:00Z",
    image: "homeHero",
    tags: ["Community", "Volunteers"],
    excerpt:
      "Meet the volunteers collecting factory-floor data, running workshops and helping small manufacturers take their first steps toward net zero.",
  },
  {
    id: "sensor-networks",
    title: "Integrating Sensor Networks for Real-time Emission Tracking",
    category: "Technology",
    author: "aisha",
    publishedAt: "2026-08-14T09:00:00Z",
    image: "postSensors",
    tags: ["Data Systems", "Monitoring"],
    excerpt:
      "How advanced telemetry is providing granular data on Scope 1 emissions in cement production, enabling immediate corrective actions.",
  },
  {
    id: "financial-case",
    title: "The Financial Case for Early Adoption of Net-Zero Tech",
    category: "Policy",
    author: "david",
    publishedAt: "2026-08-03T09:00:00Z",
    image: "postFinance",
    tags: ["Finance", "ROI"],
    excerpt:
      "Analyzing the long-term ROI and risk mitigation strategies for manufacturers investing in decarbonization infrastructure before regulatory mandates.",
  },
  {
    id: "next-gen-sorbents",
    title: "Next-Gen Sorbents: Breaking the Efficiency Barrier",
    category: "Technology",
    author: "tomas",
    publishedAt: "2026-07-22T09:00:00Z",
    image: "postSorbents",
    tags: ["Materials Science", "Direct Air Capture"],
    excerpt:
      "A deep dive into new metal-organic frameworks (MOFs) that are drastically reducing the energy required for the regeneration phase in DAC systems.",
  },
].map((post) => ({ ...post, body: post.body ?? shortBody(post.excerpt) }));

export const events = [
  {
    id: "global-summit",
    title: "Global Industrial Decarbonization Summit",
    eventType: "Summit",
    mode: "In person",
    location: "Berlin, Germany",
    startsAt: "2026-11-15T08:00:00Z",
    endsAt: "2026-11-16T16:00:00Z",
    capacity: 500,
    image: "eventSummit",
    summary:
      "Join industry leaders, policymakers, and innovators as we chart the course for a net-zero future in heavy manufacturing and industrial processes.",
    cta: { label: "Register Now" },
    about: [
      p(
        "The Global Industrial Decarbonization Summit is the premier gathering for stakeholders committed to transforming heavy industry. As we navigate the complex transition to a sustainable economy, this summit provides a vital platform for sharing breakthrough technologies, regulatory insights, and successful implementation strategies.",
      ),
      p(
        "Our agenda focuses on actionable intelligence, exploring the intersection of corporate industrialism and ecological preservation. Attendees will engage with high-clarity data presentations, collaborative workshops, and strategic networking opportunities designed to accelerate the shift to zero carbon.",
      ),
    ],
    highlights: [
      { icon: "groups", value: "500+ Attendees", label: "Industry Leaders" },
      { icon: "mic", value: "40+ Speakers", label: "Global Experts" },
      { icon: "handshake", value: "20+ Workshops", label: "Actionable Strategies" },
    ],
    agenda: [
      {
        time: "09:00 - 10:00",
        title: "Opening Keynote: The State of Industrial Decarbonization",
        description: "A macro view of current progress versus targets in heavy manufacturing.",
        speaker: "marcus",
      },
      {
        time: "10:30 - 12:00",
        title: "Panel: Bridging Policy and Implementation",
        description: "Navigating the regulatory landscape while maintaining operational efficiency.",
        speaker: "sarah",
      },
      {
        time: "13:30 - 15:00",
        title: "Workshop: Data Visualization for Emissions Tracking",
        description: "Hands-on session utilizing clean-tech aesthetic dashboards for real-time monitoring.",
        speaker: "aisha",
      },
    ],
    venue: {
      name: "Berlin Congress Center",
      address: "Alexanderstr. 11, 10178 Berlin, Germany",
      mapUrl: "https://maps.google.com/?q=Berlin+Congress+Center",
    },
  },
  {
    id: "industrial-transition-symposium",
    title: "Industrial Transition Symposium 2026",
    eventType: "Summit",
    mode: "Virtual",
    location: "Virtual Summit",
    startsAt: "2026-10-24T13:00:00Z",
    capacity: 1000,
    summary: "A global online symposium on transition pathways for energy-intensive industries.",
    cta: { label: "Register Now" },
  },
  {
    id: "green-steel-workshop",
    title: "Green Steel Workshop",
    eventType: "Workshop",
    mode: "In person",
    location: "Berlin, DE",
    startsAt: "2026-11-12T09:00:00Z",
    capacity: 60,
    summary: "Practical session on hydrogen-based reduction and electric arc furnace retrofits.",
    cta: { label: "Register Now" },
  },
  {
    id: "carbon-auditing-supply-chains",
    title: "Carbon Auditing for Supply Chains",
    eventType: "Webinar",
    mode: "Virtual",
    location: "Virtual",
    startsAt: "2026-11-22T14:00:00Z",
    capacity: 300,
    summary:
      "A practical walkthrough on implementing Scope 3 emissions tracking across complex international supply networks using our new diagnostic tools.",
    cta: { label: "Register Now" },
  },
  {
    id: "retrofitting-legacy-infrastructure",
    title: "Retrofitting Legacy Infrastructure",
    eventType: "Workshop",
    mode: "In person",
    location: "London, UK",
    startsAt: "2026-12-05T09:30:00Z",
    capacity: 80,
    summary:
      "Hands-on workshop detailing engineering strategies and financing models for upgrading aging industrial plants to meet modern efficiency standards.",
    cta: { label: "Register Now" },
  },
  {
    id: "net-zero-leaders-dinner",
    title: "Net Zero Leaders Dinner",
    eventType: "Conference",
    mode: "In person",
    location: "London, UK",
    startsAt: "2027-01-20T19:00:00Z",
    capacity: 40,
    summary: "An invitation-only evening for executives leading decarbonization programs.",
    cta: { label: "Request Invite" },
  },
  {
    id: "eu-carbon-pricing",
    title: "Policy Shifts in EU Carbon Pricing",
    eventType: "Webinar",
    mode: "Recorded",
    location: "Virtual",
    startsAt: "2026-10-01T14:00:00Z",
    image: "eventPast1",
    summary: "What the latest ETS reforms mean for exporters and energy-intensive manufacturers.",
    cta: { label: "Watch Replay" },
  },
  {
    id: "carbon-accounting-101",
    title: "Carbon Accounting 101",
    eventType: "Webinar",
    mode: "Recorded",
    location: "Recorded",
    startsAt: "2026-09-15T14:00:00Z",
    summary: "The fundamentals of measuring Scope 1, 2 and 3 emissions.",
    cta: { label: "Watch Replay" },
  },
  {
    id: "q3-cleantech-review",
    title: "Q3 Cleantech Innovations Review",
    eventType: "Summit",
    mode: "Recorded",
    location: "Virtual",
    startsAt: "2026-09-28T14:00:00Z",
    image: "eventPast2",
    summary: "Highlights of the quarter's most promising industrial clean technologies.",
    cta: { label: "Watch Replay" },
  },
  {
    id: "material-circularity",
    title: "Material Circularity in Manufacturing",
    eventType: "Workshop",
    mode: "In person",
    location: "Rotterdam, NL",
    startsAt: "2026-08-05T09:00:00Z",
    summary: "Designing products and processes for reuse, remanufacturing and recycling.",
    cta: { label: "Watch Replay" },
  },
];

/** New animated Home page sections (added to existing site settings only where missing). */
export const homeSections = {
  appIntro: {
    eyebrow: "Our app · in development",
    title: "Most carbon tools are built for analysts. Most emissions happen on the factory floor.",
    text: "Today's carbon calculators assume a sustainability team: spreadsheets, English, emission factors and scopes. But in Bangladesh's brick kilns, garment units and ship-breaking yards, the people who know how much coal was burned are workers and supervisors, often with limited reading, shared phones and weak networks. We're building an app that lets them record what they already know (sacks of coal, gas cylinders, meter readings) by tapping, speaking in Bangla or taking a photo, and turns it into a standards-based GHG inventory.",
    comparison: [
      { typical: "A trained sustainability analyst", ours: "A kiln worker or yard supervisor" },
      { typical: "Typing into forms and spreadsheets", ours: "Tap, speak in Bangla, or take a photo" },
      { typical: "English and technical units", ours: "Bangla and local units: sacks, maunds, cylinders" },
      { typical: "A reliable internet connection", ours: "Works offline and syncs later" },
      { typical: "Data gathered months later for a report", ours: "Recorded daily, on site, with evidence" },
    ],
  },
  impact: {
    eyebrow: "Our impact so far",
    title: "Real factories. Real reductions.",
    factories: {
      value: 500,
      suffix: "+",
      label: "Factories onboarded",
      note: "Brick kilns, garment units, cement and leather plants across Bangladesh.",
    },
    carbon: {
      value: 1.2,
      decimals: 1,
      suffix: "M+",
      label: "Tonnes of CO₂e reduced",
      note: "Emission reductions at partner factories since we started.",
    },
  },
  whatWeDo: {
    eyebrow: "Non-profit research · Bangladesh",
    title: "Cutting industrial carbon in Bangladesh, one factory at a time.",
    text: "Shift to Zero Carbon is a non-profit research organization. We study how Bangladesh's factories (power, garments, cement and leather) produce emissions, and turn that research into practical, affordable ways to reduce them.",
    pillars: [
      { icon: "science", title: "Research", text: "Measure where industrial emissions really come from." },
      { icon: "campaign", title: "Share", text: "Publish open, plain-language findings anyone can use." },
      { icon: "eco", title: "Act", text: "Work with factories on reductions that pay off." },
    ],
  },
  app: {
    name: "STZ Collect",
    title: "Data collection anyone can use.",
    text: "Good climate decisions need good data, and much of it lives with factory workers and communities who may not read or write easily. Our app collects it with pictures, icons and voice instead of long forms.",
    steps: [
      { icon: "touch_app", title: "Pick with pictures", text: "Icons and photos replace text menus, so no reading is needed." },
      { icon: "mic", title: "Speak, don't type", text: "Answer questions by voice in Bangla; we transcribe later." },
      { icon: "wifi_off", title: "Works offline", text: "Saves everything on the phone and syncs when a connection returns." },
      { icon: "diversity_3", title: "Volunteer assisted", text: "Trained volunteers guide people through each survey on site." },
    ],
  },
  volunteer: {
    title: "Lend your time. Change an industry.",
    text: "We need people on the ground and behind the screen. No climate background required, just curiosity and a few hours a month.",
    roles: [
      { icon: "map", title: "Field data collector", text: "Visit factories and help workers use the app." },
      { icon: "query_stats", title: "Data analyst", text: "Clean, check and study emissions data." },
      { icon: "translate", title: "Community liaison", text: "Bangla and local-dialect support for surveys." },
      { icon: "brush", title: "Communications", text: "Write, design and share our findings." },
    ],
    skills: ["Field work", "Data analysis", "Bangla", "Research", "Design", "Writing", "Training", "Community outreach"],
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
