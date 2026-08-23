# Jewellery Landing Page — Prompt Kit

Brief: traditional gold/bridal jewellery store · clean, modern, understated luxury · blog section + catalog · no e-commerce (enquiry/visit-store CTAs only).

Design direction baked into these prompts (so whoever runs them doesn't default to generic AI-page look):
- **Palette — deliberately tight, 4 tones only:** porcelain ivory `#FAF8F3` (background — airier than a warm cream, reads as "gallery," not "cozy"), soft ink `#1C1A17` (text — warm black, not pure #000), antique brass `#9C7A45` (the only accent — thin lines, small labels, hover states; never used as a fill or background), warm grey `#DEDAD2` (hairlines/dividers only). No secondary accent colour by default — the restraint *is* the luxury signal. If a bridal/festive touch is wanted, use a deep oxblood `#5E1A1F` in exactly one place on the page (e.g. a single "Bridal" tag) — never more than one.
- **Type — no Inter, Open Sans, Roboto, or Playfair Display; nothing that reads as a default:**
  - Headlines: **Fraunces** (Google Fonts, free) — a warm, high-contrast serif with real personality via its optical-size and italic axes. Set large, light-to-regular weight, generous letter-spacing on short lines. This carries the luxury feel, so give it room — big sizes, lots of surrounding space, never crowded by body text.
  - Body/UI: **Switzer** (Fontshare, free) — a quiet modern grotesk with more character than Inter/Helvetica clones, at ease at small sizes.
  - Labels/eyebrows/captions: Switzer, small size, uppercase, wide letter-spacing (0.1–0.15em) in antique brass — used for things like "22K GOLD" or "EST. [YEAR]," not as decoration everywhere.
- **Signature motif:** a small **hallmark/purity-stamp seal** (circular stamp, like a BIS hallmark mark) reused as a recurring graphic device — labels sections, marks "handcrafted" / "22K" / "since [year]" callouts. Ties directly to how gold jewellery is actually authenticated, so it means something rather than decorating.
- **Space is the luxury cue, not colour or ornament:** desktop section padding 120–160px vertical; wide, controlled max-width (~1200px) with the page itself sitting in even more negative space at very large viewports; catalog grids use large gutters (48px+) so pieces breathe rather than tile densely; hero image is allowed to sit alone with a single short line of text, not a cluttered stack of headline+subhead+badges+CTA all at once.
- **No ecommerce copy:** buttons say "Enquire on WhatsApp," "Book an Appointment," "Visit the Store" — never "Add to cart" / "Buy now."

---

## 1. Master build prompt
*(Paste this into Claude, v0, Lovable, Cursor, etc. to generate the actual page.)*

```
Build a single-page website for [BRAND NAME], a traditional gold and bridal
jewellery store. Style: clean, modern, understated luxury — minimal and
professional, not maximalist or cluttered. This is NOT an e-commerce site:
there is no cart, checkout, or pricing on products. All CTAs point to
"Enquire on WhatsApp," "Book an Appointment," or "Visit the Store."

DESIGN TOKENS — keep this palette tight, do not add extra colours
- Background: porcelain ivory #FAF8F3
- Text: soft ink #1C1A17
- Accent (the only one): antique brass #9C7A45 — used only for thin lines,
  small labels, icons, hover/focus states. Never as a fill, button
  background, or large coloured block.
- Hairlines/dividers: warm grey #DEDAD2
- Optional single bridal touch: deep oxblood #5E1A1F, used in exactly ONE
  place on the whole page (e.g. one "Bridal" tag) — do not repeat it
  elsewhere.
- Headline typeface: Fraunces (Google Fonts) — light/regular weight, set
  large, generous tracking on short lines. Do not use Playfair Display,
  Inter, Open Sans, or Roboto anywhere on this page.
- Body/UI typeface: Switzer (Fontshare)
- Label/eyebrow style: Switzer, small, uppercase, letter-spacing 0.1–0.15em,
  set in antique brass — reserve for short tags like "22K GOLD," not as a
  general decoration
- Signature motif: a small circular "hallmark stamp" graphic (like a
  jewellery purity hallmark) reused as a section marker / badge — e.g. next
  to "Handcrafted," "22K Gold," "Est. [year]." Keep it as a single-colour
  line-art seal, not a busy illustration.

SPACE & RESTRAINT (this is what makes it feel premium, not the colours)
- Generous vertical rhythm: ~120–160px between major sections on desktop.
- Wide, controlled max-width (~1200px) with real breathing room around it
  on large screens — do not stretch content edge-to-edge.
- Catalog grid gutters at least 48px — pieces should feel displayed, not
  tiled like a product listing.
- Hero: one image, one short line of text, one CTA. Resist stacking a
  headline + subheadline + multiple badges + CTA all at once — cut until
  only what's necessary remains.
- Every section should feel like it has room to breathe before you add
  the next element, not before you remove one.

SECTIONS
1. Hero — see the dedicated "HERO SECTION" block below this list. Full-bleed
   photograph, one short headline, one understated CTA. No badge, no
   subheadline, no stacked elements.
2. Heritage/About strip — 2–3 sentences on the store's history and
   craftsmanship, understated, no marketing fluff.
3. Catalog — grouped by category (Necklace Sets, Bangles & Kada, Earrings,
   Rings, Bridal Sets). Each category: a clean grid of pieces, image +
   name + short material note (e.g. "22K Gold, Kundan work"). No prices,
   no "buy" buttons — each card links to "Enquire on WhatsApp."
4. Craftsmanship/Trust section — hallmark motif, certifications (BIS
   Hallmark), purity guarantee, in-store customisation — presented as short
   labelled facts, not sales copy.
5. Blog preview — 3 recent post cards (title, 1-line excerpt, date),
   pulling from topics like bridal jewellery guides, gold care tips, festive
   collections. Links to a blog index.
6. Visit us — store address, hours, map embed placeholder, WhatsApp enquiry
   button, and a simple appointment-request form (name, phone, preferred
   date — no payment fields).
7. Footer — logo mark, nav, social links, hallmark motif repeated small.

HERO SECTION — full-bleed, no badge, no stacked SaaS pattern
- Layout: full-viewport-height (min 90vh) photograph as the entire
  background. No rounded card container around it, no gradient blob
  decoration, no image-in-a-box treatment. Text sits directly on the
  photograph in the lower-left third — not centered, not vertically
  mid-anchored, not full-width.
- Do NOT include: an eyebrow/pill/badge above the headline (no "New
  Collection" or "Est. [year]" rounded tag), a subheadline paragraph, more
  than one CTA, a filled/rounded/drop-shadowed button, or a gradient wash
  across the whole image. A soft scrim is only acceptable directly behind
  the text block, not across the full photo.
- Headline: one short, specific, evocative line — 4 to 7 words, not a
  tagline-shaped sentence. Set in Fraunces, large (roughly 48–88px
  depending on viewport), light weight, generous line-height. Colour picks
  whichever of porcelain ivory / soft ink reads legibly against that part
  of the photo — don't rely on a scrim to force contrast.
- CTA: one understated action, either (a) a text link with a 1px antique
  brass underline that extends on hover, or (b) a hairline button — 1px
  brass border, transparent background, sharp/near-square corners, no
  shadow, no fill. Label: "Book an Appointment."
- The photograph itself must already contain a natural quiet area (deep
  shadow, soft-focus negative space, or plain backdrop) in the lower-left
  third for the text to sit in — the composition should do the work, not
  a CSS overlay.

REQUIREMENTS
- Fully responsive down to mobile; hero and catalog grids reflow cleanly.
- Generous whitespace, restrained motion (subtle fade/slide on scroll at
  most — no heavy animation).
- Visible keyboard focus states on all interactive elements.
- Real, specific microcopy throughout — avoid generic filler like "Welcome
  to our store" or "Explore our collection."
```

---

## 2. Hero background image prompt
*(For an AI image generator, or as an art-direction brief for a photographer. Pick one direction — don't blend them.)*

**Option A — Still life, editorial negative space**
```
Full-bleed editorial photograph, vertical or wide format. A single
traditional Indian bridal gold necklace set (kundan or temple-style)
placed off-centre in the upper-right third of the frame, resting on dark
matte stone or deep umber fabric. Single hard directional light source
raking across the piece, everything else falling into soft shadow. The
lower-left third of the frame is deliberately empty — near-black or deep
shadow, uninterrupted, with no props, texture, or secondary objects — so
text can sit there. Muted, restrained colour grading, antique gold catching
the light against near-darkness. Not a bright, evenly-lit product photo —
closer to a still life painting than a catalogue shot.
```

**Option B — Worn, human, soft-focus**
```
Full-bleed editorial photograph of traditional gold bridal jewellery being
worn — a close crop on a hand, neck, or ear, the person's skin and hair
softly out of focus, no visible face, dim warm directional lighting from
one side. The jewellery itself is the only sharp element in the frame.
Composition leaves the lower-left third in soft shadow / shallow depth of
field with minimal detail, so a headline can sit there legibly. Warm,
restrained tones — no bright white, no studio-flat lighting. Feels like a
quiet moment, not a fashion campaign ad.
```

Either direction avoids the generic "bright white background, jewellery
floating dead-centre, evenly lit" stock-catalogue look — the whole point is
a photograph with real shadow and a place for the eye (and the headline)
to rest.

---

## 3. Catalog photography prompts
*(One per category — reuse the same lighting/framing language so the grid feels consistent.)*

- **Necklace Sets:** "Close-up studio shot of an intricately worked traditional gold bridal necklace set, laid flat on warm ivory linen, soft top-down light, shallow shadow, muted antique-gold tone, minimal styling, no props."
- **Bangles & Kada:** "A stacked pair of traditional gold bangles photographed at a slight angle on a matte stone surface, warm soft lighting, shallow depth of field, restrained editorial styling."
- **Earrings:** "Traditional gold jhumka earrings shot against a warm ivory backdrop, one earring slightly out of focus in the background for depth, soft diffused light, minimal composition."
- **Rings:** "Macro shot of a traditional gold ring with kundan/polki work, resting on a small dark stone tile, soft raking light to catch texture, muted warm tones, minimal negative space."
- **Bridal Sets (full look):** "Full traditional bridal gold set — necklace, earrings, maang tikka — arranged in a considered flat-lay on warm ivory fabric, soft even studio light, restrained luxury catalogue styling, no bright colour props."

---

## 4. Blog post prompts
*(Give one of these to Claude to draft the actual post, in the store's voice — plain, informative, not salesy.)*

1. **"How to read a gold hallmark"** — Prompt: "Write a short, clear blog post explaining what a BIS gold hallmark means, how to check purity (22K vs 18K), and why it matters when buying bridal jewellery. Plain, trustworthy tone, no sales pitch, ~400 words."
2. **"Caring for your gold jewellery between wears"** — Prompt: "Write a practical blog post with 5–6 tips on storing and cleaning traditional gold jewellery at home, written in a warm, helpful voice, ~350 words."
3. **"Choosing bridal jewellery: necklace set vs full set"** — Prompt: "Write a guide-style blog post helping a bride decide between a single statement necklace set and a full bridal set (necklace + earrings + tikka + bangles), covering budget, occasion, and outfit pairing, ~450 words."
4. **"This season's festive gold picks"** — Prompt: "Write a short seasonal blog post highlighting 3–4 styles of gold jewellery suited for the upcoming festive season, tying pieces to specific occasions (puja, sangeet, reception), ~400 words."

---

## 5. Logo / brandmark prompt (optional)

```
Design a minimal wordmark logo for [BRAND NAME], a traditional gold
bridal jewellery store. Refined serif lettering (Fraunces-like proportions),
single colour (antique brass #9C7A45 or soft ink #1C1A17), no illustrated
gemstone/jewellery icon — let the typography carry the elegance. Optionally
pair with a small circular hallmark-style seal as a secondary mark for
favicon/stamps.
```