/**
 * Field notes: short, plain-language write-ups of what we learn in the field.
 * They are the published output of the "Share" pillar. Write only what the team observed;
 * no numbers, places or names that have not been confirmed.
 */

export type FieldNoteBlock =
  { type: "p"; text: string } | { type: "h2"; text: string } | { type: "ul"; items: string[] };

export type FieldNote = {
  slug: string;
  title: string;
  /** One or two sentences, used on the list page and in metadata. */
  summary: string;
  /** Short label shown above the title. */
  topic: string;
  body: FieldNoteBlock[];
  /** Links shown at the end of the note. */
  related: { href: string; label: string }[];
};

export const fieldNotes: FieldNote[] = [
  {
    slug: "why-a-spreadsheet-failed-at-a-brick-kiln",
    title: "Why a spreadsheet failed at a brick kiln",
    topic: "Field research · Brick kilns",
    summary:
      "We asked workers and line managers at a brick kiln to record their work in a simple spreadsheet. The data came back full of errors. The form had failed, not the people.",
    // TODO(Faroque): add when the fieldwork took place (month and year) and, if you want to
    // publish it, what the kiln's most carbon-intensive step turned out to be. Do not name the kiln
    // or its location without the owner's permission.
    body: [
      { type: "h2", text: "What we wanted to find out" },
      {
        type: "p",
        text: "Our team did fieldwork at a brick kiln in Bangladesh. We wanted to find the kiln's most carbon-intensive production step: the part of making bricks that releases the most greenhouse gas.",
      },
      {
        type: "p",
        text: "To answer that, we needed records of what happens at the kiln each day. The people who know those details are the workers and line managers.",
      },
      { type: "h2", text: "Who holds the data" },
      {
        type: "p",
        text: "Most of the kiln's workers cannot read. The line managers can, but they have had little schooling.",
      },
      { type: "h2", text: "What we tried" },
      {
        type: "p",
        text: "We used a simple spreadsheet, to be filled in by the workers and line managers.",
      },
      { type: "h2", text: "What went wrong" },
      { type: "p", text: "When we looked at the filled-in sheet, we found three kinds of problems:" },
      {
        type: "ul",
        items: [
          "Mistyped numbers.",
          "Wrong emission scopes. Scopes are the categories carbon accounting uses to sort emissions, for example whether they come from fuel burned on site or from electricity bought from the grid.",
          "Duplicate entries: the same activity recorded more than once.",
        ],
      },
      { type: "h2", text: "What we concluded" },
      {
        type: "p",
        text: "The form had failed, not the people. A spreadsheet asks people to read, to type, and to sort their work into abstract categories such as emission scopes. None of that fits how work at a kiln is done or talked about.",
      },
      {
        type: "p",
        text: "If the people who hold the data cannot use the tool, the numbers that come out of it cannot be trusted, however careful the calculation is afterwards.",
      },
      { type: "h2", text: "What we are doing about it" },
      {
        type: "p",
        text: "This is why we started designing STZ Collect, a voice-first data-collection app. Instead of typing, a worker would tap, speak in Bangla or photograph a receipt, and record amounts in units they already use, such as sacks, maunds and cylinders. The app is designed to sort entries into scopes automatically (coal burned in the kiln, for example, is Scope 1: stationary combustion), so nobody on the kiln floor has to.",
      },
      {
        type: "p",
        text: "STZ Collect is in development (design and early prototype, v0.1).",
      },
      { type: "h2", text: "What we still don't know" },
      {
        type: "p",
        text: "Speech models mishear. So our main open question is this: how can someone who cannot read confirm what the AI recorded? We do not have a full answer yet.",
      },
    ],
    related: [
      { href: "/tools/app", label: "Read the STZ Collect design" },
      { href: "/tools/app#open-question", label: "The open research question" },
    ],
  },
];

export const getFieldNote = (slug: string) => fieldNotes.find((n) => n.slug === slug);
