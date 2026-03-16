/* ============================================================
   MPW Security — Main JavaScript (Vanilla JS, no jQuery)
   ============================================================
   This file handles all interactive behaviour on the site.
   It runs on every page that includes it (index.html and all
   service/area pages). Functions that target specific elements
   (e.g. the lightbox) check whether the element exists before
   running, so nothing breaks on pages that don't have them.
   ============================================================ */

'use strict';

/* ── Preloader ────────────────────────────────────────────────────
   A full-screen spinner is shown while the page loads (see #preloader
   in index.html). Once the window 'load' event fires — meaning all
   images and scripts have finished loading — we fade it out and then
   remove it from the DOM entirely after the CSS transition completes.

   We also trigger the .reveal-hero animation here. Hero text elements
   use class="reveal-hero" and start invisible (opacity:0). Adding
   'show' triggers a CSS transition that fades them in.
   ──────────────────────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');  // CSS transition: fade to opacity 0
    setTimeout(() => preloader.remove(), 600);  // Remove from DOM after 600ms fade
  }

  // Kick off hero text animation after page load
  document.querySelectorAll('.reveal-hero').forEach(el => {
    el.classList.add('show');
  });
});

/* ── Hero Particles ───────────────────────────────────────────────
   Creates small floating gold circles in the hero section background.
   These are purely decorative and created entirely in JavaScript so
   they don't bloat the HTML. We use fewer particles on mobile to
   avoid performance issues on slower devices.

   Each particle gets a random size, horizontal position, animation
   duration, and delay so they don't all move in sync.
   ──────────────────────────────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;  // Only runs if the hero section is present

  // Use fewer particles on mobile to keep performance smooth
  const count = window.innerWidth < 768 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('hero-particle');

    // Randomise size (3–9px), horizontal position, timing
    const size     = Math.random() * 6 + 3;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 15;
    const duration = Math.random() * 12 + 10;  // 10–22 second float cycle

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

initParticles();

/* ── Sticky Header ────────────────────────────────────────────────
   The header starts transparent and becomes more opaque once the
   user scrolls down 80px. This is controlled by adding/removing
   the 'scrolled' class, which CSS then styles differently.

   We use { passive: true } on the scroll listener — this is a
   performance hint to the browser that the listener won't call
   preventDefault(), allowing the browser to scroll smoothly
   without waiting for the JS to run first.
   ──────────────────────────────────────────────────────────────── */
const header = document.getElementById('header');

