/**
 * "A morning at the kiln" walkthrough shown in the Home app section.
 * Copy, tap positions (x%, y% of the screen) and screenshots come from the
 * Carbon App Blueprint demo. Screenshots live in /public/app-demo.
 */
export type DemoStep = {
  who: string;
  title: string;
  text: string;
  system: string;
  image: string;
  alt: string;
  /** Where the worker taps next, as [x%, y%] of the phone screen. */
  tap?: [number, number];
};

export const appDemoSteps: DemoStep[] = [
  {
    who: "Step 1 · Home",
    title: "The worker opens today's checklist",
    text: "Six tiles, one per activity type at this kiln. Coal and bricks are already done today; the worker taps Coal to update it. Or uses one of the two big buttons to speak or photograph.",
    system:
      "The app loads this site's activity types from the company's configuration and shows which ones still need an entry today.",
    image: "/app-demo/main.webp",
    alt: "Home screen with today's progress and activity tiles",
    tap: [19, 48],
  },
  {
    who: "Step 2 · Tap entry",
    title: "Twelve sacks, counted with + and −",
    text: "The question is one short Bangla sentence with a speaker button. The worker picks sacks as the unit and taps + until it says ১২, then taps Next.",
    system:
      "12 sacks × 50 kg (the company's sack weight) = 600 kg coal. The original entry and the converted value are both stored.",
    image: "/app-demo/coalentry.webp",
    alt: "Coal entry screen showing 12 sacks",
    tap: [50, 93],
  },
  {
    who: "Step 3 · Or by voice",
    title: "Or say the whole day in one sentence",
    text: "Instead of tapping each tile, the worker can speak: “twelve sacks of coal, twenty litres diesel for the generator, two vans of husk.” AI lists what it understood and asks about the item it doesn't know.",
    system:
      "Bangla speech recognition, then item and unit extraction with a confidence score. “Husk” has no type yet, so it is kept aside and the admin is told.",
    image: "/app-demo/voiceentry.webp",
    alt: "Voice entry screen listing coal and diesel understood by AI",
    tap: [60, 93],
  },
  {
    who: "Step 4 · Proof",
    title: "A photo of the receipt as evidence",
    text: "The worker photographs the coal receipt. The amount is hard to read, so the app asks a two-button question instead of making anyone type.",
    system:
      "Document reading pulls quantity, date and seller. The photo is stored as evidence and linked to the entry for audit.",
    image: "/app-demo/photoreceipt.webp",
    alt: "Receipt photo with a question asking 3 or 8 tonnes",
    tap: [30, 65],
  },
  {
    who: "Step 5 · Review",
    title: "Hear it back, then confirm",
    text: "Everything for today in one list, with a pencil on each line. The worker taps the speaker to hear it read aloud, then confirms with one large button.",
    system:
      "Nothing counts until this confirmation. Each entry records how it was made (tap, voice, photo) for the evidence share in reports.",
    image: "/app-demo/review.webp",
    alt: "Review screen listing today's entries",
    tap: [50, 85],
  },
  {
    who: "Step 6 · Saved",
    title: "Saved, even with no network",
    text: "The screen says plainly that there is no internet right now and that the entry will send itself later. The worker doesn't need to do anything else.",
    system:
      "The entry waits in the phone's local database. On sync the server converts units, applies versioned emission factors and GWP, and classifies it: Scope 1 · Stationary combustion.",
    image: "/app-demo/saved.webp",
    alt: "Saved confirmation with offline notice",
    tap: [50, 94],
  },
  {
    who: "Step 7 · Result",
    title: "The month in one sentence: four tonnes less",
    text: "At any time the worker can see this month against last month, where most carbon comes from, and one tip from the company. The same data feeds the full GHG report for managers.",
    system:
      "Approved entries roll up by month, site, scope, category and gas. The admin has already reviewed any entries AI flagged as unusual.",
    image: "/app-demo/monthresult.webp",
    alt: "Monthly result screen",
  },
];
