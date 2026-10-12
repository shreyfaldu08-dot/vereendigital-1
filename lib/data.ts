export type Service = {
  id: string;
  label: string;
  headline: string;
  body: string;
  cta: string;
  href: string;
  points: string[];
};

export const services: Service[] = [
  {
    id: "ai-seo",
    label: "AI SEO",
    headline: "Your buyers are asking questions. Make sure you are part of the answer.",
    body: "Search has changed. Buyers research across Google, ChatGPT, Perplexity, Gemini and AI Overviews. We make your business easier to discover, easier to understand and easier to trust wherever that research starts.",
    cta: "Explore AI SEO",
    href: "/ai-seo",
    points: [
      "Technical foundations: crawlability, indexation, Core Web Vitals",
      "Entity and schema signals AI systems can verify",
      "Source-worthy, answer-first content for real buyer queries",
      "Citation tracking across every AI platform that matters",
    ],
  },
  {
    id: "google-ads",
    label: "Google Ads",
    headline: "Google Ads should create customers. Not a very expensive habit.",
    body: "If cost per lead keeps rising or branded traffic eats the budget, you need tighter intent mapping, better tracking and weekly decisions based on what is actually making money — not another round of random optimisations.",
    cta: "Explore Google Ads",
    href: "/contact",
    points: [
      "Intent mapping before budget, not after",
      "Conversion tracking tied to qualified leads, not form fills",
      "Branded vs non-branded spend split and defended",
      "Weekly decisions logged with the reasoning",
    ],
  },
  {
    id: "meta-ads",
    label: "Meta Ads",
    headline: "Stop paying for attention your sales team cannot use.",
    body: "Meta can build demand before someone knows what to search for. We combine clear ICP targeting, creative testing and real sales feedback so the platform learns what a valuable prospect looks like — not just what gets a quick click.",
    cta: "Explore Meta Ads",
    href: "/contact",
    points: [
      "ICP defined with sales before the first campaign",
      "Structured creative testing with a documented hypothesis",
      "Offline conversion feedback piped back to the platform",
      "Demand capture path behind every demand-gen campaign",
    ],
  },
  {
    id: "chatgpt-ads",
    label: "ChatGPT Ads",
    headline: "Your next customer may ask ChatGPT before they ask Google.",
    body: "Buyers use AI to research problems and shortlist options before they ever fill out a form. We help you build a practical plan for that shift, with clear measurement and a conversion path behind it. No science-fiction promises.",
    cta: "Explore ChatGPT Ads",
    href: "/contact",
    points: [
      "A test plan sized to your risk appetite, not the hype cycle",
      "Measurement defined before a cent is spent",
      "Landing experience built for AI-referred intent",
      "An honest read on whether the channel is worth it yet",
    ],
  },
];

export type CaseStudy = {
  id: string;
  tags: string[];
  /** Full byline. `client`, `services` and `market` are the same three parts
      split out so the index table can set them separately. */
  meta: string;
  client: string;
  services: string;
  market: string;
  metric: string;
  metricLabel: string;
  title: string;
  problem: string;
  fixes: string[];
  result: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "accounting",
    tags: ["ai-seo", "seo"],
    meta: "Outsourced accounting and bookkeeping · Technical SEO + AI SEO · Australia and Canada",
    client: "Outsourced accounting and bookkeeping",
    services: "Technical SEO + AI SEO",
    market: "Australia and Canada",
    metric: "<5",
    metricLabel: "months to first AI citation",
    title: "A site search engines could barely crawl, and no presence in any AI answer.",
    problem:
      "Pages were not indexed. Internal linking did not exist. The business was completely absent from every AI search tool its buyers were using to find providers.",
    fixes: [
      "Crawlability and indexation gaps closed across all service pages",
      "Internal linking architecture joining service, location and supporting content",
      "Organisation and Service schema so AI systems could trust the entity",
      "Comparison content targeting the exact queries buyers type into ChatGPT and Gemini",
      "Regional credibility signals for the Australian and Canadian markets",
    ],
    result:
      "Result: first AI citation in under five months, and roughly 25% more inbound enquiries once visibility was established.",
  },
  {
    id: "ecommerce",
    tags: ["seo"],
    meta: "Home and housing e-commerce · Collection page SEO · US and Australia",
    client: "Home and housing e-commerce",
    services: "Collection page SEO",
    market: "US and Australia",
    metric: "18%",
    metricLabel: "year-on-year revenue growth",
    title: "Collection pages live for years, contributing almost nothing to organic traffic.",
    problem:
      "Faceted navigation created duplicate URLs with no canonical handling, no internal linking connected editorial to commercial pages, and keyword cannibalization suppressed every collection page at once.",
    fixes: [
      "Collection page content rebuilt around commercial buyer intent",
      "Canonical tags implemented across all filtered URL variants",
      "Internal linking matrix from editorial content to collection pages",
      "Full cannibalization audit with page consolidation and redirects",
      "Breadcrumb and Product Collection schema added",
    ],
    result:
      "Result: 18% year-on-year revenue growth, with sessions trending from 28,000 to 57,000 per month over twelve months.",
  },
  {
    id: "healthcare",
    tags: ["ai-seo", "seo", "ads"],
    meta: "On-demand home healthcare · Technical SEO + AI SEO + Google Ads · Dubai, UAE",
    client: "On-demand home healthcare",
    services: "Technical SEO + AI SEO + Google Ads",
    market: "Dubai, UAE",
    metric: "726k",
    metricLabel: "impressions in six months",
    title: "Average position 13.1. Page two on every term that mattered.",
    problem:
      "726,000 impressions in six months but a 0.5% click-through rate. No medical schema, no structured credential signals, and no content built for how Google constructs AI Overview recommendations.",
    fixes: [
      "MedicalBusiness, Physician and LocalBusiness schema implemented",
      "DHA licensing and doctor credentials structured and citable in page content",
      "Answer-first content built around AI Overview query structures",
      "Technical crawl issues resolved and Core Web Vitals improved for mobile-first Dubai traffic",
      "Google Ads running in parallel to capture demand while organic authority built",
    ],
    result:
      "Result: first recommendation in the Google AI Overview for the category's highest-value query, on an unbroken upward trajectory since month one.",
  },
];

