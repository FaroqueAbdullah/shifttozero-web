import type { Metadata } from "next";
import { LegalPage } from "@/components/organisms/site/LegalPage";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({ path: "/privacy", title: "Privacy Policy" });

// DRAFT: have this reviewed before launch.
export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 2026">
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
      <h2 id="stz-collect">STZ Collect (in development)</h2>
      <p>
        STZ Collect is a data-collection app we are designing for factory workers (in development, v0.1). This
        section describes the data it is designed to handle, so that companies and workers know what to
        expect. We will update it before the app is used in production.
      </p>
      <ul>
        <li>
          <strong>Sign-in:</strong> each worker signs in with a phone number and a PIN.
        </li>
        <li>
          <strong>Voice recordings:</strong> when a worker speaks an entry in Bangla, the recording is turned
          into text by a speech model and kept as evidence for that entry.
        </li>
        <li>
          <strong>Photos:</strong> photos of receipts and meters are read by the app to fill in amounts, and
          kept as evidence for the entry.
        </li>
        <li>
          <strong>Offline storage and sync:</strong> entries are saved on the phone first and sent to our
          server when a network connection is available.
        </li>
        <li>
          <strong>Per-company access:</strong> each company&apos;s data is kept separate. Only people that
          company authorizes can see its entries, photos and recordings.
        </li>
        <li>
          <strong>Human review of AI flags:</strong> the app uses AI to flag entries that look unusual. A flag
          is never acted on automatically: a person at the company reviews it and approves or corrects the
          entry. Every change is logged.
        </li>
      </ul>
      {/* TODO(Faroque): state how long voice recordings, photos and entries are kept (retention periods). */}
      <p>
        <strong>How long we keep it:</strong> retention periods for recordings, photos and entries will be
        published here before the app is used in production.
      </p>
      {/* TODO(Faroque): name the hosting provider and the country where STZ Collect data is stored. */}
      <p>
        <strong>Where it is stored:</strong> the hosting provider and storage location will be named here
        before the app is used in production.
      </p>
      <h2>Your rights</h2>
      <p>
        You can ask us to access, correct or delete your information at any time by contacting us through the{" "}
        <a href="/contact">contact form</a>.
      </p>
    </LegalPage>
  );
}
