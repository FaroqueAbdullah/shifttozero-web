import type { Metadata } from "next";
import { LegalPage } from "@/components/organisms/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/privacy", title: "Privacy Policy" });

// DRAFT: have this reviewed before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="October 2026">
      <p>
        Shift to Zero Carbon (&ldquo;we&rdquo;) respects your privacy. This policy explains what we collect
        through this website and how we use it.
      </p>
      <h2>Information we collect</h2>
      <ul>
        <li>Details you send through our forms: name, email, organization, phone number and your message.</li>
        <li>
          Anonymous usage statistics (pages visited, device type) to improve the site. No advertising cookies.
        </li>
      </ul>
      <h2>How we use it</h2>
      <p>
        We use form submissions only to respond to you, to coordinate volunteering and partnerships, and to
        keep records of those conversations. We never sell your information.
      </p>
      <h2>Storage and retention</h2>
      <p>
        Submissions are stored securely with our hosting and database providers and kept only as long as
        needed for the purpose above.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete your information at any time by contacting us through the{" "}
        <a href="/contact">contact form</a>.
      </p>
    </LegalPage>
  );
}
