import { defineField, defineType } from "sanity";
import { TOOL_CATEGORIES, TOOL_PRICING } from "../constants";

/** An existing carbon calculator listed on the Carbon Tools page. */
export const carbonTool = defineType({
  name: "carbonTool",
  title: "Carbon tool",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "organization", type: "string", description: "Company or body that makes it" }),
    defineField({
      name: "category",
      type: "string",
      options: { list: [...TOOL_CATEGORIES] },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "pricing",
      type: "string",
      options: { list: [...TOOL_PRICING], layout: "radio" },
      description: "Free if the core tool is free to use; otherwise Paid",
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Material Symbols name, e.g. calculate, apparel, code",
    }),
    defineField({ name: "logo", type: "image", description: "Optional; the icon is shown when empty" }),
    defineField({ name: "description", type: "text", rows: 3, validation: (r) => r.required().max(240) }),
    defineField({
      name: "audience",
      title: "Built for",
      type: "string",
      description: 'e.g. "Sustainability teams"',
    }),
    defineField({
      name: "inputs",
      title: "Main inputs",
      type: "string",
      description: 'e.g. "Spreadsheets and ERP data"',
    }),
    defineField({ name: "url", title: "Tool URL", type: "url", validation: (r) => r.required() }),
    defineField({
      name: "lastChecked",
      type: "date",
      description: "When the details above were last verified on the official site",
    }),
    defineField({ name: "order", type: "number", initialValue: 100 }),
  ],
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "name", subtitle: "category" } },
});
