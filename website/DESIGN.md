---
name: FrameForge
description: A steel workbench for editable Figma-to-Roblox UI.
colors:
  ember: "#FF7A2F"
  hover: "#FF914F"
  pressed: "#E96A25"
  warm: "#FFB383"
  obsidian: "#0B0F14"
  steel: "#2A3140"
  text: "#EDF1F7"
  muted: "#9DA7B8"
  surface-start: "#151b24"
  surface-end: "#10151d"
  secondary-hover: "#222a36"
  prose-text: "#b9c2d1"
  notice-bg: "#201b19"
  notice-border: "#6b4935"
  notice-text: "#d5bdac"
typography:
  display:
    fontFamily: "'Manrope Variable', 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: clamp(3.4rem, 4.4vw, 4.4rem)
    fontWeight: 650
    lineHeight: 1.04
    letterSpacing: -.035em
  document-display:
    fontFamily: "'Manrope Variable', 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: clamp(2.8rem, 5vw, 4.5rem)
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: -.03em
  headline:
    fontFamily: "'Manrope Variable', 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: clamp(2rem, 4vw, 3.4rem)
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: -.03em
  title:
    fontFamily: "'Manrope Variable', 'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: 1.5rem
    fontWeight: 650
    lineHeight: 1.12
    letterSpacing: -.025em
  body:
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.65
  prose:
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.85
  action:
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: .875rem
    fontWeight: 650
    lineHeight: 1.65
  navigation:
    fontFamily: "'Segoe UI', -apple-system, BlinkMacSystemFont, Arial, sans-serif"
    fontSize: .875rem
    fontWeight: 400
    lineHeight: 1.65
  metadata:
    fontFamily: "'Cascadia Code', 'SFMono-Regular', Consolas, monospace"
    fontSize: .75rem
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: .045em
rounded:
  small-detail: 3px
  control: 4px
  button: 5px
  panel: 6px
  surface: 8px
  workbench: 9px
  release-pill: 30px
spacing:
  inline-small: .5rem
  inline: 1rem
  content-gap: 1.5rem
  group-gap: 2rem
  section-gap: 3rem
  section-desktop: 7.5rem
  section-tablet: 5rem
  section-mobile: 4rem
components:
  button-primary:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.obsidian}"
    typography: "{typography.action}"
    rounded: "{rounded.button}"
    padding: .8rem 1.3rem
  button-primary-hover:
    backgroundColor: "{colors.hover}"
  button-primary-active:
    backgroundColor: "{colors.pressed}"
  button-secondary:
    backgroundColor: "{colors.surface-start}"
    textColor: "{colors.text}"
    typography: "{typography.action}"
    rounded: "{rounded.button}"
    padding: .8rem 1.3rem
  button-secondary-hover:
    backgroundColor: "{colors.secondary-hover}"
  button-compact:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    rounded: "{rounded.button}"
    padding: .2rem 0
  range-control:
    textColor: "{colors.text}"
    width: 100%
  navigation:
    textColor: "{colors.muted}"
    typography: "{typography.navigation}"
    padding: .7rem 0
  release-pill:
    textColor: "{colors.muted}"
    typography: "{typography.metadata}"
    rounded: "{rounded.release-pill}"
    padding: .4rem .75rem
  surface-card:
    textColor: "{colors.text}"
    rounded: "{rounded.surface}"
    padding: 2.3rem
  notice:
    backgroundColor: "{colors.notice-bg}"
    textColor: "{colors.notice-text}"
    rounded: "{rounded.button}"
    padding: 1.25rem 1.5rem
  masked-button:
    backgroundColor: "{colors.ember}"
    textColor: "{colors.obsidian}"
    rounded: "{rounded.surface}"
    width: min(320px, 100%)
---

# Design System: FrameForge

## Overview

**Creative North Star: "The Conversion Workbench"**

FrameForge places editable structure at the center of a quiet digital workbench. Obsidian ground, steel dividers, shallow graphite-toned surfaces, and concentrated ember actions make the interface feel precise and useful. The supplied transparent forge mark remains the identity anchor.

Open geometric display type gives the product a confident voice; plain sans text makes the guide and legal pages comfortable to read. Technical diagrams and an interactive masked stripe button explain the native hierarchy. The implemented world combines border-defined panels with restrained gradients and soft illustration shadows.

**Key Characteristics:**

- One orange accent family against cool dark neutrals.
- Large balanced headings and quieter reading text.
- Steel rules, shallow corners, and generous section spacing.
- Real HTML/CSS diagrams and controls that preserve structure.
- Purposeful motion with keyboard, pause, and reduced-motion behavior.

## Colors

A single orange family brings warmth to cool steel and obsidian; the frontmatter records the exact source values.

