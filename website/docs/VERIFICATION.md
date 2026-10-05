# Completion and verification

Verified locally on October 5, 2026. The website is implemented in `website/`; existing plugins, source packages, and the account service were preserved. No DNS changes, hosting purchase, public deployment, or OAuth submission occurred.

## Delivered

- Astro 7.3.5 static site, TypeScript 6.0.3, lockfile, centralized configuration, original CSS/SVG examples, and the supplied logo with unchanged pixels.
- Nine HTML routes: homepage, Guide, Account Linking, Privacy, Terms, Support, Credits, Changelog, and `404.html`.
- Responsive conversion exhibit, keyboard-accessible native mobile menu, masked stripe/tilt demonstration, pause control, offscreen/tab-visibility pausing, and reduced-motion support.
- Verified 0.1.7 Studio plugin download with SHA-256, installation instructions, and configurable store/download destinations.
- Static production output in `website/dist/`, plus a separate project-path verification build in ignored `website/verification/project-dist/`.
- GitHub Actions build/check/deploy workflow, Namecheap domain instructions, asset register, data-handling audit, and Roblox OAuth review preparation.
- Impeccable design review and source-derived handoff in `PRODUCT.md`, `DESIGN.md`, `docs/DESIGN-DIRECTION.md`, and `.impeccable/design.json`.
- Privacy and terms **review drafts** with explicit owner decisions. They are excluded from the sitemap and marked noindex while unresolved. The publication check allows the current static website with this honest status and requires completed decisions before presenting policies as adopted.

## Checks and evidence

| Check | Result |
| --- | --- |
| Production build | 9 static HTML pages generated successfully |
| Astro/TypeScript diagnostics | 0 errors, 0 warnings, 0 hints |
| Static route/link/output verification | 318 local references; correct canonical/assets/social/robots/sitemap; private files rejected |
| Production Chromium tests | 9 passed |
| Project-path Chromium tests | 4 passed: routes/accessibility, no-JS navigation, 404, and actual plugin download |
| Automated WCAG scans | No axe violations on the nine tested routes; WCAG 2 A/AA, 2.1 AA, 2.2 AA tag coverage |
| Responsive checks | No horizontal overflow at 360, 768, 1024, 1440, 740 landscape, and 720px zoom-equivalent widths |
| Keyboard and interaction | Skip link, mobile menu/Escape, range controls/reset, clipped stripes, activation feedback passed |
| Motion | Pause/resume, offscreen stopping, simulated hidden-tab event, and reduced-motion checks passed |
| Essential no-JS behavior | All routes, content, and native mobile navigation remain usable |
| Studio download | 358,399 bytes; valid complete Roblox XML model; browser download hash matches audited 0.1.7 release |
| Source/artifact boundaries | No credentials, backend source, environment files, database, backup, or unapproved plugin package in output |
| Independent Impeccable review | Original five material fixes and subsequent creator-credit/download/404/changelog changes resolved; final reviewed delta received `ship` |

Screenshots of all desktop routes and the mobile homepage are in `verification/screenshots/`. Generated screenshots and detailed machine reports are ignored by Git. The tests exercise Chromium 153 through Playwright 1.63.0 on Windows with Node 24.19.0. These checks support the WCAG 2.2 AA target; they are not a certification or a substitute for assistive-technology testing by people.

The final static artifact contains 23 files totaling approximately 614 KiB, including the 350 KiB Studio plugin, social artwork, and font/licenses. Client JavaScript totals 4,766 bytes across emitted page script content. No frontend framework, animation library, payment SDK, analytics, or third-party embed runs on the website.

## Measured Lighthouse results

Lighthouse 13.5.0, local static preview at `http://127.0.0.1:4321/`, headless Chromium 153.0.8010.12. Scores are local lab measurements, not live GitHub Pages results or guarantees.

| Profile | Performance | Accessibility | Best practices | SEO |
| --- | ---: | ---: | ---: | ---: |
| Mobile, 412 × 823 | 100 | 100 | 100 | 100 |
| Desktop viewport, 1350 × 940 | 96 | 100 | 100 | 100 |

Both measurements used simulated 150ms RTT, 1,638.4 Kbps throughput, and a 4× CPU slowdown. The desktop run changes the viewport/form factor while retaining the mobile throttling and user-agent configuration; it is not Lighthouse's standard desktop preset. Full conditions and audit data are retained in `verification/lighthouse-mobile.json` and `verification/lighthouse-desktop.json`. The initial launcher failed on Windows; the completed audit attached Lighthouse to a Playwright-managed Chromium debugging port.

External GET checks reached six of eight configured official/resource destinations with HTTP 200. Figma Community and the Roblox help privacy page returned HTTP 403 to automation; that does not establish that those pages are unavailable to users. No unverified FrameForge listing is presented as a live installation link.

## Product and download accuracy

Product claims were checked against README, release notes, limitations, behavior/effect documents, hosted-uploader documentation, and source. Version 0.1.7 is an alpha package. Hosted account linking is prepared but not deployed. Individual image fallbacks, native compatible masks, sizing differences, one bundled behavior runtime, and Studio Play testing are stated with their actual boundaries.

The website's Studio file is byte-identical to `dist/FrameForge.rbxmx` and the model in the combined and Roblox 0.1.7 release ZIPs. Its SHA-256 is `53f3ac43f29868c2006fdace12a9f4b237b84fcdb1980b1aa8833fd2aeb20347`. Static inspection found no credentials, outbound HTTP requests, backend origins, numeric asset requires, or `loadstring`. No new live Studio import was performed for this website work.

