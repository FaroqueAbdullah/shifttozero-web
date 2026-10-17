import { defineArrayMember, defineField, defineType } from "sanity";

export const blockContent = defineType({
  name: "blockContent",
  title: "Body",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "Heading 2", value: "h2" },
        { title: "Heading 3", value: "h3" },
        { title: "Quote", value: "blockquote" },
      ],
      marks: {
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (r) => r.uri({ scheme: ["http", "https", "mailto"] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alternative text", validation: (r) => r.required() },
        { name: "caption", type: "string", title: "Caption" },
      ],
    }),
    defineArrayMember({
      name: "pullQuote",
      title: "Pull quote",
      type: "object",
      fields: [
        defineField({ name: "quote", type: "text", rows: 3, validation: (r) => r.required() }),
        defineField({ name: "attribution", type: "string" }),
      ],
      preview: { select: { title: "quote", subtitle: "attribution" } },
    }),
    defineArrayMember({
      name: "callout",
      title: "Callout",
      type: "object",
      fields: [
        defineField({
          name: "icon",
          type: "string",
          initialValue: "eco",
          description: "Material Symbols name",
        }),
        defineField({ name: "title", type: "string", validation: (r) => r.required() }),
        defineField({ name: "text", type: "text", rows: 4 }),
      ],
      preview: { select: { title: "title", subtitle: "text" } },
    }),
  ],
});
