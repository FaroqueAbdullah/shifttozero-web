import type { Metadata } from "next";
import { AnimatedNumber } from "@/components/atoms/AnimatedNumber";
import { Avatar } from "@/components/atoms/Avatar";
import { Badge } from "@/components/atoms/Badge";
import { Button } from "@/components/atoms/Button";
import { Chip } from "@/components/atoms/Chip";
import { Input, Select, Textarea } from "@/components/atoms/Field";
import { Heading } from "@/components/atoms/Heading";
import { Icon } from "@/components/atoms/Icon";
import { IconButton } from "@/components/atoms/IconButton";
import { Skeleton } from "@/components/atoms/Skeleton";
import { StatusDot } from "@/components/atoms/StatusDot";
import { Text } from "@/components/atoms/Text";
import { DateBadge } from "@/components/molecules/DateBadge";
import { EventCard } from "@/components/molecules/EventCard";
import { Marquee } from "@/components/molecules/Marquee";
import { PhoneMockup } from "@/components/molecules/PhoneMockup";
import { Reveal } from "@/components/molecules/Reveal";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { FormField } from "@/components/molecules/FormField";
import { IconCard } from "@/components/molecules/IconCard";
import { MetaItem } from "@/components/molecules/MetaItem";
import { SearchInput } from "@/components/molecules/SearchInput";
import { SectionHeader } from "@/components/molecules/SectionHeader";
import { StatTile } from "@/components/molecules/StatTile";
import { TagList } from "@/components/molecules/TagList";
import { ToolCard } from "@/components/molecules/ToolCard";
import { EmptyState } from "@/components/organisms/EmptyState";
import type { EventCard as EventData } from "@/sanity/lib/types";

const sampleEvent: EventData = {
  _id: "sample",
  title: "Global Industrial Decarbonization Summit",
  slug: "sample",
  eventType: "Summit",
  mode: "In person",
  location: "Berlin, Germany",
  startsAt: "2026-11-15T08:00:00Z",
  summary: "Two days on scalable carbon capture and policy integration for heavy manufacturing.",
};

export const metadata: Metadata = {
  title: "Design System",
  robots: { index: false, follow: false },
};

/** Living reference for the "Industrial Vitality" tokens. Toggle the theme to check both modes. */

const colorGroups: { title: string; swatches: { name: string; bg: string; fg: string }[] }[] = [
  {
    title: "Primary",
    swatches: [
      { name: "primary", bg: "bg-primary", fg: "text-on-primary" },
      { name: "primary-container", bg: "bg-primary-container", fg: "text-on-primary-container" },
      { name: "primary-fixed", bg: "bg-primary-fixed", fg: "text-on-primary-fixed" },
      { name: "inverse-primary", bg: "bg-inverse-primary", fg: "text-on-surface" },
    ],
  },
  {
    title: "Secondary",
    swatches: [
      { name: "secondary", bg: "bg-secondary", fg: "text-on-secondary" },
      { name: "secondary-container", bg: "bg-secondary-container", fg: "text-on-secondary-container" },
      { name: "secondary-fixed", bg: "bg-secondary-fixed", fg: "text-on-secondary-fixed" },
    ],
  },
  {
    title: "Tertiary",
    swatches: [
      { name: "tertiary", bg: "bg-tertiary", fg: "text-on-tertiary" },
      { name: "tertiary-container", bg: "bg-tertiary-container", fg: "text-on-tertiary-container" },
      { name: "tertiary-fixed", bg: "bg-tertiary-fixed", fg: "text-on-tertiary-fixed" },
    ],
  },
  {
    title: "Error",
    swatches: [
      { name: "error", bg: "bg-error", fg: "text-on-error" },
      { name: "error-container", bg: "bg-error-container", fg: "text-on-error-container" },
    ],
  },
  {
    title: "Surfaces",
    swatches: [
      { name: "surface", bg: "bg-surface", fg: "text-on-surface" },
      { name: "surface-container-lowest", bg: "bg-surface-container-lowest", fg: "text-on-surface" },
      { name: "surface-container-low", bg: "bg-surface-container-low", fg: "text-on-surface" },
      { name: "surface-container", bg: "bg-surface-container", fg: "text-on-surface" },
      { name: "surface-container-high", bg: "bg-surface-container-high", fg: "text-on-surface" },
      { name: "surface-container-highest", bg: "bg-surface-container-highest", fg: "text-on-surface" },
      { name: "inverse-surface", bg: "bg-inverse-surface", fg: "text-inverse-on-surface" },
    ],
  },
  {
    title: "Brand roles & lines",
    swatches: [
      { name: "heading", bg: "bg-heading", fg: "text-surface" },
      { name: "accent", bg: "bg-accent", fg: "text-white" },
      { name: "outline", bg: "bg-outline", fg: "text-surface" },
      { name: "outline-variant", bg: "bg-outline-variant", fg: "text-on-surface" },
      { name: "keyline", bg: "bg-keyline", fg: "text-on-surface" },
    ],
  },
];