### Primary

- **Ember** (`ember`): primary installation/download actions, the conversion bridge, and selected words in major headings.
- **Ember Hover / Pressed** (`hover`, `pressed`): the primary button's lighter hover and deeper pressed states.
- **Warm Ember** (`warm`): document links, focus outlines, code, and meaningful technical highlights.

### Neutral

- **Obsidian** (`obsidian`): the page ground and dark text inside orange buttons.
- **Steel** (`steel`): dividers, button outlines, table rules, and panel boundaries.
- **Clear Text / Muted Steel** (`text`, `muted`): heading/action text and secondary descriptions or navigation.
- **Graphite Surface Pair** (`surface-start`, `surface-end`): the shallow diagonal gradient on reusable feature surfaces; the first also supplies secondary buttons.
- **Lifted Graphite** (`secondary-hover`): the secondary action's hover surface.
- **Reading Steel** (`prose-text`): brighter long-form reading text in documents and table cells.
- **Warm Notice Surface / Border / Text** (`notice-bg`, `notice-border`, `notice-text`): contextual warnings and explanatory notices, with an ember left edge and warm heading.

**The Ember Action Rule.** Use ember for primary actions and meaningful conversion highlights; use its warm tint for links, focused outlines, and selected technical details.

## Typography

**Display Font:** Manrope Variable, self-hosted Latin WOFF2, with the project's sans fallback stack.
**Body Font:** Segoe UI, followed by platform sans and Arial fallbacks.
**Label/Mono Font:** Cascadia Code, SFMono-Regular, Consolas, then monospace.

Manrope's open geometric shapes carry the large headlines and compact titles. The body stack has a familiar reading cadence. The build uses role-specific sizes and breakpoint overrides; it does not establish a single mathematical scale ratio.

### Hierarchy

- **Display:** the homepage headline uses the frontmatter's `display` role, tight line-height, balanced wrapping, and selected ember words. At tablet width it grows with the viewport; at narrow mobile width it uses `clamp(3rem, 11vw, 4.2rem)`.
- **Document Display:** direct document titles use `document-display`; on narrow screens they resolve to the observed size (2.75rem).
- **Headline:** major home sections use `headline`. A secondary line may use muted color and a lighter weight (450).
- **Title:** `title` is the shared base for component headings; feature headings and document headings apply their evidenced local size overrides.
- **Body / Prose:** `body` serves general copy; `prose` increases line-height for long documents. Mobile document copy uses a slightly smaller size (.9375rem).
- **Action / Navigation:** compact sans labels differentiate strong button actions from regular-weight navigation.
- **Metadata:** small mono type records actual versions and technical data. Diagram annotations have local sizes and are not general reading tokens.

**The Technical Type Rule.** Reserve monospace for code, hierarchy, measurements, version metadata, and functional interface labels. Lead sections with their actual heading.

## Layout

The main container is centered and capped (1280px), with a fluid width of `calc(100% - 6rem)`. At 1100px and below its total side allowance becomes 4rem; at 580px and below it becomes 2.5rem. The sticky header has its own wider cap (1360px), with separate gutters and heights (88px desktop, 76px tablet, 72px narrow mobile).

Home sections use the frontmatter's desktop, tablet, and mobile section spacing. Related items use compact inline gaps, while major compositions have deliberate wider gaps. These values are observed steps rather than an invented rigid spacing grid.

The hero combines copy and a conversion exhibit in two columns (1fr / 1.08fr). At 850px and below it stacks. Feature, workflow, download, and interaction compositions collapse as their contents require; at 580px the source illustration, forge bridge, and hierarchy become a vertical sequence, the demo controls sit below the button, download steps become one column, and installation actions stretch across the available width.

Documents pair a contents rail (225px) with a reading column capped at 740px. The rail narrows at 1100px; at 850px the contents become an in-flow two-column list above the prose. Pages without contents keep the same reading width. Section anchors account for the sticky header.

## Elevation & Depth

Depth is mostly tonal: cool dark surfaces, thin steel borders, and restrained gradients distinguish content from the obsidian ground. Soft shadows lift the conversion exhibit and its nested windows. A faint orange glow supports the forge core and primary actions; the interaction preview uses a warm radial atmosphere. The header uses an almost opaque dark fill rather than blur.

### Shadow Vocabulary

- **Action glow** (`0 0 25px rgb(255 122 47 / 9%)`): primary actions.
- **Workbench lift** (`0 26px 60px rgb(0 0 0 / 25%)`): the conversion exhibit.
- **Illustration window lift** (`0 12px 30px rgb(0 0 0 / 25%)`): the paired source and hierarchy windows.
- **Demo lift** (`0 8px 20px rgb(0 0 0 / 25%)`): the masked orange example button.
- **Menu lift** (`0 12px 40px rgb(0 0 0 / 35%)`): the open mobile navigation.

