/* ============================================================
   MPW Security — Main JavaScript
   ============================================================
   Tech:   Vanilla JS (ES6+), no jQuery, no frameworks
   Role:   Handles all interactive behaviour on the site:
             - Page preloader fade-out
             - Animated hero particles
             - Sticky / shrinking header on scroll
             - Mobile slide-in navigation + hamburger toggle
             - Services dropdown (mobile tap, desktop CSS hover)
             - Smooth anchor-link scrolling
             - Active nav-link highlighting via IntersectionObserver
             - Scroll-reveal fade-in animations
             - Animated stats counter
             - Portfolio category filter
             - Lightbox image viewer (keyboard + touch swipe)
             - Contact form validation + Netlify Forms submission
             - Mobile CTA bar auto-hide near contact section
             - Back-to-top button visibility
             - Auto-updating footer copyright year
   ============================================================ */

'use strict'; // Enables strict mode: catches common coding mistakes and prevents use of undeclared variables

/* ── Preloader ────────────────────────────────────────────────────────────────
   The preloader (#preloader) is a full-screen dark overlay that shows while
   the page assets are loading. Once the 'load' event fires (all images,
   stylesheets, and scripts have finished loading) we:
     1. Add the 'hidden' class → triggers a CSS opacity/visibility transition
        that fades the overlay out over 0.5 s
     2. After 600 ms (slightly longer than the CSS transition) we remove the
        element from the DOM entirely to free memory
   We also trigger the hero text reveal animation at the same time so the
   text animates in after the preloader has gone.
   ─────────────────────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');           // Start CSS fade-out transition
    setTimeout(() => preloader.remove(), 600);  // Remove from DOM after transition completes
  }

  // Kick off hero text animation after page load
  // .reveal-hero elements start invisible and slide/fade in when 'show' is added
  document.querySelectorAll('.reveal-hero').forEach(el => {
    el.classList.add('show');
  });
});

/* ── Hero Particles ───────────────────────────────────────────────────────────
   Creates floating gold dot particles inside the hero section background.
   The container #heroParticles is an absolutely-positioned div behind the
   hero content (pointer-events: none so it doesn't block clicks).

   Each particle is a <span> with the 'hero-particle' class (a circle via
   border-radius: 50%). Properties are randomised per particle:
     - size:     3–9 px diameter (larger dots are visible but not distracting)
     - left:     0–100% horizontal position
     - duration: 10–22 s animation cycle (varied so particles don't sync up)
     - delay:    0–15 s start delay (staggers when each particle appears)

   On mobile (< 768 px) only 12 particles are created vs 22 on desktop,
   reducing visual noise and GPU load on smaller screens.

   The CSS 'float' animation translates each particle from below the viewport
   (translateY(100vh)) upward to above it (translateY(-10vh)), fading in and
   out at the edges to create a smooth loop.
   ─────────────────────────────────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return; // Guard: hero particles section may not exist on all pages

  // Fewer particles on mobile to avoid performance issues and visual clutter
  const count = window.innerWidth < 768 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('hero-particle');

    // Randomise visual properties so particles look natural, not mechanical
    const size     = Math.random() * 6 + 3;    // 3–9 px
    const left     = Math.random() * 100;       // 0–100% across the width
    const delay    = Math.random() * 15;        // 0–15 s start delay
    const duration = Math.random() * 12 + 10;  // 10–22 s per loop

    // Apply all dynamic values as inline styles
    p.style.cssText = `
      width:${size}px;
      height:${size}px;
      left:${left}%;
      animation-duration:${duration}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(p);
  }
}

// Run immediately (not inside a 'load' event) so particles are ready as soon
// as the hero section renders. The CSS animation handles the gradual appearance.
initParticles();

/* ── Sticky Header ────────────────────────────────────────────────────────────
   The site header is `position: fixed` at the top of the viewport.
   Initially it uses a semi-transparent background.
   Once the user scrolls past 80 px, the 'scrolled' class is added which:
     - Makes the background more opaque (rgba 0.95 → 0.98)
     - Reduces the navbar vertical padding (0.75rem → 0.5rem), shrinking it
     - Adds a stronger box-shadow for visual depth/separation

   The event listener uses `{ passive: true }` to tell the browser this handler
   will never call preventDefault(), allowing the browser to optimise scrolling
   performance (no jank).
   ─────────────────────────────────────────────────────────────────────────── */