const typeScale = [
  {
    token: "headline-xl",
    spec: "Montserrat 48/56 · 700 · -0.02em",
    className: "font-headline-xl text-headline-xl",
  },
  {
    token: "headline-lg",
    spec: "Montserrat 32/40 · 700 · -0.01em",
    className: "font-headline-lg text-headline-lg",
  },
  {
    token: "headline-lg-mobile",
    spec: "Montserrat 28/34 · 700",
    className: "font-headline-lg-mobile text-headline-lg-mobile",
  },
  { token: "headline-md", spec: "Montserrat 24/32 · 600", className: "font-headline-md text-headline-md" },
  { token: "body-lg", spec: "Inter 18/28 · 400", className: "font-body-lg text-body-lg" },
  { token: "body-md", spec: "Inter 16/24 · 400", className: "font-body-md text-body-md" },
  {
    token: "label-md",
    spec: "Inter 14/20 · 600 · 0.05em",
    className: "font-label-md text-label-md uppercase",
  },
  { token: "caption", spec: "Inter 12/16 · 400", className: "font-caption text-caption" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-6">
      <h2 className="font-headline-md text-headline-md text-heading">{title}</h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  return (
    <div className="container-page flex flex-col gap-16 py-16">
      <header>
        <p className="font-label-md text-label-md text-primary uppercase">Industrial Vitality</p>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-heading md:font-headline-xl md:text-headline-xl">
          Design System
        </h1>
        <p className="mt-4 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          Fixed color tokens, type scale and the atomic component catalogue for Shift to Zero Carbon. Use the
          theme button in the header to check light and dark mode.
        </p>
      </header>

      <Section title="Colors">
        {colorGroups.map((group) => (
          <div key={group.title} className="flex flex-col gap-3">
            <h3 className="font-label-md text-label-md text-on-surface-variant uppercase">{group.title}</h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {group.swatches.map((s) => (
                <div
                  key={s.name}
                  className={`${s.bg} ${s.fg} flex h-24 items-end rounded-card border border-keyline p-3`}
                >
                  <span className="font-caption text-caption">{s.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </Section>

      <Section title="Typography">
        <div className="divide-y divide-keyline rounded-card border border-keyline bg-surface-container-lowest">
          {typeScale.map((t) => (
            <div key={t.token} className="flex flex-col gap-2 p-6 md:flex-row md:items-baseline md:gap-8">
              <div className="w-56 shrink-0">
                <p className="font-label-md text-label-md text-primary">{t.token}</p>
                <p className="font-caption text-caption text-on-surface-variant">{t.spec}</p>
              </div>
              <p className={`${t.className} text-on-surface`}>Shift to Zero Carbon</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-4">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button disabled>Disabled</Button>
          <Button>
            Get Involved <Icon name="arrow_forward" className="text-[18px]" />
          </Button>
        </div>
      </Section>

      <Section title="Cards & radius">
        <div className="grid gap-gutter md:grid-cols-3">
          <div className="rounded-card border border-keyline bg-surface-container-lowest p-6">
            <p className="font-label-md text-label-md text-on-surface-variant">Card · radius-card 16px</p>
            <p className="mt-2 font-body-md text-body-md text-on-surface">
              White surface, 1px keyline border, 24px padding.
            </p>
          </div>
          <div className="rounded-card border border-keyline bg-surface-container-lowest p-6 transition-shadow hover:shadow-ambient">
            <p className="font-label-md text-label-md text-on-surface-variant">Hover → ambient shadow</p>
            <p className="mt-2 font-body-md text-body-md text-on-surface">Shadows only on interaction.</p>
          </div>
          <div className="flex flex-col gap-1 rounded-feature bg-primary-container p-6 text-on-primary-container">
            <Icon name="eco" className="text-[32px]" />
            <p className="font-headline-lg text-headline-lg">1.2M+ Tons</p>
            <p className="font-label-md text-label-md">Impact stat · radius-feature 24px</p>
          </div>
        </div>
      </Section>

      <Section title="Atoms">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="flex flex-col gap-3">
            <Text variant="overline">Heading / Text</Text>
            <Heading as="p" size="md">
              Heading md
            </Heading>
            <Text variant="body-lg">Body large text</Text>
            <Text>Body text</Text>
            <Text variant="caption">Caption text</Text>
          </div>
          <div className="flex flex-col gap-4">
            <Text variant="overline">Badge / Status / Chip</Text>
            <div className="flex flex-wrap gap-2">
              <Badge>Technology</Badge>
              <Badge tone="primary">Primary</Badge>
              <Badge tone="tertiary">Tertiary</Badge>
              <Badge tone="neutral">Neutral</Badge>
              <Badge tone="error">Error</Badge>
            </div>
            <div className="flex flex-wrap gap-4">
              <StatusDot label="Published" />
              <StatusDot tone="tertiary" label="Reviewed" />
              <StatusDot tone="neutral" label="Draft" />
              <StatusDot tone="error" label="Failed" />
            </div>
            <div className="flex flex-wrap gap-2">
              <Chip active>All</Chip>
              <Chip>Policy</Chip>
              <Chip>Case Study</Chip>
            </div>
            <div className="flex items-center gap-3">
              <IconButton icon="share" label="Share" bordered />
              <IconButton icon="delete" label="Delete" tone="danger" />
              <Avatar name="Elena Rostova" />
              <Avatar name="Marcus Thorne" size={48} />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Text variant="overline">Form controls</Text>
            <Input placeholder="Input" />
            <Select defaultValue="">
              <option value="" disabled>
                Select...
              </option>
              <option>Manufacturing</option>
            </Select>
            <Textarea rows={2} placeholder="Textarea" />
          </div>
          <div className="flex flex-col gap-4">
            <Text variant="overline">Skeleton</Text>
            <Skeleton className="h-24" />
            <Skeleton className="h-6 w-2/3" />
          </div>
        </div>
      </Section>

      <Section title="Motion">
        <MotionProvider>
          <div className="grid items-center gap-gutter md:grid-cols-2">
            <div className="flex flex-col gap-6">
              <Reveal>
                <p className="font-headline-lg text-headline-lg text-primary">
                  <AnimatedNumber value={1200000} suffix="+" />
                </p>
                <Text variant="caption">
                  AnimatedNumber inside Reveal: counts up and fades in when scrolled into view.
                </Text>
              </Reveal>
              <Marquee items={["Field work", "Data analysis", "Bangla", "Research", "Design"]} />
            </div>
            <PhoneMockup appName="STZ Collect" active={1} />
          </div>
        </MotionProvider>
      </Section>

      <Section title="Molecules">
        <div className="flex flex-col gap-10">
          <SectionHeader
            title="Section header (center)"
            description="Centered title with a short description."
            className="mb-0"
          />
          <SectionHeader
            variant="bar"
            title="Section header (bar)"
            action={{ href: "#", label: "See all" }}
          />
          <div className="grid gap-8 md:grid-cols-2">
            <FormField id="ds-email" label="Form field" error="Please enter a valid email">
              {(aria) => <Input {...aria} placeholder="jane@example.com" />}
            </FormField>
            <SearchInput label="Search" placeholder="Search input..." />
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <DateBadge date="2026-11-15T08:00:00Z" />
            <MetaItem icon="location_on">Berlin, Germany</MetaItem>
            <MetaItem icon="schedule">8 min read</MetaItem>
            <TagList tags={["Direct Air Capture", "Heavy Manufacturing"]} />
          </div>
          <div className="grid gap-gutter md:grid-cols-3">
            <StatTile icon="corporate_fare" value="500+" label="Companies Onboarded" />
            <StatTile
              icon="eco"
              value="1.2M+ Tons"
              label="CO₂e Reduced"
              highlighted
              ribbon="Verified Impact"
            />
            <div className="flex flex-col gap-6 rounded-xl border border-outline-variant p-6">
              <StatTile variant="glance" icon="groups" value="500+ Attendees" label="Industry Leaders" />
              <StatTile
                variant="glance"
                icon="mic"
                value="40+ Speakers"
                label="Global Experts"
                tone="secondary"
              />
              <StatTile variant="figure" value="40%" label="Power Gen" />
            </div>
          </div>
          <div className="grid gap-gutter md:grid-cols-3">
            <IconCard
              icon="calculate"
              watermark="analytics"
              title="1. Calculate"
              text="Methodology step card."
            />
            <IconCard variant="value" icon="science" title="Science-First" text="Core value card." />
            <ToolCard
              tool={{
                _id: "t",
                name: "GridShift Analyzer",
                category: "Free & standards",
                pricing: "Free",
                audience: "Sustainability teams",
                inputs: "Spreadsheets",
                icon: "bolt",
                description: "Tool directory card.",
                url: "#",
              }}
            />
          </div>
          <EventCard event={sampleEvent} />
          <div className="grid gap-gutter md:grid-cols-2">
            <EventCard event={sampleEvent} variant="tile" />
            <EventCard event={sampleEvent} variant="past" past />
          </div>
          <EmptyState title="Empty state" text="Shown when a list or filter has no results." />
        </div>
      </Section>
    </div>
  );
}
