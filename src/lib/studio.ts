/** Deep links into the embedded Sanity Studio (intent URLs). */
const stripDraft = (id: string) => id.replace(/^drafts\./, "");

export const studioEditUrl = (id: string, type: string) =>
  `/studio/intent/edit/id=${stripDraft(id)};type=${type}/`;
export const studioCreateUrl = (type: string) => `/studio/intent/create/template=${type};type=${type}/`;
export const studioListUrl = (type: string) => `/studio/structure/${type}`;
