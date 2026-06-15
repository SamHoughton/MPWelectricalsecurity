/* ============================================================
   MPW — Homepage motion system (GSAP + ScrollTrigger + Lenis)
   ============================================================
   Pure enhancement: index.html is complete and readable without
   this file. Everything here *adds* motion on top:

     1. Lenis inertia smooth-scrolling, driven by GSAP's ticker
     2. Hero entrance — the gate line-work draws itself on,
        then the headline rises word-by-word through masks
     3. The signature scene — the hero pins and the gate leaves
        swing open in 3D as you scroll, passing you through
     4. Micro-interactions — magnetic CTAs, custom cursor,
        gentle parallax on tagged images

   Bails out entirely on prefers-reduced-motion or if the CDN
   libraries failed to load (page falls back to main.js reveals).
   ============================================================ */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  /* ── 1. Smooth scrolling ─────────────────────────────────────
     Lenis eases real scrollTop on rAF, so IntersectionObserver in
     main.js keeps working untouched. GSAP's ticker drives Lenis so
     ScrollTrigger and the scroll position never drift apart. */
  var lenis = null;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Route anchor clicks through Lenis (capture phase beats the
    // native-smooth handler in main.js, which would fight Lenis).
    // Because stopPropagation also silences main.js's handler, the
    // mobile-nav close it normally performs is replicated here.
    document.addEventListener('click', function (e) {
      var link = e.target.closest('a.scroll-link[href^="#"], a.nav-link[href^="#"]');
      if (!link) return;
      var target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      e.stopPropagation();

      var navMenu   = document.getElementById('navMenu');
      var navToggle = document.getElementById('navToggle');
      var overlay   = document.querySelector('.mobile-overlay');
      if (navMenu)   navMenu.classList.remove('open');
      if (navToggle) { navToggle.classList.remove('open'); navToggle.setAttribute('aria-expanded', 'false'); }
      if (overlay)   overlay.classList.remove('active');
      document.body.style.overflow = '';

      lenis.scrollTo(target, { offset: -64, duration: 1.4 });
    }, true);
  }

  /* ── 2. Hero entrance ──────────────────────────────────────── */
  var heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  // 2a. Gate draws itself: every stroke in both leaves runs from
  // zero length to full, staggered, like a pen drawing the gate.
  var strokes = gsap.utils.toArray('.gate-leaf svg line, .gate-leaf svg path, .gate-leaf svg rect');
  strokes.forEach(function (el) {
    var len = 0;
    try { len = el.getTotalLength(); } catch (err) { return; }
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
  });
  heroTl.to(strokes, {
    strokeDashoffset: 0,
    duration: 1.4,
    ease: 'power2.inOut',
    stagger: { each: 0.018, from: 'end' }   // draws from the centre stiles outward
  }, 0);
  heroTl.from('.gate-seam', { opacity: 0, duration: 1.2 }, 0.5);

  // 2b. Headline rises word-by-word through overflow masks.
  // Split is done here (not in HTML) so the no-JS page keeps a
  // clean, unwrapped H1 for SEO and screen readers.
  var h1 = document.querySelector('#hero h1');
  if (h1) {
    Array.prototype.slice.call(h1.childNodes).forEach(function (node) {
      var wrapWords = function (text, parent) {
        text.split(/\s+/).forEach(function (word) {
          if (!word) return;
          var mask = document.createElement('span');
          mask.className = 'w-mask';
          var inner = document.createElement('span');
          inner.className = 'w';
          inner.textContent = word;
          mask.appendChild(inner);
          parent.appendChild(mask);
          parent.appendChild(document.createTextNode(' '));
        });
      };
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
        var frag = document.createDocumentFragment();
        wrapWords(node.textContent, frag);
        h1.replaceChild(frag, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        var text = node.textContent;
        node.textContent = '';
        wrapWords(text, node);
      }
    });
    heroTl.from('#hero h1 .w', { yPercent: 115, duration: 0.9, stagger: 0.055 }, 0.35);
  }

  heroTl.from('.hero-kicker',      { autoAlpha: 0, y: 14, duration: 0.7 }, 0.3);
  heroTl.from('#hero .hero-desc',  { autoAlpha: 0, y: 18, duration: 0.8 }, 0.85);
  heroTl.from('#hero .hero-buttons,#hero .hero-phone', { autoAlpha: 0, y: 18, duration: 0.8, stagger: 0.12 }, 1.0);
  heroTl.from('.gate-readout',     { autoAlpha: 0, y: -10, duration: 0.7 }, 1.2);
  heroTl.from('.hero-scroll-hint', { autoAlpha: 0, duration: 0.9 }, 1.5);
  heroTl.from('.hud-frame',        { autoAlpha: 0, duration: 1.0 }, 0.2);

  /* ── 3. The scroll-through gate ────────────────────────────
     The hero pins while the leaves swing open toward the viewer
     and the scene gently scales past the camera — you walk
     through the gate into the site. Scrubbed, so the visitor's
     scroll *is* the gate motor. */
  var mm = gsap.matchMedia();
  mm.add(
    { desktop: '(min-width: 768px)', mobile: '(max-width: 767px)' },
    function (ctx) {
      // Live status wiring: as the visitor scrolls the gate open, the hero
      // readout and the framing HUD report the gate's state, so the
      // interaction reads as operating a control system, not just scrolling.
      var readoutLabel = document.querySelector('#gateReadout .gr-label');
      var readoutBar   = document.querySelector('#gateReadout .gr-bar');
      var hudStatus    = document.getElementById('hudStatus');
      var hudLabel     = hudStatus ? hudStatus.querySelector('.hud-label') : null;
      var lastState = '';
      var setState = function (state, gateText, hudText) {
        if (state === lastState) return;
        lastState = state;
        if (readoutLabel) readoutLabel.textContent = gateText;
        if (hudLabel)     hudLabel.textContent = hudText;
        // Gold dot only while actively opening; green (secured) at rest and once open.
        if (hudStatus)    hudStatus.setAttribute('data-state', state === 'opening' ? 'active' : 'secured');
      };

      var sceneTl = gsap.timeline({
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: ctx.conditions.desktop ? '+=115%' : '+=70%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: function (self) {
            var p = self.progress;
            if (readoutBar) readoutBar.style.setProperty('--gate-progress', (4 + p * 96).toFixed(1) + '%');
            if (p < 0.06)      setState('secured', 'Gate · Secured',  'MPW Control · System Secured');
            else if (p < 0.92) setState('opening', 'Gate · Opening',  'MPW Control · Gate Opening');
            else               setState('open',    'Gate · Open',     'MPW Control · Welcome Home');
          }
        }
      });
      sceneTl
        .to('.gate-leaf-left',  { rotateY: -78, ease: 'power2.in' }, 0)
        .to('.gate-leaf-right', { rotateY:  78, ease: 'power2.in' }, 0)
        .to('.gate-scene',      { scale: 1.22, ease: 'power1.in' }, 0)
        .to('.gate-seam',       { scaleX: 2.6, opacity: 0, ease: 'power1.in' }, 0.15)
        .to('.gate-readout',    { autoAlpha: 0, ease: 'power1.in' }, 0.55)
        .to('.hero-scroll-hint',{ autoAlpha: 0, duration: 0.12 }, 0)
        .to('#hero .hero-content', { scale: 1.05, autoAlpha: 0, ease: 'power1.in' }, 0.35)
        .to('.gate-leaf',       { opacity: 0, duration: 0.25 }, 0.72);
    }
  );

  /* ── 4. Micro-interactions ─────────────────────────────────── */

  // Gentle parallax on tagged imagery
  gsap.utils.toArray('[data-parallax]').forEach(function (el) {
    gsap.fromTo(el, { yPercent: 8 }, {
      yPercent: -8,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true }
    });
  });

  // Magnetic CTAs — buttons lean toward the cursor, snap back elastically
  var fineHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (fineHover) {
    gsap.utils.toArray('#hero .btn, .btn-nav-contact').forEach(function (btn) {
      var xTo = gsap.quickTo(btn, 'x', { duration: 0.4, ease: 'power3' });
      var yTo = gsap.quickTo(btn, 'y', { duration: 0.4, ease: 'power3' });
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.3);
        yTo((e.clientY - r.top - r.height / 2) * 0.3);
      });
      btn.addEventListener('mouseleave', function () { xTo(0); yTo(0); });
    });

    // Custom cursor: gold dot + trailing ring that swells over links
    var dot = document.createElement('div');
    var ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);
    document.body.classList.add('has-cursor');

    var dotX  = gsap.quickTo(dot,  'left', { duration: 0.08, ease: 'power2' });
    var dotY  = gsap.quickTo(dot,  'top',  { duration: 0.08, ease: 'power2' });
    var ringX = gsap.quickTo(ring, 'left', { duration: 0.35, ease: 'power3' });
    var ringY = gsap.quickTo(ring, 'top',  { duration: 0.35, ease: 'power3' });

    window.addEventListener('mousemove', function (e) {
      dotX(e.clientX);  dotY(e.clientY);
      ringX(e.clientX); ringY(e.clientY);
    });
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest('a, button, .config-opt')) ring.classList.add('is-active');
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest('a, button, .config-opt')) ring.classList.remove('is-active');
    });
  }

  // Recalculate pin distances once everything (fonts, images) settles
  window.addEventListener('load', function () { ScrollTrigger.refresh(); });
})();
