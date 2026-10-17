import type { Metadata } from "next";
import { LegalPage } from "@/components/organisms/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/terms", title: "Terms of Service" });

// DRAFT: have this reviewed before launch.
export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="October 2026">
      <p>By using this website you agree to these terms.</p>
      <h2>Use of content</h2>
      <p>
        Articles, data and resources on this site are provided for information. You may share them with
        attribution to Shift to Zero Carbon. Data and estimates may change as new information becomes
        available.
      </p>
      <h2>Third-party tools</h2>
      <p>
        The Carbon Tools directory links to services run by other organizations. We do not control them and
        are not responsible for their content or results.
      </p>
      <h2>Events</h2>
      <p>Event details may change. Registration for some events is handled by external providers.</p>
      <h2>Contact</h2>
      <p>
        Questions about these terms? <a href="/contact">Contact us</a>.
      </p>
    </LegalPage>
  );
}
