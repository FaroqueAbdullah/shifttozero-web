export const mainNav = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "Carbon Tools" },
  { href: "/events", label: "Events" },
  // { href: "/blog", label: "Blog" }, // hidden for now
  // { href: "/team", label: "Team" }, // hidden for now
] as const;

/** Bottom tab bar on mobile (from the Stitch mobile screens). */
export const mobileTabs = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/tools", label: "Tools", icon: "dataset" },
  { href: "/events", label: "Events", icon: "calendar_month" },
  // { href: "/blog", label: "Blog", icon: "newspaper" }, // hidden for now
] as const;

/** One footer for every page: merges the link groups from the Stitch footer variants. */
export const footerNav = [
  {
    title: "Platform",
    links: [
      { href: "/", label: "Home" },
      { href: "/#methodology", label: "Our Approach" },
      { href: "/tools", label: "Carbon Tools" },
      // { href: "/team", label: "Team" }, // hidden for now
    ],
  },
  {
    title: "Community",
    links: [
      { href: "/events", label: "Events" },
      // { href: "/blog", label: "Blog" }, // hidden for now
      { href: "/get-involved", label: "Get Involved" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
    ],
  },
] as const;

export function isActivePath(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export const adminNav = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/blogs", label: "Blogs", icon: "edit_note" },
  { href: "/admin/events", label: "Events", icon: "event" },
  { href: "/admin/team", label: "Team", icon: "group" },
  { href: "/admin/submissions", label: "Submissions", icon: "inbox" },
] as const;
