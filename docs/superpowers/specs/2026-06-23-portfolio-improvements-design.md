# Portfolio Improvements — Design Spec

**Date:** 2026-06-23
**Project:** MY PORTFOLIO (static site — `index.html`, `style.css`, `preview.png`)
**Host:** https://sumankarki04.github.io/ (GitHub Pages — confirmed default, unchanged)

## Goal

Improve the existing single-page portfolio: fix 5 known issues plus a light polish
pass. No framework, no build step, no new sections. Surgical edits to the two
existing source files only.

## Approach

Surgical in-place edits to `index.html` and `style.css`. Rejected alternatives:
templated/component refactor (overkill for a 3-file static site — YAGNI) and visual
redesign (not needed — design is good).

## Scope

### Section 1 — The 5 fixes

1. **Remove nested interactive elements.**
   The project cards use `role="link"` + `data-href` + a JS click handler while also
   containing real `<a>` buttons. This nests interactive elements (a11y violation).
   - Remove `role="link"`, `tabindex="0"`, `aria-label`, and `data-href` from `.card`.
   - Remove the card-click / keydown JS handler block.
   - Make each card `<h3>` title an `<a>` linking to the live project URL.
   - Keep existing "Open Project ↗" and "GitHub ↗" buttons.
   - Update CSS: drop `.card[role="link"] { cursor: pointer }`; style `.card h3 a`.

2. **Brand spelling.**
   Display name "Ghar Aangan" is kept. Live URL is `ghar-aagan.onrender.com` (real —
   not changed). No fake text introduced. No change unless user later confirms a
   different correct spelling.

3. **Skills honesty.**
   Move `Java` (Languages) and `FastAPI` (Frameworks) into a new skill group titled
   "Learning / Exploring". Languages and Frameworks groups then reflect only what the
   shipped projects demonstrate.

4. **Contact links.**
   Add LinkedIn to the contact section and footer.
   - LinkedIn URL: `https://www.linkedin.com/in/suman-karki-98709b33a/`
   - No email shown (user opted out).
   - All new external links: `target="_blank" rel="noopener"`.

5. **Host / canonical confirm.**
   `canonical`, `og:url`, `og:image`, `twitter:image` already point to
   `sumankarki04.github.io`. Confirmed correct — no change.

### Section 2 — Light polish

1. **Meta description length.** Current `<meta name="description">` is ~290 chars
   (Google truncates ~160). Rewrite to a single ~155-char line, keeping core keywords
   (Suman Karki, full-stack, Flask, Nepal, INFUX, Ghar Aangan).
2. **Active nav on load.** Set the Projects/Hero nav link active on first paint (before
   any scroll). Small addition to existing nav IntersectionObserver logic.
3. **Reduced-motion ticker.** The hero ticker marquee animation does not respect
   `prefers-reduced-motion`. Add it to the reduced-motion CSS block so the marquee stops.
4. **External-link audit.** Verify every `target="_blank"` has `rel="noopener"`
   (already true on current links — verification step, fix any missed).
5. **`preview.png` size note.** 242 KB. Noted only; no compression unless user requests.
6. **Microcopy.** One light tightening pass on hero/about, preserving the author's voice.

## Out of scope (YAGNI)

No framework, no build step, no new sections (blog / case studies), no light-mode
toggle, no analytics, no email contact, no domain change.

## Verification

- Open `index.html` in a browser; eyeball each section + mobile width (700px breakpoint).
- All links resolve (no dead links / no `#`-only hrefs).
- HTML validates with no nested-interactive warning.
- Keyboard tab-through: focus ring visible, skip-link works, card title link reachable.
- Toggle OS reduced-motion: hero ticker stops, reveals don't animate.

## Files touched

- `index.html`
- `style.css`
