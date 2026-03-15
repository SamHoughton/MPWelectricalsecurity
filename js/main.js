/* ============================================================
   MPW Security — Main JavaScript (Vanilla JS, no jQuery)
   ============================================================ */

'use strict';

/* ── Preloader ────────────────────────────────────────────── */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    preloader.classList.add('hidden');
    setTimeout(() => preloader.remove(), 600);
  }

  // Kick off hero text animation after page load
  document.querySelectorAll('.reveal-hero').forEach(el => {
    el.classList.add('show');
  });
});

/* ── Hero Particles ───────────────────────────────────────── */
function initParticles() {
  const container = document.getElementById('heroParticles');
  if (!container) return;

  const count = window.innerWidth < 768 ? 12 : 22;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('span');
    p.classList.add('hero-particle');

    const size     = Math.random() * 6 + 3;
    const left     = Math.random() * 100;
    const delay    = Math.random() * 15;
    const duration = Math.random() * 12 + 10;

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

/* ── Sticky Header ────────────────────────────────────────── */
const header = document.getElementById('header');

function updateHeader() {
  if (window.scrollY > 80) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', updateHeader, { passive: true });
updateHeader();

/* ── Mobile Navigation ────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');

// Create overlay element
const mobileOverlay = document.createElement('div');
mobileOverlay.classList.add('mobile-overlay');
document.body.appendChild(mobileOverlay);

function openNav() {
  navMenu.classList.add('open');
  navToggle.classList.add('open');
  navToggle.setAttribute('aria-expanded', 'true');
  mobileOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeNav() {
  navMenu.classList.remove('open');
  navToggle.classList.remove('open');
  navToggle.setAttribute('aria-expanded', 'false');
  mobileOverlay.classList.remove('active');
  document.body.style.overflow = '';

  // Reset all open service sub-menus
  document.querySelectorAll('.nav-item-dropdown.open').forEach(item => {
    item.classList.remove('open');
    const trigger = item.querySelector('[aria-expanded]');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  });
}

navToggle.setAttribute('aria-expanded', 'false');
navToggle.setAttribute('aria-controls', 'navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.contains('open') ? closeNav() : openNav();
});

mobileOverlay.addEventListener('click', closeNav);

// Close on Esc
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeNav();
});

/* ── Services Dropdown (mobile toggle + aria) ─────────────── */
document.querySelectorAll('.nav-item-dropdown').forEach(item => {
  const trigger = item.querySelector('.nav-link[aria-haspopup]');
  if (!trigger) return;

  trigger.addEventListener('click', e => {
    if (window.innerWidth <= 991) {
      e.preventDefault();
      const isOpen = item.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }
  });
});

/* ── Smooth Scroll ────────────────────────────────────────── */
document.querySelectorAll('.scroll-link, .nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();
    closeNav();

    const headerH = header.offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    window.scrollTo({ top, behavior: 'smooth' });
  });
});

/* ── Active Nav on Scroll ─────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => navObserver.observe(s));

/* ── Scroll Reveal (Intersection Observer) ────────────────── */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right')
  .forEach(el => revealObserver.observe(el));

/* ── Stats Counter ────────────────────────────────────────── */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;

    const el     = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const dur    = 1800;
    const step   = 16;
    const inc    = target / (dur / step);
    let current  = 0;

    const timer = setInterval(() => {
      current += inc;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = Math.floor(current);
    }, step);

    counterObserver.unobserve(el);
  });
}, { threshold: 0.4 });

document.querySelectorAll('.stat-number')
  .forEach(el => counterObserver.observe(el));

/* ── Portfolio Filter ─────────────────────────────────────── */
const filterBtns     = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      const match = filter === 'all' || item.dataset.category === filter;
      item.classList.toggle('hidden', !match);
    });
  });
});

/* ── Lightbox ─────────────────────────────────────────────── */
const lightbox        = document.getElementById('lightbox');
const lightboxImg     = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose   = document.getElementById('lightboxClose');
const lightboxPrev    = document.getElementById('lightboxPrev');
const lightboxNext    = document.getElementById('lightboxNext');