function updateHeader() {
  if (!header) return;
  if (window.scrollY > 80) {
    header.classList.add('scrolled');     // CSS applies denser background
  } else {
    header.classList.remove('scrolled');  // CSS returns to transparent style
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();  // Run once immediately in case the page loads mid-scroll

/* ── Mobile Navigation ────────────────────────────────────────────
   On screens up to 991px wide, the navigation hides off-screen to
   the right. Clicking the hamburger button slides it in. A dark
   semi-transparent overlay appears behind it and can be clicked to
   close the menu.

   The openNav/closeNav functions handle all the state changes:
   adding/removing classes, updating aria-expanded for accessibility,
   and locking/unlocking body scroll so the page doesn't scroll
   behind the open menu.

   The 'Escape' key also closes the menu (keyboard accessibility).
   ──────────────────────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

// Create overlay element dynamically — it doesn't need to be in the HTML
const mobileOverlay = document.createElement('div');
mobileOverlay.classList.add('mobile-overlay');
document.body.appendChild(mobileOverlay);

function openNav() {
  navMenu.classList.add('open');
  navToggle.classList.add('open');       // Animates hamburger lines to an X
  navToggle.setAttribute('aria-expanded', 'true');
  mobileOverlay.classList.add('active'); // Shows the dark background overlay
  document.body.style.overflow = 'hidden';  // Prevents page scrolling behind menu
}

function closeNav() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';  // Re-enables page scrolling

  // Also close any open services sub-menus so they don't stay open
  // when the nav is re-opened
  document.querySelectorAll('.nav-item-dropdown.open').forEach(item => {
    item.classList.remove('open');
    const trigger = item.querySelector('[aria-expanded]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

// Set initial ARIA state for screen readers
navToggle.setAttribute('aria-expanded', 'false');
navToggle.setAttribute('aria-controls', 'navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeNav() : openNav();
});

// Clicking the dark overlay closes the menu
mobileOverlay.addEventListener('click', closeNav);

// Close on Esc
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

/* ── Services Dropdown (mobile toggle + aria) ─────────────────────
   On desktop the Services dropdown opens on hover (CSS :hover).
   On mobile (991px and below), hover doesn't work reliably, so
   clicking the "Services" nav link instead opens the sub-menu
   and prevents navigating away. This is handled here.

   e.preventDefault() stops the click from following the href link
   so the dropdown can open instead.
   ──────────────────────────────────────────────────────────────── */
document.querySelectorAll('.nav-item-dropdown').forEach(item => {
  const trigger = item.querySelector('.nav-link[aria-haspopup]');
  if (!trigger) return;

  trigger.addEventListener('click', e => {
    if (window.innerWidth <= 991) {
      e.preventDefault();  // Don't navigate — just toggle the sub-menu
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  });
});

/* ── Smooth Scroll ────────────────────────────────────────────────
   Clicking any link with href="#section-id" or class="scroll-link"
   smoothly scrolls to that section instead of jumping instantly.
   We also account for the fixed header height so the section header
   isn't hidden behind the navbar.
   ──────────────────────────────────────────────────────────────── */
document.querySelectorAll('.scroll-link, .nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;  // Ignore non-anchor links

    const target = document.querySelector(href);
    if (!target) return;  // Ignore if the target section doesn't exist

    e.preventDefault();
    closeNav();  // Close mobile menu if open

    // Calculate position, accounting for the sticky header height
    const headerH = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Active Nav on Scroll ─────────────────────────────────────────
   As the user scrolls, we highlight the corresponding navigation link
   for whichever section is currently in view. We use IntersectionObserver
   rather than scroll events for better performance.

   The rootMargin of '-40% 0px -55% 0px' means a section only counts
   as "active" when its top edge is 40% from the top of the viewport
   and before it's 55% from the bottom — in other words, when it's
   roughly in the middle of the screen.
   ──────────────────────────────────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        // Add 'active' to the matching link, remove from all others
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ── Scroll Reveal (Intersection Observer) ────────────────────────
   Elements with class="reveal-up", "reveal-left", or "reveal-right"
   start invisible (opacity:0) and off-position. When they scroll into
   view (threshold: 12% visible), we add class="visible" which triggers
   the CSS transition.

   We call unobserve() after the element has revealed itself — there's
   no need to keep watching it after the animation has played.
   ──────────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);  // Stop watching once revealed
    }
  });
}, { threshold: 0.12 });  // 12% of the element must be visible to trigger

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ── Stats Counter ────────────────────────────────────────────────
   The gold stats bar shows animated number counters (10+, 250+, etc.).
   Each number element has a data-target="250" attribute with the final
   value. When the stats bar scrolls into view, the counter animates
   from 0 up to the target value over 1,800ms using setInterval.

   The step size (inc) is calculated so the counter reaches the target
   in exactly 1,800ms when ticking every 16ms (roughly 60fps).
   ──────────────────────────────────────────────────────────────── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);  // Read target from data attribute
    const dur    = 1800;   // Total animation duration in milliseconds
    const step   = 16;     // Interval tick rate (~60fps)
    const inc    = target / (dur / step);  // How much to add per tick
    let current  = 0;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;    // Clamp to exact target value
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);

    counterObserver.unobserve(el);  // Only animate once per page load
  });
}, { threshold: 0.4 });  // Start when 40% of the stat is visible

document.querySelectorAll('.stat-number')
  .forEach(el => counterObserver.observe(el));

/* ── Portfolio Filter ─────────────────────────────────────────────
   The portfolio grid can be filtered by category (gate, barrier,
   lighting, security). Each filter button has data-filter="gate" etc.
   Each portfolio item has data-category="gate" etc.

   When a filter button is clicked:
   - The 'active' style moves to the clicked button
   - Items whose category doesn't match are hidden with display:none
     (via the CSS class .portfolio-item.hidden)
   - Items whose category matches are shown

   The lightbox (below) respects the current filter — when you
   navigate prev/next it only loops through visible items.
   ──────────────────────────────────────────────────────────────── */
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Move active state to clicked button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      // 'all' shows everything; otherwise only show matching category
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

