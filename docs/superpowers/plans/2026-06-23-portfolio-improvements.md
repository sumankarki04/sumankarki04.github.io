# Portfolio Improvements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix 5 known issues and apply a light polish pass to the existing single-page portfolio.

**Architecture:** Surgical in-place edits to two existing files (`index.html`, `style.css`). No framework, no build step, no new sections. This is a static site served by GitHub Pages, so "tests" are manual verification: open in a browser, validate HTML, and check keyboard/reduced-motion behavior.

**Tech Stack:** Plain HTML5, CSS3, vanilla JS. No tooling.

**Spec:** `docs/superpowers/specs/2026-06-23-portfolio-improvements-design.md`

---

## File Map

- `index.html` — markup, meta, inline `<script>`. Touched by Tasks 1–5.
- `style.css` — all styles. Touched by Tasks 1, 6.

No-change items (recorded in spec, no task): brand spelling "Ghar Aangan", host/canonical `sumankarki04.github.io`.

---

### Task 1: Remove nested interactive elements from project cards

**Files:**
- Modify: `index.html` (both `<article class="card">` blocks + inline `<script>`)
- Modify: `style.css` (card link styles)

- [ ] **Step 1: Edit the INFUX card opening tag**

Find:
```html
<article class="card reveal" tabindex="0" role="link" aria-label="Open INFUX" data-href="https://infux.onrender.com">
```
Replace with:
```html
<article class="card reveal">
```

- [ ] **Step 2: Make the INFUX `<h3>` the link**

Find:
```html
<h3>INFUX</h3>
```
Replace with:
```html
<h3><a href="https://infux.onrender.com" target="_blank" rel="noopener">INFUX</a></h3>
```

- [ ] **Step 3: Edit the Ghar Aangan card opening tag**

Find:
```html
<article class="card reveal" tabindex="0" role="link" aria-label="Open Ghar Aangan" data-href="https://ghar-aagan.onrender.com">
```
Replace with:
```html
<article class="card reveal">
```

- [ ] **Step 4: Make the Ghar Aangan `<h3>` the link**

Find:
```html
<h3>Ghar Aangan</h3>
```
Replace with:
```html
<h3><a href="https://ghar-aagan.onrender.com" target="_blank" rel="noopener">Ghar Aangan</a></h3>
```

- [ ] **Step 5: Remove the card-click JS handler**

Find and delete this entire block from the inline `<script>`:
```javascript
      // Card click / keyboard -> open live site
      document.querySelectorAll('.card[data-href]').forEach(function (card) {
        var go = function () { window.open(card.dataset.href, '_blank', 'noopener'); };
        card.addEventListener('click', go);
        card.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
        });
      });
```

- [ ] **Step 6: Replace the card-link CSS rule**

In `style.css`, find:
```css
/* ── CARD AS LINK ── */
.card[role="link"] { cursor: pointer; }
```
Replace with:
```css
/* ── CARD TITLE LINK ── */
.card h3 a { color: inherit; text-decoration: none; transition: color 0.2s; }
.card h3 a:hover { color: var(--accent); }
```

- [ ] **Step 7: Verify in browser + keyboard**

Open `index.html` in a browser. Confirm:
- Clicking a project title opens the live site in a new tab.
- The "Open Project ↗" and "GitHub ↗" buttons still work.
- Tab key reaches the title link, then the buttons — focus ring visible on each.
- No clicking the empty card body does anything (intended — only title/buttons are links now).

- [ ] **Step 8: Commit**

```bash
cd "/e/MY PORTFOLIO"
git add index.html style.css
git commit -m "fix: remove nested interactive elements from project cards"
```

---

### Task 2: Make the Skills section honest

**Files:**
- Modify: `index.html` (skills section)

- [ ] **Step 1: Remove Java from Languages**

Find:
```html
          <span>Python</span><span>JavaScript</span><span>HTML/CSS</span><span>SQL</span><span>Java</span>
```
Replace with:
```html
          <span>Python</span><span>JavaScript</span><span>HTML/CSS</span><span>SQL</span>
```

- [ ] **Step 2: Remove FastAPI from Frameworks**

Find:
```html
          <span>Flask</span><span>FastAPI</span><span>SQLAlchemy</span><span>WTForms</span><span>Bootstrap 5</span>
```
Replace with:
```html
          <span>Flask</span><span>SQLAlchemy</span><span>WTForms</span><span>Bootstrap 5</span>
```

