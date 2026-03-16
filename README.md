# MPW Electrical Security — Website Documentation

## Project Overview

This is the website for **MPW Electrical Security**, owned and operated by **Matt** in Newton-le-Willows, North West England. Matt's business installs and services automated gates, CCTV cameras, intruder alarms, access control, security lighting, and car park barriers for homes and businesses across the North West.

The site is a single-page marketing website with additional standalone service pages, location landing pages, and a multi-step pricing estimate tool. Its purpose is to:

- Rank on Google for local search terms like "automated gates Wigan" and "CCTV installation North West"
- Give visitors enough information to trust MPW and make an enquiry
- Capture leads via the contact form and quote tool

---

## Live Site

**Live URL:** `https://www.mpwelectricalsecurity.com`

The site is deployed via **Netlify**. Any push to the `master` branch on GitHub automatically triggers a new deployment. There is no build step — Netlify serves the HTML files directly.

### Netlify deployment notes
- Netlify handles hosting, HTTPS, and form submissions
- The `netlify.toml` file (if present) controls redirects and headers
- Form submissions from both `contactForm` and `quoteForm` are received directly in the Netlify dashboard (under **Forms**), and can also be forwarded to Matt's email via Netlify notifications settings
- No server-side code exists — this is a purely static site

---

## Tech Stack

| Technology | How it's used |
|---|---|
| **Bootstrap 5.3.2** | CSS grid system and accordion component (loaded from CDN) |
| **Font Awesome 6.5.0** | All icons throughout the site (loaded from CDN) |
| **Google Fonts — Inter** | Body copy font (weights 300, 400, 500, 600, 700) |
| **Google Fonts — Rajdhani** | Headings, navigation, stats, buttons |
| **Vanilla JavaScript** | All interactivity — no jQuery, no frameworks |
| **Netlify Forms** | Contact form and quote form submissions |
| **Google Analytics 4** | Traffic tracking — Measurement ID: `G-H4FW36QNJ8` |
| **Custom CSS** | All visual styling in `css/style.css` |

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

## File and Folder Structure