/* ── Lightbox ─────────────────────────────────────────────────────
   Clicking a portfolio image opens it full-screen in a custom lightbox
   overlay. The lightbox shows the image, a caption, and prev/next
   navigation. It only navigates through currently *visible* portfolio
   items (respecting the active filter).

   The lightbox can be closed by:
   - Clicking the X button
   - Clicking outside the image (on the dark overlay)
   - Pressing Escape

   Images can be navigated by:
   - Clicking the prev/next arrow buttons
   - Using keyboard arrow keys
   - Swiping left/right on touchscreen
   ──────────────────────────────────────────────────────────────── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');

// Tracks which image is currently shown (index within visible items)
let currentIndex = 0;

/* Opens the lightbox with a specific image */
function openLightbox(src, title, index) {
  lightboxImg.src = src;
  lightboxImg.alt = title;
  lightboxCaption.textContent = title;
  currentIndex = index;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';  // Lock page scroll
}

/* Closes the lightbox and clears the image source */
function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';  // Restore page scroll
  // Delay clearing src so the image doesn't disappear before the fade-out completes
  setTimeout(() => { lightboxImg.src = ''; }, 350);
}

/* Navigates to a different image by index.
   Uses modulo arithmetic (%) to wrap around — so going past the last
   image loops back to the first, and going before the first loops to the last. */
function showLightboxItem(index) {
  // Only consider currently visible items (not hidden by filter)
  const items = Array.from(portfolioItems).filter(i => !i.classList.contains('hidden'));
  if (!items.length) return;

  // Wrap around using modulo — e.g. index -1 with 10 items = index 9
  currentIndex = (index + items.length) % items.length;
  const btn = items[currentIndex].querySelector('.portfolio-zoom-btn');
  if (btn) {
    lightboxImg.src = btn.dataset.src;
    lightboxImg.alt = btn.dataset.title;
    lightboxCaption.textContent = btn.dataset.title;
  }
}

/* Attach click listener to every zoom button in the portfolio grid */
document.querySelectorAll('.portfolio-zoom-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Find this item's position among visible items
    const visItems = Array.from(portfolioItems).filter(item => !item.classList.contains('hidden'));
    const visIndex = visItems.indexOf(btn.closest('.portfolio-item'));
    openLightbox(btn.dataset.src, btn.dataset.title, visIndex);
  });
});

if (lightbox) {
  lightboxClose.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click',  () => showLightboxItem(currentIndex - 1));
  lightboxNext.addEventListener('click',  () => showLightboxItem(currentIndex + 1));

  // Clicking the dark overlay background (not the image) also closes it
  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation for the lightbox
  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('active')) return;  // Only when lightbox is open
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  showLightboxItem(currentIndex - 1);
    if (e.key === 'ArrowRight') showLightboxItem(currentIndex + 1);
  });

  /* ── Lightbox Touch Swipe (mobile) ───────────────────────────
     On touchscreen devices, users can swipe left/right to navigate
     between images. We record the starting position on touchstart
     and calculate the direction on touchend.

     We ignore swipes that are more vertical than horizontal (e.g.
     someone scrolling the page who happens to touch the lightbox)
     by comparing the absolute horizontal distance (dx) against the
     absolute vertical distance (dy). We also require a minimum
     swipe distance of 40px to avoid triggering on tiny accidental movements.
     ──────────────────────────────────────────────────────────── */
  let touchStartX = 0;
  let touchStartY = 0;

  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });

  lightbox.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;

    // Only respond to primarily horizontal swipes (dx > dy)
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return;

    if (dx < 0) {
      showLightboxItem(currentIndex + 1); // swipe left → next
    } else {
      showLightboxItem(currentIndex - 1); // swipe right → prev
    }
  }, { passive: true });
}