const header = document.getElementById('header');

function updateHeader() {
  if (!header) return;
  if (window.scrollY > 80) {
    header.classList.add('scrolled');    // Compact/opaque header state
  } else {
    header.classList.remove('scrolled'); // Transparent header state at top of page
  }
}

// Passive listener for scroll performance (no preventDefault needed here)
window.addEventListener('scroll', updateHeader, { passive: true });
// Run once on load in case the page is loaded part-way down (e.g. via anchor link)
updateHeader();

/* ── Mobile Navigation ────────────────────────────────────────────────────────
   On screens ≤ 991 px, the main nav links collapse into a slide-in drawer
   that appears from the right edge of the screen.

   Components:
     - navToggle (#navToggle): the hamburger button (3 lines → X when open)
     - navMenu (#navMenu / .navbar-collapse-custom): the sliding panel
     - mobileOverlay: a semi-transparent backdrop created dynamically that
       covers the page content behind the open nav panel

   openNav():
     - Adds 'open' class to both the menu (slides it in) and the toggle
       (animates hamburger → X)
     - Sets aria-expanded="true" for screen readers
     - Shows the overlay
     - Locks body scroll (overflow: hidden) to prevent background scrolling
       while the mobile menu is open

   closeNav():
     - Reverses everything from openNav()
     - Also collapses any open service sub-menus inside the nav (resets them
       to collapsed state ready for next open)

   Accessibility attributes are set programmatically so they reflect the real
   DOM state:
     - aria-expanded on the toggle button
     - aria-controls pointing to the nav panel's ID
   ─────────────────────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

// Dynamically create the semi-transparent background overlay.
// Adding it to <body> means it sits behind the nav panel but above everything else.
const mobileOverlay = document.createElement('div');
mobileOverlay.classList.add('mobile-overlay');
document.body.appendChild(mobileOverlay);

/** Opens the mobile navigation drawer */
function openNav() {
  navMenu.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');   // Tell screen readers the menu is open
  mobileOverlay.classList.add('active');              // Show darkened backdrop
  document.body.style.overflow = 'hidden';            // Prevent background scroll
}

