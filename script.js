// Portfolio Book — scroll-driven page-flip engine
// The page has an invisible "runway" (.scroll-track) that is
// states × 100vh tall. The book itself is fixed on screen; scroll
// progress (0..totalSheets) drives each sheet's rotateY every frame,
// so pages follow the wheel/finger mid-flip — no snapping.
(function () {
  'use strict';

  var sheets = Array.prototype.slice.call(document.querySelectorAll('.sheet'));
  var track = document.getElementById('scrollTrack');
  var prevBtn = document.getElementById('prevBtn');
  var nextBtn = document.getElementById('nextBtn');
  var dotsBox = document.getElementById('dots');
  var pageLabel = document.getElementById('pageLabel');
  var scrollHint = document.getElementById('scrollHint');

  var total = sheets.length;          // number of leaves
  var states = total + 1;             // 0 flipped .. all flipped
  var labels = ['Cover', 'About · INFUX', 'Ghar Aangan · Skills', 'Contact'];

  // Runway height: one viewport per state, plus one for the start.
  function sizeTrack() {
    track.style.height = (states * 100) + 'vh';
  }
  sizeTrack();
  window.addEventListener('resize', sizeTrack);

  function maxScroll() {
    return Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }

  // Continuous progress in leaves: 0 = cover, total = fully open at the end.
  function progress() {
    return (window.scrollY / maxScroll()) * total;
  }

  // ---- dots ----
  var dots = [];
  for (var i = 0; i < states; i++) {
    (function (index) {
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('aria-label', labels[index] || 'Page ' + (index + 1));
      dot.addEventListener('click', function () { goTo(index); });
      dotsBox.appendChild(dot);
      dots.push(dot);
    })(i);
  }

  // ---- render loop (rAF-throttled scroll) ----
  var ticking = false;
  var bookEl = document.getElementById('theBook');
  var wideQuery = window.matchMedia('(min-width: 1100px)');

  function render() {
    ticking = false;
    var p = progress();                       // e.g. 1.37 = sheet 0 flipped, sheet 1 at 37%
    var nearest = Math.round(p);
    var wide = wideQuery.matches;

    // Desktop: true two-page spread. A flipped leaf lands LEFT of the
    // spine, so slide the whole book right as it opens to keep the
    // spine centered on screen.
    bookEl.style.transform = wide
      ? 'translateX(' + (Math.min(1, p) * 50) + '%)'
      : 'none';

    sheets.forEach(function (sheet, i) {
      var amount = Math.min(1, Math.max(0, p - i));   // 0..1 flip amount for this leaf

      // Narrow screens: no room for a spread — flip "in place":
      // translateX(100%) + rotateY(-180°) maps the leaf back onto its
      // own box, so the back face replaces the front like a card flip.
      sheet.style.transform = wide
        ? 'rotateY(' + (amount * -180) + 'deg)'
        : 'translateX(' + (amount * 100) + '%) rotateY(' + (amount * -180) + 'deg)';

      // Stacking: once a leaf passes half-flip it belongs to the left pile.
      sheet.style.zIndex = (amount > 0.5)
        ? (i + 1)                    // left pile: later leaves on top
        : (total - i + total);       // right pile: earlier leaves on top
    });

    prevBtn.disabled = nearest <= 0;
    nextBtn.disabled = nearest >= states - 1;
    dots.forEach(function (dot, i) { dot.classList.toggle('active', i === nearest); });
    if (pageLabel) pageLabel.textContent = labels[nearest] || '';
    if (scrollHint) scrollHint.classList.toggle('hidden', window.scrollY > 40);
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(render);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  wideQuery.addEventListener('change', render);

  // ---- jumps (buttons, dots, cover CTAs, keys) → smooth-scroll there;
  //      the scroll handler animates the flip on the way. ----
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goTo(state) {
    var target = (Math.max(0, Math.min(states - 1, state)) / total) * maxScroll();
    window.scrollTo({ top: target, behavior: reduce ? 'auto' : 'smooth' });
  }

  prevBtn.addEventListener('click', function () { goTo(Math.round(progress()) - 1); });
  nextBtn.addEventListener('click', function () { goTo(Math.round(progress()) + 1); });

  document.querySelectorAll('[data-goto]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      goTo(parseInt(btn.dataset.goto, 10));
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); goTo(Math.round(progress()) + 1); }
    if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); goTo(Math.round(progress()) - 1); }
  });

  // Mouse glow follows cursor (respects reduced motion).
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    var glow = document.querySelector('.bg-glow');
    window.addEventListener('pointermove', function (e) {
      glow.style.setProperty('--mx', e.clientX + 'px');
      glow.style.setProperty('--my', e.clientY + 'px');
    });
  }

  render();
})();
