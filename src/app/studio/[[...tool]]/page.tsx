/**
 * Embedded Sanity Studio. Editors sign in with their Sanity account.
 * Invite editors from sanity.io/manage → project → Members.
 */
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <NextStudio config={config} />;
}