- [ ] **Step 3: Add a "Learning / Exploring" group**

Find the Databases group (the last `.skill-group` in `.skills-grid`):
```html
      <div class="skill-group reveal">
        <h4>Databases</h4>
        <div class="skill-items">
          <span>PostgreSQL</span><span>SQLite</span><span>Supabase</span><span>ChromaDB</span>
        </div>
      </div>
```
Add immediately after it (still inside `.skills-grid`):
```html
      <div class="skill-group reveal">
        <h4>Learning / Exploring</h4>
        <div class="skill-items">
          <span>Java</span><span>FastAPI</span>
        </div>
      </div>
```

- [ ] **Step 4: Verify**

Open `index.html`. Skills section shows 5 groups. Languages no longer lists Java; Frameworks no longer lists FastAPI; new "Learning / Exploring" group lists both.

- [ ] **Step 5: Commit**

```bash
cd "/e/MY PORTFOLIO"
git add index.html
git commit -m "content: move Java and FastAPI to a Learning group"
```

---

### Task 3: Add LinkedIn links (contact + footer)

**Files:**
- Modify: `index.html` (contact section, footer)

- [ ] **Step 1: Add LinkedIn to the contact section**

Find:
```html
    <a href="https://github.com/sumankarki04" target="_blank" rel="noopener" class="btn-primary big reveal">github.com/sumankarki04 ↗</a>
```
Replace with:
```html
    <div class="contact-links reveal">
      <a href="https://github.com/sumankarki04" target="_blank" rel="noopener" class="btn-primary big">github.com/sumankarki04 ↗</a>
      <a href="https://www.linkedin.com/in/suman-karki-98709b33a/" target="_blank" rel="noopener" class="btn-ghost big">LinkedIn ↗</a>
    </div>
```

- [ ] **Step 2: Add `.contact-links` and `.btn-ghost.big` styles**

In `style.css`, find the CONTACT block:
```css
.contact-sub {
  color: var(--muted2);
  font-size: 0.95rem;
  max-width: 540px;
}
```
Add immediately after it:
```css
.contact-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
}
.btn-ghost.big { font-size: 0.9rem; padding: 1rem 2.2rem; }
```

- [ ] **Step 3: Add LinkedIn to the footer**

Find:
```html
  <footer>
    <span>© 2026 Suman Karki</span>
    <span>Designed, coded &amp; deployed by me — every line</span>
  </footer>
```
Replace with:
```html
  <footer>
    <span>© 2026 Suman Karki</span>
    <span><a href="https://www.linkedin.com/in/suman-karki-98709b33a/" target="_blank" rel="noopener">LinkedIn</a> · Designed, coded &amp; deployed by me — every line</span>
  </footer>
```

- [ ] **Step 4: Add footer link color**

In `style.css`, find the FOOTER block:
```css
footer {
  border-top: 1px solid var(--border);
  padding: 2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--muted);
  max-width: 1100px;
  margin: 0 auto;
}
```
Add immediately after it:
```css
footer a { color: var(--accent); text-decoration: none; }
footer a:hover { text-decoration: underline; }
```

- [ ] **Step 5: Verify**

Open `index.html`. Contact section shows two buttons (GitHub primary, LinkedIn ghost) side by side, centered, wrapping on mobile. Footer shows a LinkedIn link. Both LinkedIn links open `https://www.linkedin.com/in/suman-karki-98709b33a/` in a new tab.

- [ ] **Step 6: Commit**

```bash
cd "/e/MY PORTFOLIO"
git add index.html style.css
git commit -m "feat: add LinkedIn links to contact and footer"
```

---

### Task 4: Tighten the meta description

**Files:**
- Modify: `index.html` (`<meta name="description">`)

- [ ] **Step 1: Replace the description**

Find:
```html
  <meta name="description" content="Suman Karki — solo full-stack developer in Kathmandu, Nepal. I take web products from an empty repo to a live URL by myself. Two in production: INFUX (influencer–brand marketplace) and Ghar Aangan (home-services booking). Python · Flask · PostgreSQL." />
```
Replace with:
```html
  <meta name="description" content="Suman Karki — solo full-stack developer in Kathmandu, Nepal. Python · Flask · PostgreSQL. Two live products: INFUX and Ghar Aangan." />
```

- [ ] **Step 2: Verify length**

Run:
```bash
cd "/e/MY PORTFOLIO"
grep -o 'name="description" content="[^"]*"' index.html | sed 's/name="description" content="//; s/"$//' | wc -c
```
Expected: under 165 (chars, including the trailing newline `wc` counts).