**The Quiet Depth Rule.** Use tonal surfaces and steel borders for ordinary content. Keep soft shadows and faint ember glow attached to actions or the conversion illustration.

## Shapes

Rectangular surfaces have shallow corners. Buttons, notices, small controls, inset panels, feature surfaces, and the conversion workbench use the distinct radius roles recorded in frontmatter. Release metadata alone uses an elongated pill. Borders are generally single-pixel rules; circle controls and small selection handles belong to the illustrated workbench rather than the default card language.

Small window rotations help the desktop conversion illustration read as a designed object. Mobile removes those rotations and stacks the windows to favor legibility. Keep those compositional gestures inside demonstrations.

## Components

### Buttons

Confident actions with restrained shape and compact sans labels. Primary buttons pair ember with obsidian; secondary buttons pair a dark surface with clear text. Both have shallow corners, a minimum height (48px), and the frontmatter padding. Hover lifts the action slightly (-2px); press returns it to rest. Primary state colors are tokenized; secondary hover also brightens its steel border. Header actions are smaller (42px minimum). Compact footer installation actions remove the filled surface and border, use muted text, and retain the real action label.

Keyboard focus uses a warm outline (2px) offset from the control (5px). Standard action transitions use the observed duration (.2s). Disabled controls dim (opacity .7) and use the default cursor.

### Navigation

A sticky, nearly opaque header pairs the transparent forge logo and Manrope wordmark with muted compact links. Hover and current-page links use clear text. At 850px and below, a native details/summary menu replaces the desktop links; it has a reachable trigger (44px minimum), an outlined dark panel, and highlighted installation link. Escape and outside activation close it. Document contents links stay plain and use warm hover feedback.

### Release Metadata

A small outlined pill contains the actual version, alpha status, and an ember square. It links to the changelog. It is informational metadata, not a decorative section label or a generic filter-chip system.

### Cards / Containers

Feature surfaces use the shallow graphite gradient, steel border, and surface radius. Desktop internal padding is generous (2.3rem), then adjusts through the existing breakpoints. Installation panels use a solid dark surface and the panel radius. Reading content remains mostly unboxed; tables and expandable answers use horizontal rules.

### Inputs / Fields

The implemented input is a native range control, not a text-entry form. Ember sets its accent, and its hit area has a minimum height (2.75rem). A compact label pairs the setting name with a warm mono output; quiet helper copy explains the effect. Controls start disabled until enhancement is available. Preserve the input's native keyboard behavior and the global focus outline.

### Notices

Warm muted containers call attention to compatibility or availability context. They use the notice tokens, a single ember left edge, shallow button corners, and compact padding. A warm strong heading introduces brighter explanatory text. Avoid turning every paragraph into a notice.

### Conversion Exhibit and Masked Button

The signature exhibit connects a source design, a transparent forge mark, and a native object hierarchy using real DOM and SVG. Steel edges, a fine grid, orange selection handles, and a highlighted native layer explain the transformation. Its illustrative status remains visible in the caption.

The interaction preview clips decorative stripes inside a stationary mask, with a separately moving inner layer. Hover and keyboard focus apply the same stripe translation and 2D tilt. Native range controls expose distance and angle; reset restores the observed defaults (48px and -3deg). The forging cadence repeats slowly (7s), starts only when visible, pauses while the tab is hidden or the user pauses it, and stops for reduced motion. The masked-button transitions (.32s for tilt and .45s for stripes) also stop for reduced motion. This is a browser explanation, with a clear note to test generated Roblox behavior in Studio.

## Do's and Don'ts

### Do:

- Do retain the supplied transparent FrameForge mark and the dark steel / ember identity.
- Do use Manrope for headings, plain sans for reading, and monospace for technical content.
- Do use border-defined surfaces and shallow corners, matching the component tokens.
- Do stack diagrams and controls on narrow screens so labels and hierarchies remain readable.
- Do preserve warm visible focus, native control semantics, motion pause, and reduced-motion support.
- Do keep explanatory interfaces editable as HTML/CSS with inline SVG for interface icons.

### Don't:

- Don't introduce purple into the established palette.
- Don't add decorative kickers above section or document titles.
- Don't turn illustration-specific small typography, rotated windows, or grid texture into ordinary reading styles.
- Don't flatten the conversion exhibit or interaction preview into a screenshot.
- Don't replace the supplied logo or place an opaque backing inside its transparent asset.
- Don't add continuous motion without the existing visibility, pause, and reduced-motion behavior.
