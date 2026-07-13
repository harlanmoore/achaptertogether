# A Chapter Together — Site Rework

## What changed and why

The site is being repositioned from a **reading service** to a **companionship service that uses reading (and other tools) as delivery methods**. The single biggest change is the buyer: every page is now written to the **adult child** who worries about their aging parent, not to the senior. Reading is a *how*, not a *what*.

### The core reframe

| Before | After |
|---|---|
| "Virtual reading companion for seniors" | "Companionship for lonely seniors — so your mom has someone to talk to" |
| Reading is the top-level service | Reading is one of four service pages under a companionship umbrella |
| Meditation is a peer service | Meditation is a coping tool for loneliness/grief (kept, but subordinate) |
| Homepage speaks to seniors | Homepage speaks to adult children (the buyer) |
| Articles mix audiences | Articles segmented by intent: caregiver-facing vs. senior-facing |

### New information architecture

```
Home (index.html) — Companionship, human connection [umbrella]
├─ Reading sessions (reading-sessions.html) — signature service
├─ Companionship visits — same as home, conversation-only variant
├─ Grief support (grief-support.html)
└─ Meditation for loneliness (meditation-coaching.html)

Resources hub (resources.html)
├─ Caregiver-facing (buyer intent)
│  ├─ How to help a lonely parent  ✅ REBUILT
│  ├─ Signs your parent is lonely
│  ├─ What to talk about with your elderly parent
│  └─ Activities for seniors who live alone
├─ Research / general
│  ├─ Senior loneliness (research)
│  ├─ Overcoming loneliness
│  ├─ Senior resources
│  └─ Books to read aloud to seniors
└─ Meditation guides (as coping tools)
   ├─ Meditation for grief
   ├─ Meditation for anxiety
   ├─ Meditation for sleep
   ├─ Meditation for seniors
   ├─ Meditation for beginners
   └─ How to start meditating
```

## What's built in this drop

Ready-to-deploy files:

| File | What it is |
|---|---|
| `shared.css` | Full design system. Palette, type, components, responsive. Import once, use everywhere. |
| `index.html` | New homepage — companionship umbrella, speaks to adult children |
| `reading-sessions.html` | Reading sessions as a deep-dive service page |
| `how-to-help-lonely-parent.html` | Sample article rewrite in the new voice — the template for all other article rewrites |
| `sitemap.xml` | Updated with new URL structure and priorities |
| `robots.txt` | Standard, points to sitemap |

## Design system at a glance

- **Palette:** deep sage `#2C4A3E` (primary) · warm ivory `#FBFAF7` (bg) · muted terra rose `#B87968` (accent) · ink `#1A2620` · warm beige `#F5EFE0` (grief pages)
- **Type:** Fraunces (display serif, warm literary) + Inter (body). Both loaded via Google Fonts in `shared.css`.
- **Signature element:** "chapter mark" eyebrows — a hairline rule + small-caps label above section headings, evoking the pause between book chapters
- **Body text 18px** by default for older readers; hero body 20px
- **Accessibility built in:** keyboard focus rings, reduced-motion respect, 68-character max line length on prose, WCAG-friendly contrast

## SEO improvements baked into every page

1. **Unique title tags** in the format `Page Topic | A Chapter Together` (or reverse for homepage)
2. **Unique meta descriptions** written to the adult child buyer intent
3. **Canonical URLs** on every page
4. **Open Graph + Twitter cards** for social sharing
5. **JSON-LD schema** on every page:
   - `Organization` on homepage
   - `Service` on each service page
   - `Article` + `BreadcrumbList` on each article
   - `FAQPage` where FAQs exist
6. **The canonical "what we are" sentence** appears prominently on homepage, About, and every service page. This is the single most important sentence for AI search citations (ChatGPT, Claude, Perplexity):

   > "A Chapter Together is an online companionship service that pairs older adults with warm, screened companions for one-on-one video visits. Sessions combine conversation, storytelling, and shared reading to reduce loneliness and create meaningful social connection."

7. **Internal linking pattern** — every page footer + every article closes with 2–3 contextual links: one to a service page, one to a related article, one to a resource
8. **Sitemap prioritization** favors buyer-intent pages (home, service pages, caregiver articles) over general educational content

## What's needed to reach parity with the existing site

The pages below still need to be rebuilt in the new style. Because `shared.css` is the design system, each of these is now a mostly copy-paste job with content changes — much faster than the first round.