/** Closes the mobile navigation drawer and resets all sub-menus */
function closeNav() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');  // Tell screen readers menu is closed
  mobileOverlay.classList.remove('active');           // Hide backdrop
  document.body.style.overflow = '';                  // Re-enable background scroll

  // Reset all open service sub-menus to closed state
  // so they start fresh next time the nav is opened
  document.querySelectorAll('.nav-item-dropdown.open').forEach(item => {
    item.classList.remove('open');
    const trigger = item.querySelector('[aria-expanded]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

// Set initial ARIA attributes on the toggle button
navToggle.setAttribute('aria-expanded', 'false');
navToggle.setAttribute('aria-controls', 'navMenu'); // Points to the menu element ID

// Toggle nav open/closed on hamburger button click
navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeNav() : openNav();
});

// Clicking the overlay (dark background) closes the nav
mobileOverlay.addEventListener('click', closeNav);

// Close on Esc key — important for keyboard-only users navigating with Tab
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

/* ── Services Dropdown (mobile toggle + aria) ─────────────────────────────────
   The "Services" nav item has a dropdown sub-menu listing individual service
   pages. On desktop (> 991 px) this is handled purely by CSS :hover rules.
   On mobile, CSS hover doesn't work reliably with touch, so we handle it in JS:
     - Find all .nav-item-dropdown elements (parent list items with a dropdown)
     - Look for a trigger link inside (one with aria-haspopup attribute)
     - On click (on mobile only), toggle the 'open' class and update aria-expanded
   e.preventDefault() stops the browser following the href (e.g. "#") when
   toggling the dropdown on mobile.
   ─────────────────────────────────────────────────────────────────────────── */
document.querySelectorAll('.nav-item-dropdown').forEach(item => {
  const trigger = item.querySelector('.nav-link[aria-haspopup]');
  if (!trigger) return; // Skip if no toggleable trigger found

  trigger.addEventListener('click', e => {
    if (window.innerWidth <= 991) {
      // Only intercept click behaviour on mobile
      e.preventDefault();
      const isOpen = item.classList.toggle('open');                       // Toggle the dropdown
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false'); // Update ARIA state
    }
    // On desktop, CSS :hover handles the dropdown — no JS needed
  });
});

/* ── Smooth Scroll ────────────────────────────────────────────────────────────
   Intercepts clicks on:
     - Any element with class 'scroll-link'
     - Any <a> nav-link whose href starts with '#'

   Instead of the browser's default instant jump-to-anchor behaviour:
     1. We read the target element from the href (e.g. '#contact')
     2. Close the mobile nav if open
     3. Calculate the correct scroll position, accounting for the fixed header
        height so the target isn't hidden behind it
     4. Smoothly scroll to that position

   Using window.scrollTo with behavior:'smooth' provides native smooth
   scrolling that is GPU-accelerated and respects prefers-reduced-motion
   (the browser handles that automatically).
   ─────────────────────────────────────────────────────────────────────────── */
document.querySelectorAll('.scroll-link, .nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return; // Skip non-anchor links

    const target = document.querySelector(href); // Find the target section element
    if (!target) return;                          // Skip if target doesn't exist in this page

    e.preventDefault(); // Stop default browser anchor jump
    closeNav();         // Close mobile nav if it was open

    // Offset the scroll position by the header height so the section
    // heading isn't hidden underneath the fixed navbar
    const headerH = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Active Nav on Scroll ─────────────────────────────────────────────────────
   Highlights the correct nav link as the user scrolls through page sections.
   Uses IntersectionObserver with a generous rootMargin to trigger when a
   section is roughly centred in the viewport:
     - Top of observation zone: 40% from top (section must scroll past this)
     - Bottom of zone: 55% from bottom (section must be visible above this)

   When a section crosses into the observation zone, its ID is used to find
   the corresponding nav link (href="#sectionId") and add the 'active' class,
   while removing 'active' from all others.
   ─────────────────────────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]'); // All sections with an ID
const navLinks = document.querySelectorAll('.nav-link[href^="#"]'); // Anchor nav links

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      // Toggle 'active' on each nav link based on whether its href matches the visible section
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' }); // Trigger zone: middle 5% of viewport height

sections.forEach(s => navObserver.observe(s));

/* ── Scroll Reveal (Intersection Observer) ────────────────────────────────────
   Elements with these classes start invisible (via CSS: opacity:0 + transform)
   and animate in when they enter the viewport:
     - .reveal-up    → fades in while sliding upward
     - .reveal-left  → fades in while sliding in from the left
     - .reveal-right → fades in while sliding in from the right

   Once 12% of the element is visible (threshold: 0.12), the 'visible' class
   is added which triggers the CSS transition to the visible state.

   After revealing, we call unobserve() so the observer stops watching that
   element — the animation only plays once per page load, not every time the
   element re-enters the viewport.
   ─────────────────────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');         // Trigger CSS reveal animation
      revealObserver.unobserve(entry.target);         // Stop watching — only animate once
    }
  });
}, { threshold: 0.12 }); // Trigger when 12% of element is visible

// Observe all elements that should animate in on scroll
document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ── Stats Counter ────────────────────────────────────────────────────────────
   Animates numeric counters (e.g. "250+ installations") from 0 up to their
   target value when they scroll into view. The target value is stored in the
   element's `data-target` attribute.

   Animation logic:
     - Duration: 1800 ms total
     - Step interval: 16 ms (≈ 60 fps)
     - Increment per step: target / (1800 / 16) ≈ target / 112.5
     - setInterval updates the displayed number every 16 ms
     - When current value reaches or exceeds target, it snaps to the exact
       target value and the interval is cleared

   Uses threshold: 0.4 — the counter only starts when 40% of the element
   is visible, ensuring the user can actually see the animation play.
   Like scroll reveal, the element is unobserved after first trigger so the
   counter only plays once.
   ─────────────────────────────────────────────────────────────────────────── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10); // Read target number from data-target attribute
    const dur    = 1800;                             // Total animation duration in ms
    const step   = 16;                               // Interval between updates in ms (≈60fps)
    const inc    = target / (dur / step);            // How much to add each interval step
    let current  = 0;                                // Start value

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;       // Snap to exact target to avoid floating-point overshoot
        clearInterval(timer);   // Stop the animation
      }
      el.textContent = Math.floor(current); // Display rounded-down value
    }, step);

    counterObserver.unobserve(el); // Don't restart the animation if element re-enters viewport
  });
}, { threshold: 0.4 }); // Start when 40% of the counter element is visible

// Observe all counter elements (they carry data-target="250" etc.)
document.querySelectorAll('.stat-number')
  .forEach(el => counterObserver.observe(el));

/* ── Portfolio Filter ─────────────────────────────────────────────────────────
   The portfolio grid has a row of filter buttons above it:
     "All", "Gates", "Barriers", "CCTV & Security", "Lighting"

   Each button has a `data-filter` attribute (e.g. data-filter="gates").
   Each portfolio item has a `data-category` attribute matching a filter value.

   On click:
     1. Remove 'active' class from all buttons, then add it to the clicked one
        (visual highlight showing the current filter)
     2. Read the clicked button's data-filter value
     3. For each portfolio item, toggle the 'hidden' class:
          - 'all' filter: show everything (remove 'hidden' from all items)
          - specific filter: hide items whose data-category doesn't match,
            show items whose data-category does match

   The lightbox (below) accounts for hidden items so navigation skips them.
   ─────────────────────────────────────────────────────────────────────────── */
const filterBtns     = document.querySelectorAll('.filter-btn');       // Filter buttons row
const portfolioItems = document.querySelectorAll('.portfolio-item');   // Portfolio image cards

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Remove active highlight from all buttons then highlight only the clicked one
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter; // e.g. "gates", "lighting", "all"

    portfolioItems.forEach(item => {
      // Show item if filter is "all" or the item's category matches the filter
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match); // Add 'hidden' if no match, remove if match
    });
  });
});

