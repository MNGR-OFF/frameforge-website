# Studio installation chooser

Recorded October 7, 2026 for the website's installation extension. This is a scoped implementation record; `DESIGN.md` and `.impeccable/design.json` remain the design authority.

## Scope

`StudioInstallOptions.astro` supplies a shared **Get Studio plugin** disclosure with two destinations. `InstallActions.astro` places it beside the Figma installation action in the homepage hero, final call to action, and compact footer. `StudioDownload.astro` and the Guide installation panel reuse the same component. The existing local installation steps and checksum remain available.

The extension preserves the Conversion Workbench world: dark steel surfaces, ember actions, shallow corners, clear labels, and warm focus outlines. It does not change the product's promise of real, editable Roblox UI.

## Destinations and version truth

The owner supplied these exact listing destinations:

- Figma: <https://www.figma.com/community/plugin/1688245182223969540>
- Roblox Creator Store: <https://create.roblox.com/store/asset/90693215219484/FrameForge>

Listing reads identified **FrameForge | Figma** and **FrameForge**. The website links directly to these destinations using `safeExternalUrl`, a new tab, and `noopener noreferrer`.

The local option is a separate release artifact:

| Property | Value |
| --- | --- |
| Label | Download .rbxmx |
| Filename | FrameForge-0.1.7.rbxmx |
| Release | 0.1.7 alpha |
| Size | 358,399 bytes |
| SHA-256 | `53f3ac43f29868c2006fdace12a9f4b237b84fcdb1980b1aa8833fd2aeb20347` |

Version metadata belongs to the local file. The chooser makes no claim that the Creator Store listing contains the same version. Its local link uses `localUrl` so custom-domain and project-path builds retain the configured base path, and sets the filename through the HTML `download` attribute.

## Component contract

- A native `details` element and `summary` provide the disclosure. The expanded content contains ordinary links; it is not an application menu and does not use menu roles or arrow-key navigation.
- The trigger defaults to the existing secondary button style. The dedicated Studio section requests the primary variant.
- The Creator Store option renders when `site.links.robloxPlugin` is configured. The local file option renders when `site.downloads.studio.enabled` is true. Both are configured for this release.
- Each destination pairs a clear title with helper text: **Install through Roblox** or **Local plugin file · 0.1.7 alpha**.
- Native disclosure and links work without JavaScript. Enhancement closes other Studio choosers when one opens, closes on outside activation or focus leaving the component, closes after destination activation, and returns focus to the summary when Escape closes the chooser.
- The component adds no dependency, continuous animation, scroll lock, or focus trap. Existing global focus and reduced-motion rules apply.

## Responsive and visual integration

The option panel uses the incumbent graphite surface and shallow panel corners, with steel dividers and warm inline SVG icons. Option titles use the site's sans text stack at 1rem; helper text uses .875rem with muted color. Each option has a 72px minimum height. These are component measurements rather than new global design tokens.

Above 580px, options are anchored below the trigger. The Guide panel and dedicated download action align the options to the trigger's right edge; the compact footer opens upward. Panel width is 21rem with a viewport-based maximum. At 580px and below, the trigger and options use the available width and the options enter document flow, pushing following content downward.

The established Ember Action Rule, Technical Type Rule, and Quiet Depth Rule continue to govern this extension. No new visual world or system-wide prohibition is introduced.

## Verification evidence

Source inspection confirmed the shared integration, native disclosure, destination semantics, conditional links, progressive enhancement, responsive placement, and preservation of the local release metadata. A direct file read on October 7 confirmed the 358,399-byte local package and its SHA-256 above.

Production verification on October 7 completed with nine HTML routes, zero Astro errors/warnings/hints across 34 files, and static checks covering 307 local references and 16 HTTPS destinations. Emitted client JavaScript totals 10,274 bytes.

All 11 Chromium tests passed in 39.6 seconds. The run included all-route axe checks with WCAG 2 A/AA, 2.1 AA, and 2.2 AA tags; open-chooser accessibility; native no-JavaScript choices; keyboard traversal; Escape, tab-out and outside-click dismissal; and one-open-chooser behavior. These checks support the accessibility target without constituting assistive-technology certification.

The Creator Store activation test verified the exact new-tab destination using an intercepted response. The local download test exercised the real `.rbxmx` response and verified its checksum. Open chooser bounds and page overflow passed at 360 × 800 and 720 × 500 across the hero, dedicated download section, Guide, and compact footer. Existing responsive overflow checks also passed.

The project-path build also passed with origin `https://mngr-off.github.io` and base `/frameforge-preview/`, the same nine HTML routes and static-check totals, and zero diagnostics. Four targeted Chromium checks passed in 16.4 seconds, covering all routes and axe, direct destination links, no-JavaScript choices, the actual download checksum, and Studio keyboard/dismissal/new-tab behavior. These were local project-path checks, not a public deployment.

The final visual pass inspected all eight desktop/mobile chooser captures in `.impeccable/review/`, including viewport-level Guide evidence. The independent finish reviewer validated all eight captures, corroborated the local-extension route, and returned **ship** with no material fixes across its persistence, fidelity, ceiling, material_fixes, and keep contract sections. This disposition applies to the website extension; it does not establish live store installation or publication.

## Remaining boundaries

Actual installation through the live stores, store release versions, and a new Roblox Studio import were not tested in this website extension. Browser checks can verify destination routing and the downloaded artifact; they cannot establish live installation success.

The context detector reported pre-existing `design-sidecar-stale` drift. This extension preserves `DESIGN.md` and `.impeccable/design.json`; the drift is not repaired or turned into new design guidance.