### Service pages (high priority)
- [ ] `grief-support.html` — use warm beige palette, existing content likely needs voice pass
- [ ] `meditation-coaching.html` — reposition as coping tool, keep Harlan's 15-year practice as the authority anchor
- [ ] `about.html` — founder story leading with the "why", meditation practice as credibility signal

### Resources hub
- [ ] `resources.html` — hub page listing all articles grouped by intent (caregiver / research / meditation)

### Caregiver-intent articles (buyer-facing; highest SEO value)
- [ ] `signs-of-loneliness-elderly-parents.html`
- [ ] `what-to-talk-about-with-elderly-parent.html`
- [ ] `activities-for-seniors-who-live-alone.html`

### Research / general articles
- [ ] `senior-loneliness.html`
- [ ] `overcoming-loneliness.html`
- [ ] `senior-resources.html`
- [ ] `books-to-read-aloud-to-seniors.html`

### Meditation articles (as coping tools)
- [ ] `meditation-for-seniors.html`
- [ ] `meditation-for-grief.html`
- [ ] `meditation-for-anxiety.html`
- [ ] `meditation-for-sleep.html`
- [ ] `meditation-for-beginners-seniors.html`
- [ ] `how-to-start-meditating.html`

### Utility
- [ ] `privacy.html` — should reflect the family-data-handling promise as a trust feature
- [ ] `thanks.html` — Formspree confirmation destination
- [ ] `favicon.svg` and `og-image.jpg` — placeholders referenced in `<head>`
- [ ] Replace `G-XXXXXXXXXX` in `index.html` and other pages with the real Google Analytics ID
- [ ] Replace `YOUR_PIXEL_ID` with the real Meta Pixel ID
- [ ] Replace `YOUR_FORM_ID` with the real Formspree form ID

## Template pattern for all remaining pages

Every page follows this scaffold. Copy `reading-sessions.html` or `how-to-help-lonely-parent.html` as a starting point.

```
<head>
  - unique <title>
  - unique <meta description> (to the adult child)
  - <link rel="canonical">
  - Open Graph + Twitter meta
  - <link rel="stylesheet" href="shared.css">
  - JSON-LD schema (Organization for home; Service for service pages; Article + BreadcrumbList for articles; FAQPage where applicable)
</head>

<body>
  <div class="nav-outer"> ... shared nav with current class on active link ... </div>

  <section class="hero">
    <span class="hero-eyebrow">Section eyebrow</span>
    <h1>One clear promise</h1>
    <p class="hero-lede">One paragraph of what and why</p>
    <div class="hero-actions"> primary CTA + secondary </div>
  </section>

  ... sections built from .grid, .card, .feature, .quote, .price-band, .faq-item ...

  <footer> ... shared footer ... </footer>
</body>
```

## Copy voice guide (short)

- **Write to the daughter, not the mother.** Even senior-facing articles benefit from imagining she'll be reading it too.
- **Say the emotional thing first, then the practical thing.** Not "Our service provides weekly companionship." Instead: "Your mom deserves someone to talk to. Every week."
- **Cut adjectives. Keep verbs.** "Warm, screened companion" is the maximum adjective density. Never more than two before a noun.
- **Contractions are fine.** They soften. "It's" not "It is."
- **Concrete over abstract.** "A Sunday call with a specific grandchild" beats "regular family engagement."
- **Never sell. Show.** Testimonials do the selling. The site's job is to be honest and warm.
- **Keep line length short.** Use `<p>` breaks freely. Reading on screen is not reading in print.

## Deployment notes

Same stack as the current site: static HTML on GitHub → Netlify. No build step required. Just replace files, commit, push. Netlify will auto-deploy.

Before going live:
1. Search-and-replace analytics/pixel/form IDs
2. Verify all `<a href>` targets in the nav dropdown match actual file names
3. Run `Google Search Console` after deploy — resubmit `sitemap.xml`
4. Set up a 301 redirect if any URLs are changing (in `netlify.toml`)

## Copy checklist for the canonical "what we are" sentence

This sentence should appear on:
- ✅ Homepage — first section after hero
- Every service page — early in the body copy
- About page — as the mission statement
- Meta description of homepage (shortened form)
- JSON-LD `description` field of the Organization schema

Consistency here is what makes the site AI-search-quotable. Same sentence, same words, everywhere it matters.