/* ── Contact Form ─────────────────────────────────────────────────
   The contact form on index.html validates the required fields
   (name, email, message) before submitting to Netlify Forms.

   Validation runs on submit. If fields are invalid, inline error
   messages appear below the field and the page scrolls to the
   first error. Once the user starts typing in an invalid field,
   the error message clears immediately (live validation).

   On success, a green success banner appears for 7 seconds.
   On network failure, a red error banner appears for 7 seconds
   with Matt's phone number as a fallback.
   ──────────────────────────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const formError   = document.getElementById('formError');

const formErrorMessages = {
  name:    'Please enter your name.',
  email:   'Please enter a valid email address.',
  message: 'Please enter a message.'
};

/* Marks a field as invalid and adds/updates the error message text below it */
function setFieldError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('invalid');

  // Add or update inline error text
  let errEl = el.parentElement.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.setAttribute('role', 'alert');  // Screen readers announce this immediately
    el.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
}

/* Removes the invalid state and error message from a field */
function clearFieldError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('invalid');
  const errEl = el.parentElement.querySelector('.field-error');
  if (errEl) errEl.remove();
}

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();  // Stop the default HTML form submission

    let valid = true;

    // Validate required text fields
    ['name', 'message'].forEach(id => {
      const el = document.getElementById(id);
      if (el && !el.value.trim()) {
        setFieldError(id, formErrorMessages[id]);
        valid = false;
      } else {
        clearFieldError(id);
      }
    });

    // Validate email — check it's present and has a valid-ish format
    const emailEl = document.getElementById('email');
    if (emailEl) {
      if (!emailEl.value.trim()) {
        setFieldError('email', 'Please enter your email address.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
        // Basic regex: must have characters, @ symbol, domain, and extension
        setFieldError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        clearFieldError('email');
      }
    }

    if (!valid) {
      // Scroll to first invalid field so the user can see the error
      const first = contactForm.querySelector('.invalid');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Submit to Netlify Forms via fetch (AJAX POST)
    // Netlify detects forms with data-netlify="true" and handles storage
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
      // Reset all form fields after successful submission
      contactForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
    })
    .catch(() => {
      // Network or server error — show fallback message with phone number
      if (formError) {
        formError.classList.add('visible');
        setTimeout(() => formError.classList.remove('visible'), 7000);
      }
    });
  });

  // Clear errors live as user types — improves the user experience
  // by removing error messages as soon as the user starts correcting a field
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      if (el.id) clearFieldError(el.id);
    });
  });
}

/* ── Mobile CTA Bar ───────────────────────────────────────────────
   A sticky bar fixed to the bottom of the screen on mobile shows
   quick-access Call, WhatsApp, and Free Quote buttons. We hide this
   bar when the main contact section scrolls into view — otherwise the
   CTA bar would overlap the contact form which is redundant and confusing.

   IntersectionObserver watches the #contact section. When 20% of it
   is visible, we add 'hidden-by-contact' to the bar, which CSS hides.
   ──────────────────────────────────────────────────────────────── */
const mobileCTABar = document.getElementById('mobileCTABar');

if (mobileCTABar) {
  // Hide the bar when the contact section is visible (avoids overlap)
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const ctaObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        mobileCTABar.classList.toggle('hidden-by-contact', entry.isIntersecting);
      });
    }, { threshold: 0.2 });  // Hide when 20% of the contact section is visible
    ctaObserver.observe(contactSection);
  }
}

/* ── Back to Top ──────────────────────────────────────────────────
   A circular gold button appears in the bottom-right corner once the
   user has scrolled more than 400px down the page. Clicking it uses
   the smooth scroll system (the button has class="scroll-link" and
   href="#hero"). The visibility is toggled via the 'visible' class.
   ──────────────────────────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

if (backToTop) {
  window.addEventListener('scroll', () => {
    // Show after 400px of scroll, hide if scrolled back near the top
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
}

/* ── Footer Year ──────────────────────────────────────────────────
   The copyright year in the footer is set dynamically so it always
   shows the current year without needing a manual update each January.
   The span with id="year" in the footer receives the current year.
   ──────────────────────────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
