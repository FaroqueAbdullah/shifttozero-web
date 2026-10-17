import { defineArrayMember, defineField, defineType } from "sanity";
import { EVENT_TYPES, EVENT_MODES } from "../constants";

export const event = defineType({
  name: "event",
  title: "Event",
  type: "document",
  groups: [
    { name: "main", title: "Main", default: true },
    { name: "details", title: "Details" },
    { name: "venue", title: "Venue" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "main", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      group: "main",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "eventType",
      type: "string",
      group: "main",
      options: { list: [...EVENT_TYPES], layout: "radio" },
      initialValue: "Summit",
      validation: (r) => r.required(),
    }),
    defineField({ name: "capacity", type: "number", group: "main", validation: (r) => r.min(0).integer() }),
    defineField({ name: "startsAt", type: "datetime", group: "main", validation: (r) => r.required() }),
    defineField({ name: "endsAt", type: "datetime", group: "main" }),
    defineField({
      name: "mode",
      type: "string",
      group: "main",
      options: { list: [...EVENT_MODES], layout: "radio" },
      initialValue: "In person",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      type: "string",
      group: "main",
      description: 'Short label, e.g. "Berlin, DE" or "Virtual Summit"',
    }),
    defineField({ name: "summary", type: "text", rows: 3, group: "main" }),
    defineField({ name: "heroImage", type: "image", group: "main", options: { hotspot: true } }),
    defineField({
      name: "cta",
      title: "Call to action",
      type: "object",
      group: "main",
      fields: [
        defineField({
          name: "label",
          type: "string",
          options: { list: ["Register Now", "Watch Replay", "Request Invite"] },
          initialValue: "Register Now",
        }),
        defineField({
          name: "url",
          type: "url",
          description: "External registration link (Luma, Google Form, Eventbrite...)",
        }),
      ],
    }),
    defineField({ name: "about", type: "blockContent", group: "details" }),
    defineField({
      name: "highlights",
      title: "At a glance",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "icon",
              type: "string",
              description: "Material Symbols name, e.g. groups, mic, handshake",
            }),
            defineField({ name: "value", type: "string", description: 'e.g. "500+ Attendees"' }),
            defineField({ name: "label", type: "string", description: 'e.g. "Industry Leaders"' }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "agenda",
      type: "array",
      group: "details",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "time", type: "string", description: 'e.g. "09:00 - 10:00"' }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({ name: "speaker", type: "reference", to: [{ type: "teamMember" }] }),
            defineField({ name: "speakerName", type: "string", description: "Use for external speakers" }),
          ],
          preview: { select: { title: "title", subtitle: "time" } },
        }),
      ],
    }),
    defineField({
      name: "venue",
      type: "object",
      group: "venue",
      fields: [
        defineField({ name: "name", type: "string" }),
        defineField({ name: "address", type: "text", rows: 2 }),
        defineField({ name: "mapUrl", type: "url", title: "Directions URL" }),
      ],
    }),
    defineField({ name: "seo", type: "seo", group: "main" }),
  ],
  orderings: [{ title: "Date", name: "startsAtAsc", by: [{ field: "startsAt", direction: "asc" }] }],
  preview: {
    select: { title: "title", date: "startsAt", location: "location", media: "heroImage" },
    prepare: ({ title, date, location, media }) => ({
      title,
      subtitle: [date?.slice(0, 10), location].filter(Boolean).join(" · "),
      media,
    }),
  },
});