/* ── Lightbox ─────────────────────────────────────────────────────────────────
   A full-screen image overlay (lightbox) that opens when a portfolio image
   is clicked. Features:
     - Displays image with caption
     - Previous / Next navigation
     - Keyboard navigation (← → Esc)
     - Touch swipe support on mobile (swipe left/right to navigate)
     - Click outside image (on overlay background) to close

   The lightbox only navigates among currently VISIBLE portfolio items
   (respects active filter). It uses an array built from non-hidden items.

   State: `currentIndex` tracks which item is currently shown.

   DOM elements (all present in index.html):
     - #lightbox       — the overlay container
     - #lightboxImg    — the <img> element that displays the full image
     - #lightboxCaption — the text caption below the image
     - #lightboxClose  — close (×) button
     - #lightboxPrev   — previous (←) button
     - #lightboxNext   — next (→) button
   ─────────────────────────────────────────────────────────────────────────── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');

let currentIndex = 0; // Index of the currently viewed item within the visible items array

/**
 * Opens the lightbox showing the image at the given src/title/index.
 * @param {string} src   - URL of the full-size image
 * @param {string} title - Caption/alt text for the image
 * @param {number} index - Index of this item in the visible portfolio items array
 */
function openLightbox(src, title, index) {
  lightboxImg.src = src;
  lightboxImg.alt = title;
  lightboxCaption.textContent = title;
  currentIndex = index;
  lightbox.classList.add('active');              // Make the overlay visible (CSS opacity/display)
  lightbox.setAttribute('aria-hidden', 'false'); // Tell screen readers the dialog is open
  document.body.style.overflow = 'hidden';       // Prevent background scroll while lightbox is open
}

/**
 * Closes the lightbox and clears the image src (frees memory, stops loading).
 * The 350 ms delay on clearing src matches the CSS close transition duration.
 */
function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true'); // Tell screen readers dialog is closed
  document.body.style.overflow = '';             // Re-enable background scroll
  setTimeout(() => { lightboxImg.src = ''; }, 350); // Clear after transition ends to avoid flash
}

/**
 * Navigates the lightbox to the item at the given index within currently visible items.
 * Wraps around at start/end (loops from last → first and first → last).
 * @param {number} index - Desired index (can be negative or over-length; wraps automatically)
 */
