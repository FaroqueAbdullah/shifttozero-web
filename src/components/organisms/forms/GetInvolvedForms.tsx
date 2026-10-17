"use client";

import { Input, Select, Textarea } from "@/components/atoms/Field";
import { FormField } from "@/components/molecules/FormField";
import { submitInquiry, submitPartnership, submitVolunteer } from "@/lib/actions/submit";
import { CONTACT_TOPICS, INDUSTRY_SECTORS } from "@/lib/validation";
import { FormCard } from "./FormCard";
import { SubmissionForm } from "./SubmissionForm";

const first = (errors: Record<string, string[] | undefined>, key: string) => errors[key]?.[0];

export function VolunteerForm() {
  return (
    <FormCard
      icon="person"
      title="For Individuals"
      description="Lend your voice, skills, and time to our campaigns. Sign up to volunteer and become an advocate for industrial decarbonization in your community."
    >
      <SubmissionForm
        action={submitVolunteer}
        submitLabel="Sign Up to Volunteer"
        submitIcon="arrow_forward"
        successTitle="Thanks for signing up!"
        successText="We'll be in touch soon with ways to get involved."
      >
        {(errors) => (
          <>
            <FormField id="volunteer-name" label="Full Name" error={first(errors, "name")}>
              {(aria) => <Input {...aria} name="name" placeholder="Jane Doe" autoComplete="name" required />}
            </FormField>
            <FormField id="volunteer-email" label="Email Address" error={first(errors, "email")}>
              {(aria) => (
                <Input
                  {...aria}
                  name="email"
                  type="email"
                  placeholder="jane@example.com"
                  autoComplete="email"
                  required
                />
              )}
            </FormField>
            <FormField id="volunteer-skills" label="Key Skills" error={first(errors, "skills")}>
              {(aria) => (
                <Input {...aria} name="skills" placeholder="e.g., Data Analysis, Writing, Organizing" />
              )}
            </FormField>
            <FormField id="volunteer-message" label="Areas of Interest" error={first(errors, "message")}>
              {(aria) => (
                <Textarea
                  {...aria}
                  name="message"
                  rows={3}
                  placeholder="Tell us what aspects of decarbonization interest you most..."
                />
              )}
            </FormField>
          </>
        )}
      </SubmissionForm>
    </FormCard>
  );
}

export function PartnershipForm() {
  return (
    <FormCard
      icon="domain"
      tone="primary"
      title="For Companies"
      description="Partner with us to assess your baseline, set ambitious targets, and implement actionable strategies to decarbonize your industrial operations."
    >
      <SubmissionForm
        action={submitPartnership}
        submitLabel="Register Partnership Interest"
        submitIcon="handshake"
        submitStyle="outline"
        successTitle="Thank you for your interest!"
        successText="Our partnerships team will contact you within a few working days."
      >
        {(errors) => (
          <>
            <FormField id="company-name" label="Company Name" error={first(errors, "organization")}>
              {(aria) => (
                <Input
                  {...aria}
                  name="organization"
                  placeholder="Acme Industries"
                  autoComplete="organization"
                  required
                />
              )}
            </FormField>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField id="company-sector" label="Industry Sector" error={first(errors, "sector")}>
                {(aria) => (
                  <Select {...aria} name="sector" defaultValue="" required>
                    <option value="" disabled>
                      Select industry...
                    </option>
                    {INDUSTRY_SECTORS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                )}
              </FormField>
              <FormField id="company-contact" label="Contact Person" error={first(errors, "name")}>
                {(aria) => (
                  <Input {...aria} name="name" placeholder="Name & Title" autoComplete="name" required />
                )}
              </FormField>
            </div>
            <FormField id="company-email" label="Work Email" error={first(errors, "email")}>
              {(aria) => (
                <Input
                  {...aria}
                  name="email"
                  type="email"
                  placeholder="contact@company.com"
                  autoComplete="email"
                  required
                />
              )}
            </FormField>
            <FormField id="company-goals" label="Sustainability Goals" error={first(errors, "message")}>
              {(aria) => (
                <Textarea
                  {...aria}
                  name="message"
                  rows={2}
                  className="resize-none"
                  placeholder="Briefly describe your current initiatives or targets..."
                />
              )}
            </FormField>
          </>
        )}
      </SubmissionForm>
    </FormCard>
  );
}

export function ContactForm({
  defaultTopic = "General",
}: {
  defaultTopic?: (typeof CONTACT_TOPICS)[number];
}) {
  return (
    <FormCard
      id="contact"
      icon="mail"
      title="Send us a message"
      description="Questions about our research, funding, partnerships or the media? We reply within a few working days."
    >
      <SubmissionForm
        action={submitInquiry}
        submitLabel="Send Message"
        submitIcon="send"
        successTitle="Message sent"
        successText="Thanks for reaching out. We'll reply as soon as we can."
      >
        {(errors) => (
          <>
            <FormField id="contact-topic" label="Topic" error={first(errors, "topic")}>
              {(aria) => (
                <Select {...aria} name="topic" defaultValue={defaultTopic}>
                  {CONTACT_TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>
              )}
            </FormField>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <FormField id="contact-name" label="Full Name" error={first(errors, "name")}>
                {(aria) => (
                  <Input {...aria} name="name" placeholder="Jane Doe" autoComplete="name" required />
                )}
              </FormField>
              <FormField id="contact-email" label="Email Address" error={first(errors, "email")}>
                {(aria) => (
                  <Input
                    {...aria}
                    name="email"
                    type="email"
                    placeholder="jane@example.com"
                    autoComplete="email"
                    required
                  />
                )}
              </FormField>
              <FormField
                id="contact-org"
                label="Organization (optional)"
                error={first(errors, "organization")}
              >
                {(aria) => (
                  <Input
                    {...aria}
                    name="organization"
                    placeholder="Acme Industries"
                    autoComplete="organization"
                  />
                )}
              </FormField>
              <FormField id="contact-phone" label="Phone (optional)" error={first(errors, "phone")}>
                {(aria) => (
                  <Input {...aria} name="phone" type="tel" placeholder="+880 ..." autoComplete="tel" />
                )}
              </FormField>
            </div>
            <FormField id="contact-message" label="Message" error={first(errors, "message")}>
              {(aria) => (
                <Textarea {...aria} name="message" rows={4} placeholder="How can we help?" required />
              )}
            </FormField>
          </>
        )}
      </SubmissionForm>
    </FormCard>
  );
}
