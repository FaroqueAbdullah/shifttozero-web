import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  options: { collapsible: true, collapsed: true },
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.max(60) }),
    defineField({ name: "description", type: "text", rows: 2, validation: (r) => r.max(160) }),
    defineField({ name: "image", title: "Social share image", type: "image" }),
  ],
});