function showLightboxItem(index) {
  // Only consider items that are currently visible (not hidden by the portfolio filter)
  const items = Array.from(portfolioItems).filter(i => !i.classList.contains('hidden'));
  if (!items.length) return;

  // Wrap index to stay within bounds — e.g. -1 wraps to last item
  currentIndex = (index + items.length) % items.length;

  // Read the image data from the zoom button's data attributes
  const btn = items[currentIndex].querySelector('.portfolio-zoom-btn');
  if (btn) {
    lightboxImg.src = btn.dataset.src;
    lightboxImg.alt = btn.dataset.title;
    lightboxCaption.textContent = btn.dataset.title;
  }
}

// Attach click handler to every portfolio zoom button.
// Clicking opens the lightbox showing that specific image.
document.querySelectorAll('.portfolio-zoom-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Determine this item's index only within the visible (non-hidden) items
    const visItems = Array.from(portfolioItems).filter(item => !item.classList.contains('hidden'));
    const visIndex = visItems.indexOf(btn.closest('.portfolio-item'));
    openLightbox(btn.dataset.src, btn.dataset.title, visIndex);
  });
});

// Only attach lightbox event listeners if the lightbox exists in the DOM
// (it only exists on index.html, not service/location pages)
if (lightbox) {
  // Close button (×)
  lightboxClose.addEventListener('click', closeLightbox);

  // Prev / Next navigation buttons
  lightboxPrev.addEventListener('click',  () => showLightboxItem(currentIndex - 1));
  lightboxNext.addEventListener('click',  () => showLightboxItem(currentIndex + 1));

  // Click on the overlay background (not on the image itself) to close
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox(); // Only close if clicking the backdrop, not the image
  });

  // Keyboard navigation while lightbox is open
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return; // Ignore if lightbox isn't open
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showLightboxItem(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxItem(currentIndex + 1);
  });

  /* ── Lightbox Touch Swipe (mobile) ─────────────────────────────────────────
     Records the X and Y position when the user starts touching the lightbox.
     On touchend, calculates how far (and in which direction) they swiped.

     Rules:
       - Minimum horizontal swipe distance: 40 px (prevents accidental triggers)
       - The horizontal movement must be greater than vertical movement
         (prevents triggering while scrolling vertically)
       - Swipe LEFT  (dx < 0) → show next image
       - Swipe RIGHT (dx > 0) → show previous image

     Both listeners use { passive: true } since they never call preventDefault,
     allowing the browser to scroll/zoom normally without waiting for our JS.
     ───────────────────────────────────────────────────────────────────────── */
  let touchStartX = 0; // X position at start of touch
  let touchStartY = 0; // Y position at start of touch (used to filter vertical scrolls)

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX; // Horizontal distance
    const dy = e.changedTouches[0].clientY - touchStartY; // Vertical distance

    // Only respond to primarily horizontal swipes (dx > dy)
    // and only if the swipe is at least 40px wide
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      showLightboxItem(currentIndex + 1); // Swipe left  → next image
    } else {
      showLightboxItem(currentIndex - 1); // Swipe right → previous image
    }
  }, { passive: true });
}

/* ── Contact Form ─────────────────────────────────────────────────────────────
   Handles the main enquiry form (#contactForm):
     1. Client-side validation before submission (name, email, message)
     2. Submission to Netlify Forms via fetch()
     3. Success and error feedback banners

   Validation:
     - Name and message must be non-empty (after trimming whitespace)
     - Email must be non-empty AND match the regex pattern
     - Each failed field gets an 'invalid' CSS class (red border style)
       and an inline <span role="alert"> with the error message
     - If any field is invalid, the page scrolls to the first invalid field
     - As the user types to fix an error, it clears immediately (live feedback)

   Netlify Forms submission:
     - Netlify intercepts this fetch() call at their CDN edge during deployment
     - The data-netlify="true" attribute on the <form> tells Netlify to handle it
     - We POST the form data as application/x-www-form-urlencoded
     - On success: show #formSuccess for 7 s, then clear all form fields
     - On network failure: show #formError for 7 s
   ─────────────────────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess'); // Green success banner
const formError   = document.getElementById('formError');   // Red error banner

// Human-readable error messages, keyed by field ID
const formErrorMessages = {
  name:    'Please enter your name.',
  email:   'Please enter a valid email address.',
  message: 'Please enter a message.'
};

/**
 * Marks a field as invalid by adding the 'invalid' CSS class and
 * inserting (or updating) an inline error message below the field.
 * The error span has role="alert" so screen readers announce it.
 * @param {string} id      - The ID of the form input element
 * @param {string} message - The error text to display
 */
