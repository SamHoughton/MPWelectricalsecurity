# MPW Electrical Security — Website Documentation

A professional, SEO-optimised static website for **MPW Electrical Security**, a UK-based security installation company based in Newton-le-Willows, Merseyside. The site serves as the company's primary digital presence and lead-generation platform, covering automated gates, CCTV, alarm systems, access control, security lighting, and gate servicing across the North West of England.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Colour Palette](#colour-palette)
4. [Fonts](#fonts)
5. [Directory Structure](#directory-structure)
6. [Pages](#pages)
7. [Key Features](#key-features)
8. [JavaScript Architecture](#javascript-architecture)
9. [CSS Design System](#css-design-system)
10. [SEO & Schema Markup](#seo--schema-markup)
11. [Forms & Integrations](#forms--integrations)
12. [Configuration Files](#configuration-files)
13. [Brand Partners](#brand-partners)
14. [Company Details](#company-details)
15. [How to Make Common Changes](#how-to-make-common-changes)
16. [How the Gate Animation Works](#how-the-gate-animation-works)
17. [How the Quote Tool Configurator Works](#how-the-quote-tool-configurator-works)
18. [Development Notes](#development-notes)
19. [Git Workflow](#git-workflow)
20. [Known Issues](#known-issues)
21. [site.webmanifest Reference](#sitewebmanifest-reference)

---

## Project Overview

MPW Electrical Security installs bespoke automated security systems for residential and commercial clients across Wigan, St Helens, Newton-le-Willows, and the wider North West. This website:

- Showcases six core services with dedicated, SEO-rich pages
- Displays a filterable portfolio of completed installations
- Provides an interactive cost-estimator quote tool
- Captures leads via a Netlify-powered contact form
- Targets local search via hyper-local location pages (Wigan, St Helens, Newton-le-Willows)
- Implements structured data (Schema.org) to enhance Google rich snippets

The site is entirely static — no server-side language, no build step — making it fast, cheap to host, and easy to maintain.

**Live URL:** `https://www.mpwelectricalsecurity.com`

The site is deployed via **Netlify**. Any push to the `master` branch on GitHub automatically triggers a new deployment. There is no build step — Netlify serves the HTML files directly.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic) |
| Styling | CSS3 with custom properties + Bootstrap 5.3.2 (CDN) |
| Scripting | Vanilla JavaScript ES6+ (no jQuery, no frameworks) |
| Icons | Font Awesome 6.5.0 (CDN) |
| Fonts | Google Fonts — Inter (body), Rajdhani (headings) |
| Analytics | Google Analytics 4 (GA4) — Property ID: `G-H4FW36QNJ8` |
| Forms | Netlify Forms (serverless form handling) |
| Hosting | Static hosting (Netlify) |
| Version Control | Git |

Everything is served from CDN links or local files — no npm, no build process, no node_modules.

---

## Colour Palette

| Name | Hex | Used for |
|---|---|---|
| Gold (primary brand colour) | `#CC8400` | Buttons, headings, accents, borders |
| Gold light | `#e8a000` | Hover states, lighter accents |
| Gold dark | `#a36900` | Button hover backgrounds |
| Dark (page background) | `#0a0a0a` | Main page background |
| Dark mid | `#141414` | Alternate dark sections |
| Surface | `#1e1e1e` | Cards, form backgrounds |
| Background light | `#1a1a1a` | Input backgrounds, subtle section backgrounds |
| Background section | `#131313` | Alternating section backgrounds |
| Text (main) | `#e0e0e0` | Body copy |
| Text light | `#999` | Secondary text, captions |
| Text muted | `#888` | Least important text |
| White | `#ffffff` | Text on gold backgrounds |
| Border | `#2a2a2a` | Card borders, dividers |

All colours are defined as CSS custom properties (variables) in `css/style.css` under `:root`.

---

## Fonts

Both fonts are loaded via Google Fonts with a `preconnect` hint to improve load speed:

- **Inter** — used for all body text, paragraphs, form labels, and inputs
- **Rajdhani** — used for headings (h1–h6), navigation links, buttons, stat numbers, section tags, and badges

---

## Directory Structure

```
MPWelectricalsecurity/
│
├── index.html                  # Homepage — hero, services overview, portfolio, testimonials, contact
├── quote.html                  # Interactive cost-estimator / quote wizard
│
├── automated-gates.html        # Service page — automated gate installation
├── cctv-installation.html      # Service page — CCTV camera systems
├── alarm-systems.html          # Service page — intruder alarm systems
├── access-control.html         # Service page — access control & video intercoms
├── security-lighting.html      # Service page — security & external lighting
├── gate-servicing.html         # Service page — gate repair & maintenance
│
├── wigan.html                  # Location page — Wigan & surrounding WN postcodes
├── st-helens.html              # Location page — St Helens & surrounding WA postcodes
├── newton-le-willows.html      # Location page — Newton-le-Willows (company HQ area)
│
├── google03b767954523f455.html # Google Search Console domain ownership verification
├── robots.txt                  # Tells Google which pages to crawl
├── sitemap.xml                 # List of all pages for Google to index
├── site.webmanifest            # Web app manifest (icon, colours for mobile)
├── youtube.html                # (Minor/placeholder page — not linked in main nav)
│
├── css/
│   └── style.css               # Entire site stylesheet — dark theme, design tokens, components
│
├── js/
│   └── main.js                 # All site JavaScript — UI interactions, animations, form handling
│
├── img/
│   ├── logo.png                # MPW logo — used in header, footer, gate animation
│   ├── edit.png                # Hero section image (gate graphic)
│   ├── aboutusgate.jpg         # About section photo / OG image for social sharing
│   ├── favicon-16x16.png       # Browser tab icon (small)
│   ├── favicon-32x32.png       # Browser tab icon (standard)
│   ├── brands/                 # SVG logos for the scrolling brands bar
│   │   ├── came.svg            # CAME gate motors
│   │   ├── bft.svg             # BFT gate motors
│   │   ├── faac.svg            # FAAC gate motors
│   │   ├── hikvision.svg       # Hikvision CCTV
│   │   ├── dahua.svg           # Dahua CCTV
│   │   ├── texecom.svg         # Texecom alarms
│   │   ├── paxton.svg          # Paxton access control
│   │   └── videx.svg           # Videx intercoms
│   └── portfolio/              # Portfolio photos shown in the gallery section
│       ├── gate.jpg            # Classic black automatic driveway gate
│       ├── gate2.jpg           # Residential sliding gate
│       ├── gate3.jpg           # Wrought iron swing gates
│       ├── gate4.jpg           # Timber bi-folding gates
│       ├── gate5.jpg           # Driveway security gates with CCTV
│       ├── gate6.jpg           # Commercial security gates
│       ├── gate8.jpg           # Remote access driveway gates
│       ├── gate9.jpg           # Electric double swing gates
│       ├── newgate.jpg         # New installation
│       ├── 1newgate.jpg        # Bespoke automatic gate
│       ├── 2newgate.jpg        # Electric gate
│       ├── 3newgate.jpg        # Automated entry gate
│       ├── barrier1.jpg        # Car park entry barrier
│       ├── barrier2.jpg        # Automated car park barrier
│       ├── barrier3.jpg        # Height restriction barrier
│       ├── light.jpg           # Garden security lighting
│       ├── 1lighting.jpg       # Outdoor security lighting
│       ├── 1security.jpg       # CCTV installation
│       ├── 2security.jpg       # Bespoke security system
│       └── ringproducts.jpg    # Ring doorbell and camera products
│
└── .git/                       # Git repository metadata
```

---

## Pages

### Homepage (`index.html`)
The main entry point. Contains:
- **Hero section** — animated particle background, headline, CTA buttons, phone link
- **Services grid** — cards linking to each service page
- **About section** — company story and gate photo
- **Portfolio gallery** — filterable grid with lightbox viewer
- **Brand partners** — logos of 8 trusted security brands
- **Stats counter** — animated numbers (e.g. 250+ installations)
- **Testimonials** — customer review cards
- **Contact form** — Netlify Forms integration with client-side validation
- **Footer** — address, links, social/contact details

### Quote Tool (`quote.html`)
A multi-step interactive estimator that collects gate type, CCTV camera quantity, access control type, property type, and contact details. Produces a ballpark price range and prompts the user to book a free site visit.

### Service Pages (6 pages)
Each service page is a standalone, SEO-optimised document with:
- Targeted `<title>`, `<meta description>`, and `<meta keywords>` for that service
- Schema.org `Service` + `FAQPage` + `BreadcrumbList` JSON-LD structured data
- Detailed service description and benefits list
- 4–5 FAQs answering common customer questions
- CTA section linking back to the contact form on the homepage

| File | Service |
|---|---|
| `automated-gates.html` | Sliding, swing, and bi-folding gate installation |
| `cctv-installation.html` | HD CCTV cameras, night vision, remote viewing |
| `alarm-systems.html` | Intruder alarms, monitored systems, smart alarms |
| `access-control.html` | Video intercoms, keypads, fob entry, ANPR |
| `security-lighting.html` | PIR floodlights, dusk-to-dawn, garden/driveway lighting |
| `gate-servicing.html` | Gate repair, servicing, emergency callouts |

### Location Pages (3 pages)
Hyper-local landing pages optimised for "near me" and area-specific searches:

| File | Coverage |
|---|---|
| `wigan.html` | WN1–WN8 postcodes |
| `st-helens.html` | WA9–WA11 postcodes |
| `newton-le-willows.html` | WA12 postcodes (company home base) |

Each location page includes local business schema, postcode coverage details, response time promises, local FAQs, and an emergency callout section.

---

## Key Features

### Animated Hero with Particles
The homepage hero generates floating gold particles dynamically via JavaScript. On mobile (< 768 px) 12 particles are created; on desktop, 22. Each particle has randomised size (3–9 px), horizontal position, animation duration (10–22 s), and start delay (0–15 s), creating a natural, non-repetitive effect.

### Sticky Transparent Header
The navigation bar is fixed to the top. When the user scrolls past 80 px it gains a darker, more opaque background (`scrolled` class) via a passive scroll listener, ensuring the navbar is always readable without obscuring content on first load.

### Mobile Slide-In Navigation
On screens ≤ 991 px the nav collapses into a slide-in drawer from the right. A semi-transparent overlay covers the page content. The hamburger icon animates into an X. The drawer and overlay close on: overlay click, Esc key, or any nav link click.

### Services Mega-Dropdown
The "Services" nav item uses `aria-haspopup` and `aria-expanded` for accessible keyboard and screen-reader support. On desktop it opens on hover (CSS); on mobile it toggles open/closed on tap (JavaScript) without navigating away.

### Scroll-Reveal Animations
Three CSS classes — `.reveal-up`, `.reveal-left`, `.reveal-right` — are observed by an `IntersectionObserver` (12% threshold). When an element enters the viewport the `visible` class is added, triggering a CSS transition. Each element is unobserved after first reveal to avoid re-triggering.

### Animated Stats Counter
When `.stat-number` elements scroll into view (40% threshold), a `setInterval` increments a counter from 0 to the target value (stored in `data-target`) over 1,800 ms in 16 ms steps. The animation runs once per page load.

### Portfolio Filter + Lightbox
The portfolio grid supports category filtering (`all`, `gates`, `barriers`, `lighting`, `security`). Clicking a filter button toggles `.hidden` on non-matching items. Clicking any portfolio image opens a full-screen lightbox with:
- Prev/Next navigation buttons
- Keyboard arrow key navigation
- Touch swipe support (horizontal swipe ≥ 40 px)
- Esc key to close
- Click-outside-image to close

### Client-Side Contact Form Validation
Before submission, the JavaScript validates:
- Name (non-empty)
- Email (non-empty + regex pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- Message (non-empty)

Invalid fields receive the `.invalid` CSS class and an inline `<span role="alert">` error message. The page smoothly scrolls to the first invalid field. Errors are cleared live as the user types.

### Netlify Forms Integration
The contact form uses `data-netlify="true"` and submits via `fetch()` to `/` with `application/x-www-form-urlencoded` encoding. On success a green success banner fades in for 7 seconds. On network failure a red error banner appears.

### Mobile CTA Bar
A fixed bottom bar with phone and WhatsApp buttons appears on mobile. It automatically hides when the contact section scrolls into view (20% threshold via `IntersectionObserver`) to avoid overlapping the form.

### Back-to-Top Button
A button with `id="backToTop"` becomes visible (`.visible` class) when `scrollY > 400`. Clicking it smooth-scrolls to the top.

### Auto-Updated Copyright Year
`document.getElementById('year').textContent = new Date().getFullYear()` keeps the footer copyright year current without manual edits.

---

## JavaScript Architecture

**File:** `js/main.js`
**Style:** Vanilla ES6+, `'use strict'`, no external dependencies

The script is structured as self-contained sections in execution order:

```
1.  Preloader fade-out                (window 'load' event)
2.  Hero particles                    (runs immediately on parse)
3.  Sticky header                     (passive scroll listener)
4.  Mobile navigation                 (toggle, overlay, Esc key)
5.  Services dropdown (mobile)        (click → toggle, aria-expanded)
6.  Smooth scroll                     (click on anchor links)
7.  Active nav highlight              (IntersectionObserver, sections)
8.  Scroll reveal                     (IntersectionObserver, .reveal-* elements)
9.  Stats counter                     (IntersectionObserver, .stat-number)
10. Portfolio filter                  (click → toggle .hidden)
11. Lightbox                          (open/close/navigate + swipe + keyboard)
12. Contact form validation & submit  (fetch() to Netlify)
13. Mobile CTA bar                    (IntersectionObserver, contact section)
14. Back-to-top button                (scroll listener)
15. Footer year                       (Date().getFullYear())
```

All scroll and intersection listeners use `{ passive: true }` where applicable to avoid blocking the main thread.

---

## CSS Design System

**File:** `css/style.css`
**Approach:** CSS custom properties (variables) for all design tokens; mobile-first responsive layout; BEM-inspired naming.

### Design Tokens (`:root`)

| Variable | Value | Purpose |
|---|---|---|
| `--gold` | `#CC8400` | Primary brand / accent colour |
| `--gold-light` | `#e8a000` | Lighter gold for hover states |
| `--gold-dark` | `#a36900` | Darker gold for pressed/hover states |
| `--dark` | `#0a0a0a` | Page background |
| `--dark-mid` | `#141414` | Slightly lighter background layer |
| `--text` | `#e0e0e0` | Body text colour |
| `--text-light` | `#999` | Muted text (labels, captions) |
| `--bg-light` | `#1a1a1a` | Card / section background |
| `--bg-section` | `#131313` | Alternating section background |
| `--surface` | `#1e1e1e` | Elevated surface (inputs, cards) |
| `--border` | `#2a2a2a` | Subtle border colour |
| `--shadow-sm/md/lg` | RGBA | Box-shadow values at three scales |
| `--radius` | `12px` | Standard border radius |
| `--radius-lg` | `20px` | Larger border radius (cards) |
| `--transition` | `all .35s ease` | Default CSS transition |
| `--font-body` | `Inter` | Body font stack |
| `--font-head` | `Rajdhani` | Heading font stack |

### Component Inventory
- **Buttons** — `.btn-gold`, `.btn-outline-hero`, `.btn-outline-gold` with `focus-visible` outlines for keyboard accessibility
- **Header** — fixed with `backdrop-filter: blur`, compact on scroll
- **Hamburger** — three-line icon that animates to an X
- **Hero** — full-viewport gradient, floating image, animated SVG wave transition
- **Services grid** — hover-lift cards with gold accent icons
- **Portfolio** — masonry-style grid with hover overlay and lightbox
- **Stats** — large number display with gold underline accent
- **Testimonials** — quote-card carousel layout
- **Contact form** — dark inputs with gold focus rings and inline validation states
- **Lightbox** — full-screen overlay with prev/next controls
- **Mobile CTA bar** — fixed bottom, phone + WhatsApp buttons
- **Back-to-top** — fixed bottom-right, fade-in on scroll
- **Footer** — multi-column dark layout

---

## SEO & Schema Markup

Every page includes:

### Meta Tags
- `<title>` — unique per page, includes service + location keywords
- `<meta name="description">` — 150–160 character unique description
- `<meta name="keywords">` — relevant keyword list
- `<meta name="robots" content="index, follow">`
- `<meta name="author" content="MPW Electrical Security">`
- `<link rel="canonical">` — prevents duplicate-content issues

### Geo Tags
```html
<meta name="geo.region" content="GB-ENG">
<meta name="geo.placename" content="Newton-le-Willows, North West England">
<meta name="geo.position" content="53.4533;-2.6215">
<meta name="ICBM" content="53.4533, -2.6215">
```

### Open Graph (Facebook / LinkedIn)
Full `og:` tags including `og:type`, `og:url`, `og:title`, `og:description`, `og:image` (1200×630 gate photo), `og:locale` (`en_GB`).

### Twitter / X Card
`twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` — enables rich previews when links are shared.

### Schema.org JSON-LD
The homepage includes:
- **LocalBusiness** — name, address, phone, email, coordinates, opening hours, social profiles, rating, and full service catalogue
- **FAQPage** — marks up the FAQ section so questions can appear directly in Google search results

Each service page includes:
- **Service** — service name, provider (LocalBusiness), area served
- **FAQPage** — 4–5 questions with `acceptedAnswer` objects
- **BreadcrumbList** — structured navigation path

Each location page includes:
- **LocalBusiness** — with `areaServed` set to the specific town/postcode zone

### Sitemap
`sitemap.xml` lists all URLs that Google should index. Use priority `1.0` for the homepage, `0.8` for service pages, `0.7` for location pages, `0.6` for the quote tool.

### robots.txt
Allows all search engine bots to crawl everything and points them to the sitemap URL.

### Google Search Console
The file `google03b767954523f455.html` at the root verifies that MPW owns the domain. **Do not delete or rename this file.** The homepage also has a `<meta name="google-site-verification">` tag as a backup.

---

## Forms & Integrations

### Contact Form (Homepage)
- **Element:** `<form id="contactForm" data-netlify="true">`
- **Fields:** Name, Email, Phone (optional), Message, Service interest (select)
- **Validation:** Client-side JS before submission
- **Submission:** `fetch()` POST to `/` (Netlify intercepts on their CDN)
- **Feedback:** Green success banner (7 s) or red error banner (7 s)

### Quote Tool (`quote.html`)
- Standalone form collecting gate type, CCTV count, extra services, property type, and contact details
- Styled independently with a gradient hero section
- Submits via Netlify Forms

### Viewing Form Submissions
Log in to Netlify → select the site → **Forms** tab. All contact form and quote estimate submissions appear here. You can also set up email notifications so Matt is emailed instantly for each submission.

### Google Analytics 4
Loaded asynchronously. Tracking ID: `G-H4FW36QNJ8`.

| Event name | Where fired | Data sent |
|---|---|---|
| `quote_complete` | When the quote tool result panel is shown | `event_category: 'Quote Tool'`, system type, average price |
| `quote_form_submit` | When the quote estimate form is submitted successfully | `event_category: 'Quote Tool'` |

---

## Configuration Files

### `sitemap.xml`
XML sitemap listing all public pages with:
- `<loc>` — absolute URL
- `<lastmod>` — last modification date
- `<changefreq>` — crawl frequency hint (`monthly`)
- `<priority>` — relative importance (homepage = `1.0`, services = `0.8`, locations = `0.7`, quote = `0.6`)

### `robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://www.mpwelectricalsecurity.com/sitemap.xml
```

### `site.webmanifest`
Progressive Web App manifest enabling "Add to Home Screen" on Android/iOS.

### `google03b767954523f455.html`
Google Search Console domain verification file. Must remain at the root of the domain. **Do not delete.**

---

## Brand Partners

| Brand | Category |
|---|---|
| CAME | Gate automation motors |
| BFT | Gate automation motors |
| FAAC | Gate automation motors |
| Hikvision | CCTV cameras and NVR systems |
| Dahua | CCTV cameras and NVR systems |
| Paxton | Access control (intercoms, fobs) |
| Texecom | Intruder alarm panels |
| Videx | Video intercom systems |

Brand SVG logos are stored in `img/brands/` and displayed in a scrolling partner bar on the homepage.

---

## Company Details

| Field | Value |
|---|---|
| Company Name | MPW Electrical Security |
| Owner | Matt |
| Address | 90 Park Road South, Newton-le-Willows, WA12 8PL |
| Phone | 07434 001222 |
| WhatsApp | https://wa.me/447434001222 |
| Email | Matt@mpwelectricalsecurity.com |
| Coverage | Wigan, St Helens, Newton-le-Willows, North West England |
| Installations | 250+ completed |

---

## How to Make Common Changes

### Adding New Portfolio Photos

1. Save the photo file to `img/portfolio/` — use a descriptive filename like `gate10.jpg`
2. Open `index.html` and find the `<!-- ======= Portfolio Section ======= -->` comment (around line 592)
3. Copy one of the existing `<div class="portfolio-item" ...>` blocks and paste it inside the `<div class="portfolio-grid" id="portfolioGrid">` container
4. Update these values:
   - `data-category` — must be one of: `gate`, `barrier`, `lighting`, `security`
   - `<img src="img/portfolio/yourfile.jpg"` — the photo path
   - `alt="..."` — a descriptive description for accessibility and Google Images
   - `<h5>Your Title</h5>` — the title shown on hover
   - `<p>Short description</p>` — the subtitle shown on hover
   - `data-src="img/portfolio/yourfile.jpg"` on the zoom button — same path as the img src
   - `data-title="Your Title"` on the zoom button — same as the h5 text

**Example block to copy and edit:**
```html
<div class="portfolio-item" data-category="gate">
  <div class="portfolio-wrap">
    <img src="img/portfolio/gate10.jpg" alt="Description for Google Images" loading="lazy">
    <div class="portfolio-overlay">
      <h5>Your Title Here</h5>
      <p>Short subtitle or description</p>
      <button class="portfolio-zoom-btn" data-src="img/portfolio/gate10.jpg" data-title="Your Title Here">
        <i class="fas fa-expand"></i>
      </button>
    </div>
  </div>
</div>
```

The JavaScript filter system (`js/main.js`) automatically reads the `data-category` attribute, so the filter buttons will work without any further changes.

---

### Updating Contact Information

Matt's contact details appear in multiple places. If the phone number, email, or address changes, update **all** of the following locations:

**Phone number `07434 001222` / `+447434001222`:**
- `index.html` — hero section, contact section, footer, mobile CTA bar, WhatsApp links, JSON-LD schema block `"telephone"`, form error message
- All six service pages — quick enquiry panel and JSON-LD
- All three area pages
- `quote.html` — error alert message in the form submit handler

**Email `Matt@mpwelectricalsecurity.com`:**
- `index.html` — contact section and JSON-LD schema `"email"` field
- All six service pages — quick enquiry panels
- All three area pages

**Address `90 Park Road South, Newton-le-Willows, WA12 8PL`:**
- `index.html` — contact section, footer, JSON-LD schema `"address"` block
- All six service pages — JSON-LD schema and quick enquiry panel
- All three area pages — JSON-LD schema

---

### Updating the Areas Served

The areas section on the homepage is at `<!-- ======= Areas We Cover Section ======= -->` in `index.html`. Each area is an `.area-card` div. To add a new area, copy an existing card block and update the town name and description.

If you add a new area important enough for SEO, create a dedicated location page (like `wigan.html`) and add it to `sitemap.xml`. Also update the `areaServed` block in the JSON-LD schema at the top of `index.html`.

---

### Updating the Quote Tool Price Ranges

All prices in the quote tool are stored in the `PRICE` object inside the `<script>` block at the bottom of `quote.html`. Each entry is a two-element array `[low, high]` representing the estimate range.

Key pricing entries:
- `PRICE.base` — starting price for each gate/system type
- `PRICE.width` — price added for gate opening width
- `PRICE.cameras` — price added for CCTV camera count
- `PRICE.access` — price added for access control type (fob, keypad, intercom, app)
- `PRICE.material` — price added for steel vs timber gate
- `PRICE.cctvCoverage` — price added for indoor/outdoor CCTV coverage
- `PRICE.storage` — price added for NVR vs cloud CCTV storage
- `PRICE.commercialMult` — multiplier applied for commercial jobs (currently `1.45`)

All prices are in pounds sterling. The final output is rounded to the nearest £50.

---

## How the Gate Animation Works

When a visitor arrives at the homepage for the **first time** in a browser session, a full-screen gate animation plays before the page is visible. Two iron gate panels part to reveal the site content.

### HTML structure
In `index.html`, just after `<body>`:
```html
<div id="gate-overlay">
  <div class="gate-panel-left"></div>
  <div class="gate-panel-right"></div>
  <div class="gate-divider"></div>
</div>
<div class="gate-center-logo">
  <img src="img/logo.png" alt="MPW Electrical Security">
  <div class="gate-status-light" id="gate-status-light"></div>
</div>
```

### CSS (in `css/style.css`)
- `.gate-panel-left` and `.gate-panel-right` are each 50% of the screen width
- They use complex `repeating-linear-gradient` backgrounds to create a photorealistic iron gate look
- `.gate-divider` is a thin vertical strip at the exact centre, styled to look like the gate's centre post
- `.gate-center-logo` shows the MPW logo centred on screen during the animation
- `.gate-status-light` is a small dot — red while waiting, then gold when the gates open

### JavaScript timing sequence

| Time | Event |
|---|---|
| 0ms | Page loads, scroll locked, gate visible |
| 1,400ms | Status light switches from blinking red to gold (`go` class added) |
| 1,800ms | `gate-opening` class added — triggers the CSS slide animation (2.8 seconds each panel) |
| 4,600ms | `gate-done` class added — triggers 0.8 second fade-out of the overlay |
| 5,400ms | Overlay hidden, scroll unlocked, `mpw_gate_seen = '1'` saved in sessionStorage |

**Skipping the animation:** If the user has `prefers-reduced-motion` enabled, or has already seen the gate this browser session (checked via `sessionStorage.getItem('mpw_gate_seen')`), the animation is skipped instantly.

---

## How the Quote Tool Configurator Works

The quote tool (`quote.html`) is a 5-step wizard that asks the visitor questions and calculates an indicative price range.

### Step structure
- **Step 1** — Property type: Residential or Commercial
- **Step 2** — What they need: Swing gates / Sliding gate / Bi-fold gates / Barrier / CCTV only / Not sure
- **Step 3** — Depends on Step 2 answer:
  - Gates: opening width
  - Barrier: entrance width
  - CCTV: number of cameras
- **Step 4** — Depends on Step 2:
  - Gates/Barrier: access control type (fob, keypad, intercom, app)
  - CCTV: coverage area (outdoor, indoor, both)
- **Step 5** — Depends on Step 2:
  - Gates: material preference (steel, timber, unsure)
  - Barrier: whether CCTV is also needed
  - CCTV: storage type (NVR, cloud, both)

### Pricing logic
The `calcPrice()` function adds:
1. Base price for the chosen system type
2. Additional cost from step 3 answer
3. Additional cost from step 4 answer
4. Additional cost from step 5 answer
5. If "Commercial" (step 1), multiply total by 1.45
6. Round both low and high figures to the nearest £50

### Result and form submission
After step 5, the result panel shows the price range and a form asking for name and phone number. When submitted, the form posts to Netlify Forms. A `quote_form_submit` GA event is fired on success. A `quote_complete` GA event is fired when the result panel first appears, recording the system type and average price.

---

## Development Notes

### Adding a New Service Page
1. Copy an existing service page (e.g. `cctv-installation.html`)
2. Update `<title>`, `<meta description>`, `<meta keywords>`, and `<link rel="canonical">`
3. Update the Schema.org `Service` JSON-LD block
4. Update the `FAQPage` JSON-LD with relevant Q&As
5. Update the `BreadcrumbList` JSON-LD with the new URL
6. Add the page to `sitemap.xml`
7. Link to it from the Services nav dropdown in **every** HTML file

### Adding a New Location Page
1. Copy `wigan.html` or `st-helens.html`
2. Update all content, meta tags, and Schema.org markup to the new location
3. Update the `areaServed` in the `LocalBusiness` schema
4. Add the page to `sitemap.xml`
5. Add a nav or footer link if needed

### Updating Portfolio Images
1. Add images to `img/portfolio/`
2. In `index.html`, duplicate an existing `.portfolio-item` block
3. Set `data-category` to one of: `gates`, `barriers`, `lighting`, `security`
4. Update `data-src` and `data-title` on the `.portfolio-zoom-btn` for the lightbox

### Updating the Sitemap
After adding or removing pages, update `sitemap.xml` and resubmit it in Google Search Console.

### Changing the Brand Colour
All colours are defined as CSS custom properties in `:root` within `css/style.css`. Change `--gold` (and `--gold-light`, `--gold-dark`) to update the accent colour site-wide.

### Deployment
The site is compatible with any static host. For Netlify Forms to work, the site **must** be deployed on Netlify — the `data-netlify="true"` and `name="contact"` form attributes are processed by Netlify's CDN at build/deploy time.

---

## Git Workflow

This project uses a **feature branch / pull request** workflow:

- The `master` branch is the live production branch — what Netlify deploys
- New features are worked on in separate branches (e.g. `claude/add-readme-code-comments-39cEW`)
- When work is ready, a pull request is opened on GitHub and merged into `master`
- Netlify auto-deploys on every merge to `master`

**Never push untested code directly to `master`** — always use a branch and PR.

---

## Known Issues

1. **No Google Analytics tracking on service/area pages** — The GA script is only in `index.html` and `quote.html`. If you want page view tracking on the service pages, add the GA script block to each one.

2. **Font Awesome and Bootstrap are loaded from CDN** — If the CDN is down or blocked, icons and some layout may break.

3. **The gate animation only plays on `index.html`** — It is not on any other page.

4. **Portfolio photo file names** — Some images use numeric prefixes (`1newgate.jpg`) and some don't (`gate.jpg`). This inconsistency is harmless.

5. **WhatsApp link format** — Links use `https://wa.me/447434001222` (international format, no spaces, no `+`). Update this if the phone number changes.

6. **Bootstrap JS is needed for the FAQ accordion** — The FAQ section uses Bootstrap's built-in accordion component. If Bootstrap is ever removed, the FAQ will need custom JS.

7. **The `youtube.html` file** — This file exists but is not linked from the main navigation. It appears to be unused or experimental.

8. **Testimonials are hardcoded** — Customer reviews are written directly into `index.html` as static HTML, not pulled from Google Reviews automatically.

---

## site.webmanifest Reference

The `site.webmanifest` file is a JSON file and cannot have inline comments. Its fields are documented here:

```json
{
  "name": "MPW Electrical Security",      // Full app name shown on device
  "short_name": "MPW Security",           // Short name for home screen icon label
  "description": "...",                   // Brief description (used by some browsers)
  "start_url": "/",                       // Which page opens when launched from home screen
  "display": "standalone",               // Opens without browser chrome (looks like an app)
  "background_color": "#0a0a0a",          // Splash screen background while loading
  "theme_color": "#CC8400",              // Browser UI colour (address bar on Android)
  "icons": [
    {
      "src": "img/favicon-32x32.png",    // Small icon (32×32)
      "sizes": "32x32",
      "type": "image/png"
    },
    {
      "src": "img/logo.png",             // Main icon for Android home screen
      "sizes": "any",                    // "any" = any size (vector-friendly)
      "type": "image/png",
      "purpose": "any maskable"          // "maskable" = can be cropped into shapes
    }
  ]
}
```

If the logo changes, update the `src` paths in `site.webmanifest`. If Matt's brand colours change, also update `theme_color` and `background_color` here and in the `<meta name="theme-color">` tags in every HTML file.

---

*Built and maintained by MPW Electrical Security. For technical queries contact the development team.*
