import type { SchemaTypeDefinition } from "sanity";
import { blockContent } from "./blockContent";
import { carbonTool } from "./carbonTool";
import { event } from "./event";
import { post } from "./post";
import { seo } from "./seo";
import { siteSettings } from "./siteSettings";
import { teamMember } from "./teamMember";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  event,
  teamMember,
  carbonTool,
  siteSettings,
  blockContent,
  seo,
];