```
/
├── index.html                   Main homepage (single-page site)
├── quote.html                   5-step pricing estimate tool
├── automated-gates.html         Service page — automated gate installation
├── cctv-installation.html       Service page — CCTV camera systems
├── alarm-systems.html           Service page — intruder alarms
├── gate-servicing.html          Service page — gate repair and maintenance
├── access-control.html          Service page — keypads, intercoms, fobs
├── security-lighting.html       Service page — PIR and driveway lighting
├── newton-le-willows.html       Location page — NLW (Matt's home town)
├── st-helens.html               Location page — St Helens (WA9–WA11)
├── wigan.html                   Location page — Wigan (WN1–WN8)
├── robots.txt                   Tells Google which pages to crawl
├── sitemap.xml                  List of all pages for Google to index
├── site.webmanifest             Web app manifest (icon, colours for mobile)
├── google03b767954523f455.html  Google Search Console ownership verification file
├── youtube.html                 (Minor/placeholder page — not linked in main nav)
│
├── css/
│   └── style.css                All custom styles for the entire site
│
├── js/
│   └── main.js                  All custom JavaScript for the entire site
│
├── img/
│   ├── logo.png                 MPW logo — used in header, footer, gate animation
│   ├── edit.png                 Hero section image (gate graphic)
│   ├── aboutusgate.jpg          About section photo / OG image for social sharing
│   ├── favicon-16x16.png        Browser tab icon (small)
│   ├── favicon-32x32.png        Browser tab icon (standard)
│   ├── brands/                  SVG logos for the scrolling brands bar
│   │   ├── came.svg             CAME gate motors
│   │   ├── bft.svg              BFT gate motors
│   │   ├── faac.svg             FAAC gate motors
│   │   ├── hikvision.svg        Hikvision CCTV
│   │   ├── dahua.svg            Dahua CCTV
│   │   ├── texecom.svg          Texecom alarms
│   │   ├── paxton.svg           Paxton access control
│   │   └── videx.svg            Videx intercoms
│   └── portfolio/               Portfolio photos shown in the gallery section
│       ├── gate.jpg             Classic black automatic driveway gate
│       ├── gate2.jpg            Residential sliding gate
│       ├── gate3.jpg            Wrought iron swing gates
│       ├── gate4.jpg            Timber bi-folding gates
│       ├── gate5.jpg            Driveway security gates with CCTV
│       ├── gate6.jpg            Commercial security gates
│       ├── gate8.jpg            Remote access driveway gates
│       ├── gate9.jpg            Electric double swing gates
│       ├── newgate.jpg          New installation
│       ├── 1newgate.jpg         Bespoke automatic gate
│       ├── 2newgate.jpg         Electric gate
│       ├── 3newgate.jpg         Automated entry gate
│       ├── barrier1.jpg         Car park entry barrier
│       ├── barrier2.jpg         Automated car park barrier
│       ├── barrier3.jpg         Height restriction barrier
│       ├── light.jpg            Garden security lighting
│       ├── 1lighting.jpg        Outdoor security lighting
│       ├── 1security.jpg        CCTV installation
│       ├── 2security.jpg        Bespoke security system
│       └── ringproducts.jpg     Ring doorbell and camera products
│
└── lib/                         (Third-party libraries if any are stored locally)
```

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
- `index.html` — hero section (around line 295)
- `index.html` — contact section (around line 1120)
- `index.html` — footer (around line 1247)
- `index.html` — mobile CTA bar (around line 1273)
- `index.html` — WhatsApp link `https://wa.me/447434001222` (around line 1277 and 1288)
- `index.html` — JSON-LD schema block `"telephone": "+447434001222"` (around line 85)
- `index.html` — form error message (around line 1204)
- `automated-gates.html` — quick enquiry panel and JSON-LD
- `cctv-installation.html` — quick enquiry panel and JSON-LD
- `alarm-systems.html` — quick enquiry panel and JSON-LD
- `gate-servicing.html` — quick enquiry panel and JSON-LD
- `access-control.html` — quick enquiry panel and JSON-LD
- `security-lighting.html` — quick enquiry panel and JSON-LD
- `newton-le-willows.html`, `st-helens.html`, `wigan.html` — all area pages
- `quote.html` — error alert message in the form submit handler

**Email `Matt@mpwelectricalsecurity.com`:**
- `index.html` — contact section (around line 1127)
- `index.html` — JSON-LD schema `"email"` field (around line 86)
- All six service pages — quick enquiry panels
- All three area pages

**Address `198 Crow Lane East, Newton-le-Willows, WA12 9UA`:**
- `index.html` — contact section (around line 1113)
- `index.html` — footer (around line 1246)
- `index.html` — JSON-LD schema `"address"` block
- All six service pages — JSON-LD schema and quick enquiry panel
- All three area pages — JSON-LD schema

---

### Updating the Areas Served

The areas section on the homepage is at `<!-- ======= Areas We Cover Section ======= -->` in `index.html` (around line 1028). Each area is an `.area-card` div. To add a new area, copy an existing card block and update the town name and description. You can add as many as you like — Bootstrap handles the responsive grid automatically.

If you add a new area and it's important enough for SEO, you might also want to create a dedicated location page (like `wigan.html`) and add it to `sitemap.xml`.

The areas also appear in the JSON-LD `areaServed` block at the top of `index.html` — update that list too so Google has accurate data.

---

### Changing Service Pages

Each service has its own standalone HTML file. To update a service page:
- Open the relevant file (e.g. `automated-gates.html`)
- Edit the body text, feature lists, or FAQ answers directly in the HTML
- The page hero, navigation, and footer all use the same `css/style.css` styles as the homepage
- If you change a service name or description, also update the corresponding entry in `index.html`'s services section and JSON-LD schema