## Remaining deployment and operating work

1. For policy adoption and actual support processing, finish current-scope operator-identification/provider/legal-formality review, implement the rights/complaints routine, and adopt the policy/effective date. The owner supplied MNGR (@mngr06), Morocco and contacts, and accepted monitoring/retention commitments. The static website can publish with clearly labelled drafts; future backend records have separate launch requirements.
2. Select GitHub Actions as Pages Source for MNGR-OFF/frameforge-website, push the prepared changes, and publish the verified artifact through the manual workflow. The current draft configuration passes publication checks. The latest DNS/HTTPS check is now correct; the automatic Jekyll run failed and the live domain serves GitHub's 404.
3. Confirm the official Figma listing and any future Roblox store destination. The Studio file fallback already works locally and in the prepared build.
4. Deploy the OAuth/upload backend separately, configure its actual HTTPS callback and the Figma build origin, and test real consent, uploads, mapping reuse, restart/reconnect, cancellation, and revocation. Complete Roblox review before claiming public linking availability.
5. Resolve any future donation provider and policy details before enabling the hidden donation component.

Prepared source and static output are complete for review. Public launch and legal effectiveness remain separate owner decisions.

## Standalone repository follow-up

The first public GitHub Actions run on October 5, 2026 built the site successfully but failed type checking. A clean isolated reproduction found missing Node type definitions: the initial plugin-project checkout had supplied them from its parent dependencies. Added `@types/node` 24.19.1 directly to the website's development dependencies and lockfile; no compiler-setting change was needed.

Windows Git checkout also converted line endings in the compiled Studio model. Restored the original 358,399-byte file and added a scoped `.gitattributes` rule to preserve its release SHA-256 exactly. Restored the ignored development files omitted by browser upload. Updated the image-build utility Sharp to 0.35.5; the dependency audit now reports zero vulnerabilities, and its 1200 × 630 image metadata check passed.

A fresh locked installation in the standalone GitHub Desktop clone passes both production and project-path builds, Astro diagnostics, and static verification. All nine browser tests also pass against that clone's production preview on port 4323, including the actual plugin download hash. The owner committed and pushed these fixes as bbe6bf3; GitHub run 37336489412 passed build and project-path-check, with deployment correctly skipped for a push. Public deployment and policy adoption remain pending.

## Current-scope legal rewrite

Rewrote Privacy and Terms around the free static website, manual plugins and voluntary support. Added owner-supplied MNGR (@mngr06), Morocco and email, narrowly described plugin settings and current data handling, preserved applicable EU/UK mandatory rights, and included relevant Moroccan request handling. Detailed inactive-backend inventory remains in maintainer documents. No legal-compliance guarantee or CNDP approval is claimed.

Owner explicitly accepted checking email/Discord every two days and the support/attachment/request-record retention schedule. Readiness records those commitments rather than asserting observed past deletions. Policy adoption and operating checks remain pending, while static publication with clearly labelled drafts is supported. Future backend requirements apply only if enabled.

Both root custom-domain and `/frameforge-preview/` builds pass Astro diagnostics (33 files, zero errors/warnings/hints) and static checks: nine routes, 318 local references, 15 HTTPS destinations, 4,766 bytes client JavaScript. Configured email links are separately checked; isolated negative checks reject a substituted recipient and an added BCC header. The final browser run passes all nine tests (53.7s), including all-route axe checks and no-JavaScript navigation. Desktop/mobile Privacy and Terms screenshots and section-link/contact checks are retained in ignored `verification/`; no overflow was found at 390px or 1440px. These are functional checks, not legal certification.

Final review also fixed impossible-date acceptance in the publication gate, external CSS URL/import detection, the HTML route count after legal adoption, and documentation paths absent from the website-only clone. Isolated in-memory date cases accept a real leap date and reject missing/non-leap/impossible dates without changing the real policy status; isolated output checks reject external CSS URLs/imports. Browser verification now invokes the pinned Astro CLI directly rather than requiring npm on the child process PATH and allows 90 seconds for cold startup; its managed server started successfully and shut down after the passing run. Latest dependency audit: zero reported vulnerabilities. Eleven of fifteen external destinations returned 200; four platform pages blocked automated GETs with 403 rather than indicating a broken public link.

The earlier universal legal deployment gate exceeded the brief's requirement to distinguish drafts from adopted policies. It now permits the current static website without changing any unfinished review flag. Configuration checks accept the actual draft state and a synthetic fully adopted state, and reject an impossible effective date, misleading draft status, hosted linking with drafts, and donations with drafts. Isolated output checks reject missing draft labels, missing noindex metadata, and a fabricated effective date. These checks verify honest configuration and output, not regulatory approval.

Removed robots.txt crawl restrictions on draft policies while retaining their noindex metadata and sitemap exclusion: crawlers need access to read noindex, as [Google's indexing guidance](https://developers.google.com/search/docs/crawling-indexing/block-indexing) explains. Static verification rejects crawl restrictions that would interfere with this. Account-page launch wording now refers specifically to hosted linking.

## Updated live domain observation

The owner configured Namecheap DNS. A fresh read-only check on October 5, 2026 found the four correct GitHub A records, `www` CNAME `mngr-off.github.io`, and valid HTTPS for both names through January 3, 2027. The site currently returns GitHub 404, with HTTP/www/project URL redirecting to the HTTPS apex. Automatic Jekyll run 37337762060 failed, separate from the earlier successful Astro checks. Select GitHub Actions as Pages Source; no further DNS replacement is justified by the observed records. Authenticated settings, a new push and actual publication remain unverified.