let currentIndex = 0;

function openLightbox(src, title, index) {
  lightboxImg.src = src;
  lightboxImg.alt = title;
  lightboxCaption.textContent = title;
  currentIndex = index;
  lightbox.classList.add('active');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 350);
}

function showLightboxItem(index) {
  const items = Array.from(portfolioItems).filter(i => !i.classList.contains('hidden'));
  if (!items.length) return;

  currentIndex = (index + items.length) % items.length;
  const btn = items[currentIndex].querySelector('.portfolio-zoom-btn');
  if (btn) {
    lightboxImg.src = btn.dataset.src;
    lightboxImg.alt = btn.dataset.title;
    lightboxCaption.textContent = btn.dataset.title;
  }
}

document.querySelectorAll('.portfolio-zoom-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const visItems = Array.from(portfolioItems).filter(item => !item.classList.contains('hidden'));
    const visIndex = visItems.indexOf(btn.closest('.portfolio-item'));
    openLightbox(btn.dataset.src, btn.dataset.title, visIndex);
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click',  () => showLightboxItem(currentIndex - 1));
lightboxNext.addEventListener('click',  () => showLightboxItem(currentIndex + 1));

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', e => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape')     closeLightbox();
  if (e.key === 'ArrowLeft')  showLightboxItem(currentIndex - 1);
  if (e.key === 'ArrowRight') showLightboxItem(currentIndex + 1);
});

/* ── Lightbox Touch Swipe (mobile) ───────────────────────── */
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

/* ── Contact Form ─────────────────────────────────────────── */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

const formErrorMessages = {
  name:    'Please enter your name.',
  email:   'Please enter a valid email address.',
  message: 'Please enter a message.'
};

function setFieldError(id, message) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('invalid');

  // Add or update inline error text
  let errEl = el.parentElement.querySelector('.field-error');
  if (!errEl) {
    errEl = document.createElement('span');
    errEl.className = 'field-error';
    errEl.setAttribute('role', 'alert');
    el.parentElement.appendChild(errEl);
  }
  errEl.textContent = message;
}

function clearFieldError(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('invalid');
  const errEl = el.parentElement.querySelector('.field-error');
  if (errEl) errEl.remove();
}

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();

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

    // Validate email
    const emailEl = document.getElementById('email');
    if (emailEl) {
      if (!emailEl.value.trim()) {
        setFieldError('email', 'Please enter your email address.');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
        setFieldError('email', 'Please enter a valid email address.');
        valid = false;
      } else {
        clearFieldError('email');
      }
    }

    if (!valid) {
      // Scroll to first invalid field
      const first = contactForm.querySelector('.invalid');
      if (first) first.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Submit to Netlify Forms
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(contactForm)).toString()
    })
    .then(() => {
      formSuccess.classList.add('visible');
      contactForm.querySelectorAll('input, select, textarea').forEach(el => el.value = '');
      setTimeout(() => formSuccess.classList.remove('visible'), 7000);
    })
    .catch(() => {
      alert('Sorry, there was a problem sending your message. Please call us on 07434 001222.');
    });
  });

  // Clear errors live as user types
  contactForm.querySelectorAll('input, textarea').forEach(el => {
    el.addEventListener('input', () => {
      if (el.id) clearFieldError(el.id);
    });
  });
}

/* ── Mobile CTA Bar ───────────────────────────────────────── */
const mobileCTABar = document.getElementById('mobileCTABar');

if (mobileCTABar) {
  // Hide the bar when the contact section is visible (avoids overlap)
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    const ctaObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        mobileCTABar.classList.toggle('hidden-by-contact', entry.isIntersecting);
      });
    }, { threshold: 0.2 });
    ctaObserver.observe(contactSection);
  }
}

/* ── Back to Top ──────────────────────────────────────────── */
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ── Footer Year ──────────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
