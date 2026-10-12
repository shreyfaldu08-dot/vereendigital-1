# Vereen Digital — website

Next.js 15 (App Router) + TypeScript + Tailwind + Framer Motion + Lenis +
react-three-fiber. Animated rebuild of vereendigital.com in the visual and
motion language of the wolfx.io reference.

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Stop the dev server before running `npm run build` — both write to `.next`,
and a build underneath a running dev server leaves it serving broken chunks.

## Routes

| Route      | What it is                                                        |
| ---------- | ----------------------------------------------------------------- |
| `/`        | Home — hero, liquid-chrome manifesto, numbers, SERVICES type wall, pinned service rail, crossing tag rails, case studies, the from/to/and arc, principles, process, CTA |
| `/ai-seo`  | AI SEO service page — the shift, CITED type wall, four stacking method layers, proof, FAQ |
| `/work`    | Case studies, filterable by service                               |
| `/contact` | Visibility-check form with a success state                        |

## What was taken from the reference

Studied at wolfx.io, then rebuilt around Vereen's own content:

- **Pure black canvas** with a faint 68px grid under every section
- **One hot accent** — the reference uses red `#FF2B2B`; Vereen uses its own
  brand green, lime `#A8DB42` with olive `#6F9925`, both sampled from the
  current vereendigital.com. Lime is light, so anything sitting on a lime fill
  is ink, never white