To add a **completely new service page**:
1. Copy one of the existing service pages as a template
2. Update the `<title>`, `<meta name="description">`, `<link rel="canonical">`, and all Open Graph tags at the top
3. Update the JSON-LD schema type, name, and description
4. Update the breadcrumb navigation inside the page
5. Update all the body content
6. Add a link to the new page in the navigation `<ul class="nav-links">` in `index.html` and all other pages
7. Add the new URL to `sitemap.xml`

---

### Updating the Quote Tool Price Ranges

All prices in the quote tool are stored in the `PRICE` object inside the `<script>` block at the bottom of `quote.html` (around line 815). Each entry is a two-element array `[low, high]` representing the lower and upper end of the estimate range.

Key pricing entries:
- `PRICE.base` — the starting price for each gate/system type
- `PRICE.width` — price added based on gate opening width
- `PRICE.cameras` — price added for CCTV camera count
- `PRICE.access` — price added for access control type (fob, keypad, intercom, app)
- `PRICE.material` — price added for steel vs timber gate
- `PRICE.cctvCoverage` — price added for indoor/outdoor CCTV coverage
- `PRICE.storage` — price added for NVR vs cloud CCTV storage
- `PRICE.commercialMult` — multiplier applied to the total for commercial jobs (currently `1.45`, meaning commercial is 45% more expensive)

All prices are in pounds sterling. The final output is rounded to the nearest £50.

To update a price, simply change the two numbers in the relevant array. For example, to raise the starting price for a swing gate from £1,800–£3,400 to £2,000–£4,000:
```js
// Before:
swing: [1800, 3400],

// After:
swing: [2000, 4000],
```

---

## How the Gate Animation Works

When a visitor arrives at the homepage for the **first time** in a browser session, a full-screen gate animation plays before the page is visible. It shows two iron gate panels parting to reveal the site content.

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

### CSS (in `css/style.css`, near the bottom)
- `.gate-panel-left` and `.gate-panel-right` are each 50% of the screen width
- They use complex `repeating-linear-gradient` backgrounds to create a photorealistic iron gate look — vertical picket bars with highlights, horizontal rails, and ornamental spike finials
- The `::before` pseudo-element adds the horizontal rail structure
- The `::after` pseudo-element adds the decorative spike tips at the top
- `.gate-divider` is a thin vertical strip at the exact centre of the screen, styled to look like the gate's centre post
- `.gate-center-logo` shows the MPW logo centred on screen during the animation
- `.gate-status-light` is a small dot — red while waiting, then gold when the gates open

### JavaScript (inline script at the bottom of `index.html`)
The controller runs once on page load. The timing sequence is:

| Time | Event |
|---|---|
| 0ms | Page loads, scroll locked, gate visible |
| 1,400ms | Status light switches from blinking red to gold (`go` class added) |
| 1,800ms | `gate-opening` class added to overlay — triggers the CSS slide animation (2.8 seconds each panel) |
| 4,600ms | `gate-done` class added — triggers 0.8 second fade-out of the overlay |
| 5,400ms | Overlay hidden, scroll unlocked, `mpw_gate_seen = '1'` saved in sessionStorage |

**Skipping the animation:** If the user has `prefers-reduced-motion` enabled in their OS/browser, or if they've already seen the gate during this browser session (checked via `sessionStorage.getItem('mpw_gate_seen')`), the animation is skipped instantly and the overlay is hidden immediately.

This means the gate plays once per visit, but not on every page refresh or navigation.

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
All prices are in the `PRICE` object (see above section on updating prices). The `calcPrice()` function adds up:
1. The base price for the chosen system type
2. Additional cost from step 3 answer
3. Additional cost from step 4 answer
4. Additional cost from step 5 answer
5. If "Commercial" was selected in step 1, the total is multiplied by 1.45
6. Both the low and high figures are rounded to the nearest £50

### Result and form submission
After step 5, the result panel shows the price range and a form asking for name and phone number. When submitted, the form posts to Netlify Forms (the `data-netlify="true"` attribute handles this). A Google Analytics event `quote_form_submit` is fired on success.

A `quote_complete` GA event is also fired when the result panel is first shown, recording the system type and average price as event data.