export const metrics = [
  {
    value: "~25%",
    title: "More inbound enquiries",
    body: "AI SEO clients, after citation visibility was established in ChatGPT, Gemini and Google AI Overviews.",
    tone: "paper" as const,
  },
  {
    value: "18%",
    title: "Year-on-year revenue growth",
    body: "Home and housing e-commerce brand. 12-month organic SEO engagement, US market.",
    tone: "signal" as const,
  },
  {
    value: "7+",
    title: "Businesses now cited in AI search",
    body: "Appearing in ChatGPT, Gemini, Perplexity and Google AI Overviews for high-intent queries in their category.",
    tone: "paper" as const,
  },
  {
    value: "<5 mo",
    title: "To first AI citation",
    body: "From technical overhaul to first AI citation. Outsourced professional services brand, Australia and Canada.",
    tone: "ink" as const,
  },
];

export const statRail = [
  { value: 40, suffix: "+", label: "Projects delivered" },
  { value: 7, suffix: "+", label: "AI SEO engagements", accent: true },
  { value: 25, prefix: "~", suffix: "%", label: "Average enquiry increase" },
  { value: 5, prefix: "<", suffix: " mo", label: "To first AI citation" },
];

export const principles = [
  {
    key: "A",
    title: "One definition of a good lead. Before anyone starts spending.",
    body: "Marketing and sales agree on what a qualified lead looks like before the work starts. No debating the scorecard after the fact.",
  },
  {
    key: "B",
    title: "The person who shaped the strategy stays in the room.",
    body: "No polished sales call followed by a mystery hand-off. Senior people stay close enough to defend the trade-offs and make the next decision with you.",
  },
  {
    key: "C",
    title: "Every test leaves a paper trail.",
    body: "We log the hypothesis, the result and the next action. Failed tests are useful too, especially when they stop you repeating a bad assumption next quarter.",
  },
  {
    key: "D",
    title: "The source data stays yours.",
    body: "Your accounts, your analytics, your CRM. Reporting should make the truth easier to see, not lock it inside somebody else's slide deck.",
  },
];

export const process = [
  {
    n: "01",
    when: "Weeks 1–2",
    title: "Discovery and audit",
    body: "We look at your past campaigns and reporting before touching anything.",
  },
  {
    n: "02",
    when: "Week 3",
    title: "Plan and baseline",
    body: "A written plan with agreed outcomes and a realistic first-phase scope.",
  },
  {
    n: "03",
    when: "Weeks 4–6",
    title: "Build and launch",
    body: "Campaigns and content go live in stages. When something moves, we know why.",
  },
  {
    n: "04",
    when: "Ongoing",
    title: "Optimise",
    body: "We test, cut what is not working and build on what is. Every decision is logged.",
  },
  {
    n: "05",
    when: "Quarterly",
    title: "Review and re-plan",
    body: "We step back, look at outcomes and decide what scales, what stops, what changes.",
  },
];

export const platforms = [
  "ChatGPT",
  "Google AI Overviews",
  "Perplexity",
  "Gemini",
  "Copilot",
  "Google Search",
];

export const navLinks = [
  { href: "/ai-seo", label: "AI SEO" },
  { href: "/work", label: "Work" },
  { href: "/#approach", label: "Approach" },
  { href: "/#process", label: "Process" },
];