- **Geometric sans at extreme weight**, uppercase, tight tracking (Outfit 800/900
  in place of the reference's Poppins)
- **Liquid-chrome 3D field** — distorted metal droplets and wireframe halos
  drifting behind the manifesto section
- **Repeated-word type wall** (`SERVICES`, `CITED`) with scattered accent cells
- **Pinned horizontal card rail** — outlined cards over the grid, each with a
  white footer strip and a hard-edged `VIEW` button
- **Crossing skewed tag rails** running in opposite directions behind a giant
  centred headline
- **Giant lowercase accent words** with small italic joiners — the reference's
  "from idea to delivery and beyond" becomes "from invisible / to cited /
  and chosen"

## Structure

```
app/              routes + global CSS
components/
  chrome/         preloader, cursor, nav, footer, scroll progress, page transition
  motion/         reveal primitives, magnetic buttons, velocity marquee, counter,
                  type wall, crossing rails
  sections/       page sections
  three/          the WebGL liquid field
  providers/      Lenis smooth scroll
lib/data.ts       all copy and case-study content
```

## The motion layer

| Effect                           | Where                                      |
| -------------------------------- | ------------------------------------------ |
| Counter preloader, panel lifts   | `chrome/Preloader.tsx` (once per tab)      |
| Inertial smooth scroll           | `providers/SmoothScroll.tsx` (Lenis)       |
| Blend-mode cursor                | `chrome/Cursor.tsx` (pointer devices only) |
| Line-mask hero reveal            | `sections/Hero.tsx`                        |
| Word-mask scroll reveals         | `motion/RevealText.tsx`                    |
| Liquid-chrome droplets and halos | `three/LiquidField.tsx`                    |
| Repeated-word type wall          | `motion/TypeWall.tsx`                      |
| Scroll-linked rails              | `motion/ScrollRail.tsx`                    |
| Crossing skewed tag rails        | `motion/CrossRails.tsx`                    |
| Pinned horizontal service rail   | `sections/ServiceRail.tsx` (stacks below `lg`) |
| Stacking sticky layer cards      | `sections/StickyLayers.tsx`                |
| Parallax case-study frames       | `sections/Proof.tsx`                       |
| Giant accent-word arc            | `sections/Arc.tsx`                         |
| Magnetic buttons                 | `motion/Magnetic.tsx`                      |
| Count-up stats                   | `motion/Counter.tsx`                       |
| Self-drawing process line        | `sections/Process.tsx`                     |
| Masked line reveals on every heading | `motion/RevealLines.tsx`              |
| Rules that draw themselves       | `motion/DrawRule.tsx`                      |
| Metric figures rising out of a mask | `sections/Numbers.tsx`                  |
| Case-study frame rows drawing in | `sections/Proof.tsx`                       |
| Accent bars wiping in on card hover | `sections/Approach.tsx`, `sections/ServiceRail.tsx` |
| Footer rail, masked wordmark, sliding links | `chrome/Footer.tsx`         |
| Route wipe                       | `chrome/PageTransition.tsx` (CSS keyframes, so it cannot stall) |

All of it is disabled under `prefers-reduced-motion: reduce`, and the 3D field
is not mounted at all in that case.

### Two traps worth knowing about

1. **Never attach a scroll trigger to the element that moves.** A word that
   starts `translateY(115%)` sits below its own box, so an observer on it can
   never intersect and the word stays invisible forever. `RevealText` and `Arc`
   put `whileInView` on the static wrapper and animate children through
   variants.
2. **Rails move with the scroll, never on their own.** `ScrollRail` maps scroll
   POSITION to horizontal offset: nothing drifts while the page is still, and
   nothing reads scroll velocity, so a flick of the wheel never makes a rail
   surge. Give a rail enough `repeat` copies that one copy is wider than its
   container, or the track can run out at the edges.
3. **Full-screen curtains are CSS, not JS.** A requestAnimationFrame-driven
   curtain stalls on a throttled or backgrounded tab and leaves the page black.
   The route wipe is a keyframe with `forwards`; the preloader has a hard
   fail-safe timeout.

## Before launch

Placeholders left deliberately rather than invented — search for `[` in
`components/`:

- `[HELLO@VEREENDIGITAL.COM]`, `[PHONE]`, `[CITY, COUNTRY]` — `chrome/Footer.tsx`,
  `sections/ContactScreen.tsx`
- `[TIMEZONE, 9—6]` — `sections/ContactScreen.tsx`

The contact form has **no backend**. `onSubmit` in
`components/sections/ContactScreen.tsx` only shows the success state — point it
at Formspree, HubSpot or a route handler before going live.

Also still to add: favicon and OG image, analytics, a client testimonial
section (the old one was dropped rather than filled with invented copy), and
`metadataBase` plus canonical URLs in `app/layout.tsx` once the domain is
settled.

The case-study sections use abstract browser frames showing each engagement's
own numbers, not mocked-up screenshots of client sites. Swap in real imagery
when the client supplies it.

## Design system

Tokens are in `tailwind.config.ts`. Type is Outfit (display, 300–900) and
JetBrains Mono (micro-labels), loaded through `next/font`.

**Colour chapters.** A 15,000px scroll on one ground reads as an unbroken
field, so the page is cut into chapters and the eye always has somewhere to
travel:

| Chapter | Ground | Notes |
| --- | --- | --- |
| Hero, manifesto, type wall, service rail, proven work, case studies, arc, process, footer | `void` `#000000` | the home ground |
| Numbers | `moss` `#07120B` | green-black, a tonal shift rather than a jump |
| Why not hire in-house | `bone` `#F2F1EC` | the light chapter — black type, olive accents |
| Closing CTA | `flare` `#A8DB42` | full-bleed lime, black type and button, into the black footer |

A full-bleed lime was tried on the "Our proven work" break too and pulled back:
the slab swamped that part of the page, and black rails on a lime ground
collided with the black headline until neither could be read. That section
stays on black, with its accent on the last word and the rail separators.

The greens were sampled from the live vereendigital.com, not guessed: lime
`#A8DB42`, mid `#89BC30`, deep `#6F9925`, plus `olive-ink` `#3F4E13` which is
the only green that holds up as small text on bone (~6:1).

Lime on black is ~13:1, so it carries headlines and figures comfortably.
**Text on a lime fill is always `text-void`** — white on lime fails contrast
badly, so every button, chip, filter pill, accent card and the two lime
chapters use ink. On bone, body text is `text-void/55`–`/80` and the hairline
accent steps down to `flare-deep`, since lime on bone is nearly invisible.
