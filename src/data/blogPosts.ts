export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "building-accessible-design-systems",
    title: "Building Accessible Design Systems with React and Tailwind CSS",
    excerpt:
      "A deep dive into creating component libraries that are both beautiful and WCAG-compliant — lessons learned from shipping design systems in production.",
    date: "April 10, 2025",
    readingTime: "8 min read",
    tags: ["React", "Accessibility", "Design Systems"],
    content: `
      <p>Design systems are only as good as the constraints they enforce. When I started building the component library for our SaaS platform, I quickly learned that accessibility and aesthetics are not opposites — they reinforce each other.</p>
      <h3>Why accessibility pays off</h3>
      <p>Beyond the ethical argument, accessible UIs are more robust. Keyboard navigation, focus management, and semantic HTML catch bugs early because they demand clear state modeling. A modal that can't be closed with Escape is broken for screen-reader users — and also broken for keyboard power users, which is often your engineering team.</p>
      <h3>Starting with tokens, not components</h3>
      <p>The biggest leverage point in a design system is your token layer. Color, spacing, and typography tokens enforce consistency before any component is written. With Tailwind CSS, CSS custom properties map cleanly to design tokens, making it straightforward to enforce contrast ratios at the token level rather than patching individual components.</p>
      <h3>Testing what you build</h3>
      <p>Automated accessibility testing with tools like axe-core catches around 30–40% of issues. The rest requires manual testing with a keyboard and a screen reader. I recommend building a quick testing checklist into your PR template so it becomes a habit, not an afterthought.</p>
      <p>The investment pays back quickly. An accessible component written once is reused everywhere. The alternative — retrofitting accessibility — is far more expensive and far less thorough.</p>
    `,
  },
  {
    id: "photography-meets-software",
    title: "What Photography Taught Me About Software Engineering",
    excerpt:
      "Constraints breed creativity. Lessons from a decade behind the lens that changed how I approach system design, debugging, and user empathy.",
    date: "March 22, 2025",
    readingTime: "6 min read",
    tags: ["Photography", "Engineering", "Creativity"],
    content: `
      <p>I picked up a camera before I wrote my first line of code. For years I treated them as separate pursuits — one technical, one creative. Eventually I noticed they were teaching me the same things.</p>
      <h3>Constraints are a feature</h3>
      <p>A film camera with 36 exposures forces intentionality. You can't spray and pray. Software budgets and deadlines work the same way. The best engineers I've worked with treat constraints not as obstacles but as design parameters that sharpen the solution.</p>
      <h3>The histogram is a debugger</h3>
      <p>Photographers learn to read histograms before they trust their eyes — the screen lies depending on ambient light. In software, logs and metrics are your histogram. Trust the data, not your intuition, when something looks fine but feels wrong.</p>
      <h3>User empathy through the viewfinder</h3>
      <p>Portrait photography requires you to make someone comfortable in front of a camera — a fundamentally uncomfortable situation. That same empathy transfers directly to UX. The user's mental model, not your implementation, determines whether a product feels intuitive.</p>
      <p>Both disciplines reward patience, iteration, and willingness to delete work that isn't serving the final image. Delete the clever code. Keep the clear code.</p>
    `,
  },
  {
    id: "fullstack-deploy-checklist",
    title: "The Full-Stack Deploy Checklist I Wish I Had Earlier",
    excerpt:
      "From environment variables to database migrations to rollback plans — a battle-tested checklist built from real production incidents.",
    date: "February 14, 2025",
    readingTime: "10 min read",
    tags: ["DevOps", "Backend", "Best Practices"],
    content: `
      <p>Every engineer has a horror story about a deploy that went sideways at the worst time. After a few of my own, I started keeping a checklist. Here's the version I actually use.</p>
      <h3>Before you merge</h3>
      <p>Run the full test suite locally, not just unit tests. Check that all new environment variables are documented and added to your secrets manager. If the change touches the database schema, review the migration for backwards compatibility — your old pods will still be running during a rolling deploy.</p>
      <h3>The deploy window</h3>
      <p>Pick a low-traffic window and tell the team. Even if you're confident, deploys that happen at 4pm Friday are a liability. Set up your monitoring dashboard before you click deploy so you're not searching for it after.</p>
      <h3>Rollback plan</h3>
      <p>Write the rollback steps before you deploy, not after something breaks. If your migration is irreversible (column drops, data transforms), you need a feature flag or a blue-green deployment strategy, not a prayer.</p>
      <h3>Post-deploy</h3>
      <p>Watch error rates and latency for at least 15 minutes. Check that your most critical user flows work end-to-end. Only then close the deploy ticket.</p>
      <p>The checklist takes five minutes. The incident review for a bad deploy takes five hours.</p>
    `,
  },
  {
    id: "color-theory-for-developers",
    title: "Color Theory for Developers: Enough to Stop Making Ugly UIs",
    excerpt:
      "You don't need a design degree to make interfaces that don't hurt eyes. A practical guide to color that every engineer should read once.",
    date: "January 30, 2025",
    readingTime: "7 min read",
    tags: ["Design", "UI/UX", "CSS"],
    content: `
      <p>Most developers treat color as a black box — they pick a primary color from a palette generator and hope for the best. There's a better way, and it doesn't require a design degree.</p>
      <h3>The 60-30-10 rule</h3>
      <p>Use your dominant color for 60% of the space (usually background), your secondary color for 30% (cards, sidebars), and your accent for 10% (CTAs, highlights). This ratio creates visual hierarchy almost automatically.</p>
      <h3>HSL over hex</h3>
      <p>Work in HSL (hue, saturation, lightness) rather than hex values. HSL lets you reason about color relationships. Darkening a color is reducing lightness, not guessing a new hex. This is why Tailwind's color system and CSS custom properties in HSL are such a productive combination.</p>
      <h3>Contrast is not optional</h3>
      <p>WCAG AA requires a contrast ratio of 4.5:1 for normal text and 3:1 for large text. Use a contrast checker before shipping. Low contrast isn't a style choice — it's a readability failure for a significant portion of your users.</p>
      <h3>Limit your palette</h3>
      <p>Pick one primary, one accent, neutral grays, and semantic colors (success, warning, error). Everything else is noise. The discipline of a limited palette forces consistency and makes future changes predictable.</p>
    `,
  },
  {
    id: "freelancing-lessons",
    title: "Three Years of Freelancing: What I'd Tell My Earlier Self",
    excerpt:
      "Scope creep, underpricing, and client communication mistakes — honest lessons from three years of independent software and design work.",
    date: "January 8, 2025",
    readingTime: "9 min read",
    tags: ["Freelancing", "Career", "Business"],
    content: `
      <p>I started freelancing thinking the hard part was the technical work. I was wrong. The hard part is everything around it.</p>
      <h3>Price for the outcome, not the time</h3>
      <p>Hourly billing punishes you for getting faster. A client doesn't care whether the logo took two hours or twenty — they care what it does for their brand. Outcome-based pricing aligns incentives and removes the awkward time-tracking conversation.</p>
      <h3>Scope creep is a contract problem</h3>
      <p>Every project that spiraled out of control taught me the same lesson: the scope wasn't defined clearly enough upfront. A statement of work that lists explicit deliverables and explicit exclusions is the most valuable document in any engagement.</p>
      <h3>Communication beats quality</h3>
      <p>Clients who feel informed are forgiving clients. Clients who feel ignored escalate even when the work is good. A weekly status message that takes five minutes to write can save hours of difficult conversations.</p>
      <h3>Chase the right clients, not more clients</h3>
      <p>One great long-term client is worth more than five difficult short-term ones. Great clients refer other great clients. Difficult clients refer other difficult clients. Your client list is self-reinforcing, so be selective early.</p>
    `,
  },
  {
    id: "react-performance-patterns",
    title: "React Performance Patterns That Actually Move the Needle",
    excerpt:
      "Skip the premature optimisation. Here are the patterns with real impact — measured, not assumed — for React apps at production scale.",
    date: "December 12, 2024",
    readingTime: "11 min read",
    tags: ["React", "Performance", "Frontend"],
    content: `
      <p>Performance optimisation in React is often cargo-culted. Developers reach for useMemo and useCallback because they've heard they help, without measuring whether they actually do. Here's what genuinely moves the needle.</p>
      <h3>Measure first</h3>
      <p>Open the React DevTools Profiler before writing a single line of optimisation code. Identify which components are re-rendering and why. The bottleneck is almost never where you think it is.</p>
      <h3>Colocate state</h3>
      <p>The single biggest source of unnecessary re-renders is state that lives too high in the tree. If only one component uses a piece of state, that state should live in that component. Lifting state is a tool, not a default.</p>
      <h3>Virtualise long lists</h3>
      <p>Rendering 1,000 DOM nodes when only 20 are visible is wasteful. Libraries like TanStack Virtual make windowing straightforward. This is often a 10x improvement for data-heavy UIs and requires no algorithmic cleverness.</p>
      <h3>Code-split at the route level</h3>
      <p>React.lazy and Suspense make route-level code splitting trivial. Getting your initial bundle below 200KB (gzipped) has more impact on perceived performance than almost any runtime optimisation.</p>
      <p>Profile, identify, fix, re-measure. Don't guess.</p>
    `,
  },
];