- [ ] **Step 3: Commit**

```bash
cd "/e/MY PORTFOLIO"
git add index.html
git commit -m "seo: tighten meta description to ~155 chars"
```

---

### Task 5: Activate first nav link on load

**Files:**
- Modify: `index.html` (inline `<script>`, nav section)

- [ ] **Step 1: Default-activate the first nav link**

Find:
```javascript
      // Active nav link on scroll
      var sections = document.querySelectorAll('section[id], header.hero');
      var navLinks = document.querySelectorAll('nav ul a');
```
Replace with:
```javascript
      // Active nav link on scroll
      var sections = document.querySelectorAll('section[id], header.hero');
      var navLinks = document.querySelectorAll('nav ul a');
      // Default-activate the first nav link before any scroll
      if (navLinks.length) { navLinks[0].classList.add('active'); }
```

- [ ] **Step 2: Verify**

Open `index.html` and do NOT scroll. The "Projects" nav link shows the active accent color + underline immediately. Scrolling to other sections moves the active state as before.

- [ ] **Step 3: Commit**

```bash
cd "/e/MY PORTFOLIO"
git add index.html
git commit -m "fix: activate first nav link on load"
```

---

### Task 6: Respect reduced-motion for the hero ticker

**Files:**
- Modify: `style.css` (reduced-motion block)

- [ ] **Step 1: Stop the ticker under reduced-motion**

In `style.css`, find the REDUCED MOTION block:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
}
```
Replace with:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
    scroll-behavior: auto !important;
  }
  .reveal { opacity: 1; transform: none; }
  .hero-ticker span { animation: none !important; transform: none !important; }
}
```

- [ ] **Step 2: Verify**

Enable OS "reduce motion" (Windows: Settings → Accessibility → Visual effects → Animation effects OFF). Reload `index.html`. The hero ticker text is static (not scrolling). Disable reduce-motion and reload: ticker scrolls again.

- [ ] **Step 3: Commit**

```bash
cd "/e/MY PORTFOLIO"
git add style.css
git commit -m "a11y: stop hero ticker under prefers-reduced-motion"
```

---

### Task 7: Final external-link audit + full verification

**Files:**
- None modified unless an issue is found.

- [ ] **Step 1: Audit `target="_blank"` for `rel="noopener"`**

Run:
```bash
cd "/e/MY PORTFOLIO"
grep -n 'target="_blank"' index.html
```
Expected: every line that has `target="_blank"` also contains `rel="noopener"`. If any is missing `rel="noopener"`, add it, then `git add index.html && git commit -m "fix: add rel=noopener to external link"`.

- [ ] **Step 2: Confirm no dead hrefs**

Run:
```bash
cd "/e/MY PORTFOLIO"
grep -n 'href="#"' index.html
```
Expected: only the nav-logo `<a href="#" class="nav-logo">` (intentional "home"). No other bare `#`.

- [ ] **Step 3: Full browser pass**

Open `index.html`. Walk through:
- Hero, Projects (title links + buttons), About, Skills (5 groups), Contact (2 buttons), Footer (LinkedIn link).
- Resize to ~700px: nav, stats, contact-links, footer all wrap cleanly.
- Tab from top to bottom: skip-link appears first, focus ring visible on every interactive element, no focus trap.

- [ ] **Step 4: Final commit (if Step 1 changed anything; otherwise skip)**

No-op if Steps 1–3 found nothing.

---

## Self-Review

**Spec coverage:**
- 5 fixes: nested links → Task 1; brand → no-change (noted); skills honesty → Task 2; contact links → Task 3; host/canonical → no-change (noted). ✓
- Light polish: meta description → Task 4; active nav on load → Task 5; reduced-motion ticker → Task 6; external-link audit → Task 7; `preview.png` size → noted only (no task, per spec); microcopy → folded into "no task" (optional, deferred — not blocking). ✓

**Note on microcopy:** Spec Section 2 item 6 (microcopy pass) was optional. Omitted from tasks to keep the diff reviewable and the author's voice untouched. Can be added later if requested.

**Placeholder scan:** No TBD/TODO. Every code step shows exact find/replace content. ✓

**Type/name consistency:** Class names used in CSS (`.contact-links`, `.btn-ghost.big`, `.card h3 a`, `footer a`, `.hero-ticker span`) all correspond to markup added/edited in the same or prior tasks. ✓