function setFieldError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('invalid'); // Apply red border style via CSS

  // Re-use existing error element or create a new one below the input
  let errEl = el.parentElement.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.setAttribute('role', 'alert'); // Screen readers announce this automatically
    el.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
}

/**
 * Clears the error state from a field — removes the red border and
 * the inline error message.
 * @param {string} id - The ID of the form input element
 */
function clearFieldError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('invalid');
  const errEl = el.parentElement.querySelector('.field-error');
  if (errEl) errEl.remove(); // Remove the error span from the DOM entirely
}

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault(); // Always stop the default form submission (we use fetch instead)

    let valid = true; // Track overall form validity

    // Validate required text fields (name and message)
    ['name', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) {
        // Empty field (ignoring whitespace) — mark as invalid
        setFieldError(id, formErrorMessages[id]);
        valid = false;
      } else {
        clearFieldError(id); // Clear any previous error if now filled in
      }
    });

    // Validate email separately — needs format check as well as non-empty check
    const emailEl = document.getElementById('email');
    if (emailEl) {
      if (!emailEl.value.trim()) {
        setFieldError('email', 'Please enter your email address.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
        // Regex check: must have characters before @, a domain, and a TLD
        setFieldError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        clearFieldError('email');
      }
    }

    if (!valid) {
      // Scroll smoothly to the first field with an error so the user can see it
      const first = contactForm.querySelector('.invalid');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return; // Stop here — do not submit
    }

    // All fields valid — submit to Netlify Forms via fetch()
    // Netlify intercepts POST requests to '/' when the form has data-netlify="true"
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(contactForm)).toString()
    })
    .then(() => {
      // Show success message for 7 seconds, then hide it
      if (formSuccess) {
        formSuccess.classList.add('visible');
        setTimeout(() => formSuccess.classList.remove('visible'), 7000);
      }
      // Reset all form fields to empty
      contactForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    })
    .catch(() => {
      // Network or server error — show error message for 7 seconds
      if (formError) {
        formError.classList.add('visible');
        setTimeout(() => formError.classList.remove('visible'), 7000);
      }
    });
  });

  // Live validation — clear field errors as the user types corrections
  // This gives immediate positive feedback ("the red went away, looks good now")
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      if (el.id) clearFieldError(el.id);
    });
  });
}

/* ── Mobile CTA Bar ───────────────────────────────────────────────────────────
   A fixed bottom bar on mobile (#mobileCTABar) showing quick-access
   Phone and WhatsApp buttons. This bar would overlap the contact form
   if visible at the same time, so we hide it when the contact section
   is scrolled into view.

   IntersectionObserver with threshold 0.2 means the bar hides when
   20% of the contact section is visible — early enough to avoid overlap
   but not so early that it hides while the section is still far away.

   The 'hidden-by-contact' class uses CSS to set display:none or hide
   the bar when applied.
   ─────────────────────────────────────────────────────────────────────────── */
const mobileCTABar = document.getElementById('mobileCTABar');

if (mobileCTABar) {
  // Hide the bar when the contact section is visible (avoids overlap)
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const ctaObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Toggle hidden class: true (add) when contact visible, false (remove) when not
        mobileCTABar.classList.toggle('hidden-by-contact', entry.isIntersecting);
      });
    }, { threshold: 0.2 }); // Hide when 20% of contact section is in view
    ctaObserver.observe(contactSection);
  }
}

/* ── Back to Top ──────────────────────────────────────────────────────────────
   A button (#backToTop) fixed at the bottom-right of the screen.
   It only becomes visible (via the 'visible' CSS class) once the user
   has scrolled more than 400 px down the page — at that depth it becomes
   genuinely useful. Clicking it smooth-scrolls to the top (handled in HTML
   via the button's href or scroll-link class, not duplicated here).
   ─────────────────────────────────────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    // Show button after scrolling 400px, hide at top of page
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true }); // Passive listener — never blocks scroll performance
}

/* ── Footer Year ──────────────────────────────────────────────────────────────
   Automatically updates the copyright year in the footer.
   The HTML contains: © <span id="year"></span> MPW Electrical Security
   This line replaces the span content with the current year at runtime,
   so the copyright year is always accurate without manual editing.
   ─────────────────────────────────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