---

## SEO Setup

### Meta tags
Every page has:
- `<title>` — includes location keywords (e.g. "Automated Gates Wigan")
- `<meta name="description">` — 150–160 character description for Google search results
- `<meta name="robots" content="index, follow">` — tells Google to index all pages
- `<link rel="canonical">` — prevents duplicate content issues

### Open Graph and Twitter Card tags
These control how the page looks when shared on Facebook, LinkedIn, WhatsApp, and Twitter/X. The OG image used across all pages is `img/aboutusgate.jpg`.

### Geo/local meta tags
The homepage has geo coordinates meta tags pointing to Newton-le-Willows (`53.4533, -2.6215`). These hint to search engines that this is a locally relevant business.

### JSON-LD structured data
The homepage has two JSON-LD blocks:
1. **LocalBusiness** — Tells Google the business name, address, phone, email, coordinates, opening hours, social profiles, rating, and full service catalogue
2. **FAQPage** — Marks up the FAQ section so questions can appear directly in Google search results

Each service page has its own **Service** schema and a **FAQPage** and **BreadcrumbList** schema. Each area page has a **Service** schema and **BreadcrumbList**.

### Sitemap
`sitemap.xml` lists all URLs that Google should index, with their last-modified date and priority. When you add a new page:
1. Add a `<url>` block to `sitemap.xml`
2. Update the `<lastmod>` date (use `YYYY-MM-DD` format)
3. Use priority `1.0` for the homepage, `0.8` for service pages, `0.7` for location pages, `0.6` for the quote tool

### robots.txt
`robots.txt` is a two-line file that allows all search engine bots to crawl everything and points them to the sitemap URL.

### Google Search Console
The file `google03b767954523f455.html` at the root of the site is used by Google Search Console to verify that MPW owns this domain. **Do not delete or rename this file.** If it disappears, the Search Console connection will break.

The homepage also has a `<meta name="google-site-verification">` tag as a backup verification method.

---

## Netlify Forms Setup

Both forms on the site submit to Netlify Forms without any server-side code. Netlify detects them automatically during deployment.

### How it works
1. The form tag must have `data-netlify="true"` and a `name` attribute
2. A hidden `<input type="hidden" name="form-name" value="...">` must be inside the form — this is how Netlify knows which form is which
3. There is also a honeypot field (`data-netlify-honeypot="bot-field"`) — a hidden input that real users never fill in but spam bots often do. Netlify silently discards any submission where this field is filled
4. JavaScript intercepts the submit event, validates the fields, then sends the form data to `/` via `fetch()` with `application/x-www-form-urlencoded` encoding
5. Netlify receives it server-side and stores it in the Forms dashboard

### Viewing submissions
Log in to Netlify → select the site → **Forms** tab. All contact form and quote estimate submissions appear here. You can also set up email notifications so Matt is emailed instantly for each submission.

### The two forms
- **`contact`** — in `index.html`, collects: name, email, phone, service interest, message
- **`quote-estimate`** — in `quote.html`, collects: name, phone, price estimate, full selections breakdown, estimated price (hidden fields pre-filled by JS)

---

## Google Analytics Event Tracking

The site uses GA4 (Google Analytics 4). The tracking ID is `G-H4FW36QNJ8`.

Standard page views are tracked automatically. Additional custom events fired by JavaScript:

| Event name | Where fired | Data sent |
|---|---|---|
| `quote_complete` | When the quote tool result panel is shown | `event_category: 'Quote Tool'`, `event_label:` system type chosen, `value:` average of low/high price |
| `quote_form_submit` | When the quote estimate form is submitted successfully | `event_category: 'Quote Tool'` |

To view these events in Google Analytics: go to GA4 → Reports → Engagement → Events.

---

## Google Search Console Verification

The file `google03b767954523f455.html` at the root is a special file that Google uses to confirm MPW owns the domain. Its contents are simply:

```
google-site-verification: google03b767954523f455.html
```

