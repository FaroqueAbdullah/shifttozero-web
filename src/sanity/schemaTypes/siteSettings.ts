import { defineArrayMember, defineField, defineType } from "sanity";

const iconItem = defineArrayMember({
  type: "object",
  fields: [
    defineField({
      name: "icon",
      type: "string",
      description: "Material Symbols name, e.g. science, mic, wifi_off",
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "text", type: "text", rows: 3 }),
  ],
  preview: { select: { title: "title", subtitle: "text" } },
});

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "home", title: "Home page", default: true },
    { name: "tools", title: "Tools page" },
    { name: "team", title: "Team page" },
    { name: "general", title: "General" },
  ],
  fields: [
    defineField({ hidden: true, name: "heroTitle", type: "string", group: "home" }),
    defineField({ hidden: true, name: "heroText", type: "text", rows: 3, group: "home" }),
    defineField({
      hidden: true,
      name: "heroImage",
      type: "image",
      group: "home",
      options: { hotspot: true },
    }),
    defineField({
      name: "whatWeDo",
      title: "1. What we do",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 4 }),
        defineField({ name: "pillars", type: "array", of: [iconItem], validation: (r) => r.max(3) }),
      ],
    }),
    defineField({
      name: "impact",
      title: "2. Impact numbers",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({
          name: "asOf",
          title: "As of",
          type: "string",
          description: 'Shown under the numbers, e.g. "As of October 2026"',
        }),
        defineField({
          name: "factories",
          title: "Factories onboarded",
          type: "object",
          fields: [
            defineField({ name: "value", type: "number", validation: (r) => r.required().min(0) }),
            defineField({ name: "suffix", type: "string", description: 'e.g. "+"' }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "note", type: "string" }),
          ],
        }),
        defineField({
          name: "carbon",
          title: "Carbon reduced",
          type: "object",
          fields: [
            defineField({
              name: "value",
              type: "number",
              description: "Number to count up to, e.g. 1.2",
              validation: (r) => r.required().min(0),
            }),
            defineField({
              name: "decimals",
              type: "number",
              initialValue: 0,
              validation: (r) => r.min(0).max(2).integer(),
            }),
            defineField({ name: "suffix", type: "string", description: 'e.g. "M+" for millions' }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "note", type: "string" }),
          ],
        }),
      ],
    }),
    defineField({
      name: "app",
      title: "3. Our app",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "name", type: "string", description: 'App name, e.g. "STZ Collect"' }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 4 }),
        defineField({
          name: "steps",
          title: "Feature steps",
          type: "array",
          of: [iconItem],
          validation: (r) => r.max(4),
        }),
        defineField({
          name: "screenshots",
          type: "array",
          description: "Optional phone screenshots, one per step. Built-in screens are shown when empty.",
          of: [{ type: "image" }],
          validation: (r) => r.max(4),
        }),
      ],
    }),
    defineField({
      name: "volunteer",
      title: "4. Volunteer",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({ name: "roles", type: "array", of: [iconItem], validation: (r) => r.max(4) }),
        defineField({ name: "skills", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
      ],
    }),
    defineField({
      name: "funding",
      title: "5. Funding",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 3 }),
        defineField({
          name: "allocation",
          title: "Where funding goes",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "label", type: "string", validation: (r) => r.required() }),
                defineField({
                  name: "percent",
                  type: "number",
                  validation: (r) => r.required().min(0).max(100),
                }),
              ],
              preview: {
                select: { title: "label", percent: "percent" },
                prepare: ({ title, percent }) => ({ title, subtitle: `${percent}%` }),
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "emissionsBreakdown",
      title: "Bangladesh industrial emissions summary",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", type: "string", validation: (r) => r.required() }),
            defineField({ name: "percent", type: "number", validation: (r) => r.required().min(0).max(100) }),
          ],
          preview: {
            select: { title: "label", percent: "percent" },
            prepare: ({ title, percent }) => ({ title, subtitle: `${percent}%` }),
          },
        }),
      ],
    }),
    defineField({ name: "emissionsFootnote", type: "string", group: "home" }),
    defineField({
      name: "impactStats",
      hidden: true,
      title: "Collective impact stats",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", description: "Material Symbols name" }),
            defineField({ name: "value", type: "string", description: 'e.g. "500+"' }),
            defineField({ name: "label", type: "string", description: 'e.g. "Companies Onboarded"' }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      validation: (r) => r.max(3),
    }),
    defineField({
      name: "methodologySteps",
      hidden: true,
      title: "Methodology steps",
      type: "array",
      group: "home",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", description: "Material Symbols name" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: "cta",
      hidden: true,
      title: "Call-to-action banner",
      type: "object",
      group: "home",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 2 }),
      ],
    }),
    defineField({
      name: "appIntro",
      title: "Our app introduction",
      type: "object",
      group: "tools",
      fields: [
        defineField({ name: "eyebrow", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "text", type: "text", rows: 5 }),
        defineField({
          name: "comparison",
          title: "Typical tools vs our app",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              fields: [
                defineField({ name: "typical", title: "Typical carbon tools assume", type: "string" }),
                defineField({ name: "ours", title: "Our app assumes", type: "string" }),
              ],
              preview: { select: { title: "ours", subtitle: "typical" } },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "coreValues",
      title: "Core values",
      type: "array",
      group: "team",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "icon", type: "string", description: "Material Symbols name" }),
            defineField({ name: "title", type: "string" }),
            defineField({ name: "text", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "text" } },
        }),
      ],
    }),
    defineField({
      name: "socialLinks",
      type: "array",
      group: "general",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "platform",
              type: "string",
              options: { list: ["LinkedIn", "X", "Facebook", "YouTube", "Instagram"] },
            }),
            defineField({ name: "url", type: "url" }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    defineField({ name: "brochure", type: "file", group: "general", options: { accept: "application/pdf" } }),
    defineField({ name: "contactEmail", type: "string", group: "general" }),
    defineField({ name: "defaultSeo", type: "seo", group: "general" }),
  ],
  preview: { prepare: () => ({ title: "Site settings" }) },
});