This file must remain at `https://www.mpwelectricalsecurity.com/google03b767954523f455.html` and must not be renamed or deleted. The homepage also has a secondary verification via the `<meta name="google-site-verification">` tag.

---

## How to Add New Pages

### Adding a new service page
1. Copy `automated-gates.html` as a starting template
2. Rename it (e.g. `electric-barriers.html`)
3. Update in the `<head>`:
   - `<title>` — include key search phrase and "MPW Electrical Security"
   - `<meta name="description">` — 150–160 characters
   - `<link rel="canonical">` — full URL of the new page
   - All `og:` and `twitter:` tags — update URLs and titles
4. Update the JSON-LD schema to match the new service
5. Update the breadcrumb inside the page body
6. Replace all the body content
7. Add the new page to the `<ul class="nav-links">` dropdown in **every** HTML file (index + all service/area pages)
8. Add the new URL to `sitemap.xml`

### Adding a new area page
1. Copy `wigan.html` as a template
2. Rename it (e.g. `warrington.html`)
3. Update title, meta description, canonical, OG tags
4. Update the JSON-LD schema — change the area name and description
5. Replace body content to be about Warrington
6. Add it to the areas section in `index.html` if you want a card there
7. Add the URL to `sitemap.xml` with priority `0.7`

---

## Git Workflow

This project uses **Git worktrees** and a **feature branch / pull request** workflow:

- The `master` branch is the live production branch — what Netlify deploys
- New features are worked on in separate branches (e.g. `claude/fervent-albattani`)
- Each branch lives in its own worktree under `.claude/worktrees/` so multiple branches can be edited simultaneously without switching
- When work is ready, a pull request is opened on GitHub and merged into `master`
- Netlify auto-deploys on every merge to `master`

**Never push untested code directly to `master`** — always use a branch and PR.

---

## Known Issues and Things to Watch Out For

1. **No Google Analytics tracking on service/area pages** — The GA script is only in `index.html` and `quote.html`. If you want page view tracking on the service pages, add the GA script block to each one.

2. **Font Awesome and Bootstrap are loaded from CDN** — If the CDN is down or blocked, icons and some layout may break. For a more robust setup in future, consider hosting these locally.

3. **The gate animation only plays on `index.html`** — It is not on any other page. If you create a new homepage or rename `index.html`, you'd need to move the animation code.

4. **Portfolio photo file names** — Some portfolio images use numeric prefixes (`1newgate.jpg`, `2newgate.jpg`) and some don't (`gate.jpg`). This inconsistency is harmless but worth keeping in mind when adding new photos — just follow any naming convention you like, as long as the path in `index.html` matches the actual file.

5. **WhatsApp link format** — The WhatsApp links use `https://wa.me/447434001222` (international format, no spaces, no `+`). If the phone number changes, update this format too.

6. **site.webmanifest** — This is a JSON file and cannot have inline comments. Its content is documented in this README only (see Tech Stack section). It defines the site name, short name, background and theme colours, and icon paths for when someone adds the site to their phone home screen.

7. **Bootstrap JS is needed for the FAQ accordion** — The FAQ section uses Bootstrap's built-in accordion component. The Bootstrap JS bundle (`bootstrap.bundle.min.js`) must remain loaded for the accordion to open and close. If Bootstrap is ever removed, the FAQ accordion will need to be rebuilt with custom JS.

8. **The `youtube.html` file** — This file exists but is not linked from the main navigation. It appears to be an unused or experimental page.

9. **Testimonials are hardcoded** — The customer reviews in the testimonials section are written directly into `index.html` as static HTML. They are not pulled from Google Reviews automatically. If you want to add or update a review, edit the testimonial cards directly in `index.html`.

---

## site.webmanifest Reference

The `site.webmanifest` file is a JSON file and cannot have inline comments. Its fields are documented here instead.

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

If the logo changes, update the `src` paths in `site.webmanifest` to point to the new file. If Matt's brand colours change, also update `theme_color` and `background_color` here and in the `<meta name="theme-color">` tags in every HTML file.
