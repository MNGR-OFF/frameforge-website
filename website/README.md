# FrameForge public website

Astro static output, TypeScript, and CSS live independently of the working plugins and account service. Only `website/dist/` is a deployment artifact. The website does not run OAuth, collect payments, or import Figma files.

## Develop and verify

Use Node.js 24; the package requires at least Node 22.12. Node type definitions are a direct website development dependency, so checks also work in a standalone clone. The repository's `.gitattributes` preserves the Studio download's exact bytes across Windows and Linux. From this directory:

```sh
npm ci
npm run dev
```

For production output and verification:

```sh
npm run build
npm run check
npx playwright install chromium
npm run test:browser
npm run preview
```

`check` runs Astro diagnostics and inspects the existing build, so run `build` first. Browser checks use the static preview and cover direct routes, menus, keyboard use, reduced motion, responsive overflow, and automated accessibility. Reports and screenshots go into ignored `verification/`. Automated accessibility checks supplement manual review; they do not certify WCAG compliance. See the [verification report](docs/VERIFICATION.md) for measured results; no Lighthouse score is assumed. [DESIGN.md](DESIGN.md) records the implemented visual system; `.impeccable/design.json` supplies its machine-readable tokens and component examples.

## Deployment modes

The default environment is `SITE_ORIGIN=https://frameforgeui.website` and `SITE_BASE_PATH=/`. For a GitHub project-site preview, use the actual owner origin and repository path in both build and checks:

```powershell
$env:SITE_ORIGIN = 'https://YOUR-OWNER.github.io'
$env:SITE_BASE_PATH = '/YOUR-REPOSITORY/'
npm run build
npm run check
npm run preview
```

Replace the example values; never include the repository path in `SITE_ORIGIN`. Restore the custom-domain variables and rebuild before preparing its artifact. Internal links, generated assets, canonical URLs, social URLs, sitemap, and robots use this configuration. Pages receive actual directory `index.html` files, with `404.html` at the build root. A `CNAME` is included only for the canonical root custom-domain build; it is omitted from project-site previews.

The workflow at `../.github/workflows/website.yml` uses Node 24 and locked dependencies. Pushes and pull requests run checks only. A manual run defaults to `deploy: false`. Publishing requires an explicit manual run on the repository's default branch, successful checks in both path modes, and `npm run check:publication`. Only the deploy job receives Pages/OIDC write permissions. GitHub run 37336489412 passed the website checks; publication has not succeeded yet.

Astro's [official Pages guide](https://docs.astro.build/en/guides/deploy/github/) recommends its deployment action. This workflow uses the documented build/artifact/deploy model directly so verification and the publication gate finish before artifact upload. Actions are pinned to release commits; review updates before changing those pins.

## Domain and HTTPS

The owner confirmed Namecheap registration of `frameforgeui.website`. A fresh read-only check on October 5, 2026 finds all four GitHub Pages A records, `www` pointing to `mngr-off.github.io`, and valid HTTPS covering both names. The domain currently serves GitHub's 404 because the website artifact has not been published. See [deployment readiness](docs/DEPLOYMENT-READINESS.md).

Choose **GitHub Actions** in repository **Settings → Pages** and retain `frameforgeui.website` as the custom domain. The automatic Jekyll run 37337762060 failed; this Astro project is built by its own Actions workflow. A `CNAME` in the artifact does not configure the repository's Pages source. The observed DNS is already correct; no replacement is needed based on the latest check. Enable **Enforce HTTPS** if not already enabled, then publish the verified artifact through the manual workflow after its configuration checks pass. Clearly labelled policy drafts are supported for the current static website. [GitHub's domain guidance](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site) explains account ownership verification and certificate checks.

Do not point `api` at Pages. It requires a separate server host. No DNS, hosting, or publication changes are performed by the local build.

## Content, links, and donations

Edit `src/data/site.ts` for product status, release information, navigation, installation links, legal metadata, and donations. Update page prose when behavior changes. Only add official Figma/Roblox listing URLs after checking their destinations and publisher identity; current install actions give honest guidance while specific listings remain unverified. Never turn `account.available` on until real HTTPS authorization/upload tests and Roblox review are complete.

Donations are hidden by default. After selecting and verifying the owner's external provider, set `donationsEnabled`, `donationUrl`, `donationProvider`, `donationLabel`, and `verified`; update the privacy information first. The component validates a public HTTPS URL and uses safe external-link behavior. It collects no payment data and promises no access, license, subscription, charitable status, or tax deduction. Reassess [Pages hosting suitability](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) if the site becomes primarily a commercial service.

## Studio plugin download

The website includes the complete, compiled `FrameForge-0.1.7.rbxmx` Studio plugin as a direct-download fallback. It matches the model in the project's verified 0.1.7 release packages; it contains no account service or credentials. The homepage and guide explain **Plugins → Plugins Folder**, copying the file, disabling another copy, and reopening Studio. A browser test checks the downloaded filename and SHA-256.

`site.downloads.studio` controls availability, version, filename, byte count, and the expected hash. To update it, first verify the new packaged Studio model, copy that model into `public/downloads/`, update its checksum file and configuration, then build and check. The build verifier allows only the configured model with the exact expected hash. Never copy an entire `dist/`, release ZIP, or backend bundle into website assets. A verified Creator Store URL can take priority in installation actions while the file fallback remains available. This distribution does not assign an open-source license to the plugin.

## Legal and rights review

Privacy and terms now describe the free static website, manual plugin workflow and voluntary support, using the owner's supplied name MNGR (@mngr06), Morocco, and email. They preserve applicable EU/UK rights and account for relevant Moroccan privacy rules. The hosted account service remains outside the current notice and has separate launch requirements.

The pages remain adoption drafts, excluded from the sitemap, pending final policy adoption/operating review. The static website can publish with that honest status. See [legal adoption and operating record](docs/LEGAL-READINESS.md) for accepted retention and monitoring commitments and the remaining operational review. No blanket CNDP website-publication approval is claimed or required by the build. Review any applicable formalities for actual support-data processing separately. Hosted linking and donations still require adopted, matching notices before enabling.

Run the configuration check in either draft-static or adopted mode:

```sh
npm run check:publication
```

Readiness flags record completed decisions; changing flags alone is not legal review. See [asset register](ASSET-REGISTER.md) for supplied-brand permission, original artwork, and retained font notices. No license is assigned to the FrameForge plugins or brand by this website.

## Security and the separate account service

The static website uses escaped Astro rendering, local assets/fonts, no third-party analytics or embeds, and no forms handling authorization or payment. Astro emits a compatible meta CSP with local resources and hashed inline scripts/styles as needed. A meta policy applies after it is parsed and cannot set HTTP-only protections such as `frame-ancestors`, CSP reporting, HSTS, `X-Content-Type-Options`, or a response `Permissions-Policy`. GitHub Pages supports HTTPS but provides no project `_headers` mechanism; adding that file would not configure response headers. If controlled response headers become necessary, use an appropriate proxy or host and assess its privacy implications.

The existing Node service must be deployed separately with HTTPS, protected secrets, and persistent single-instance storage. `https://api.frameforgeui.website` is proposed only. Detailed `docs/hosted-uploader.md` instructions belong to the separate FrameForge plugin project and are not included in this website-only repository. Preserve its PKCE, state/browser binding, encrypted token storage, per-user isolation, cancellation, and limits. Configure the actual callback ending `/oauth/callback`, test a real personal-account upload, update the Figma build origin, and complete the [OAuth review preparation](ROBLOX-OAUTH-REVIEW.md) and [data audit](docs/DATA-HANDLING-AUDIT.md). GitHub Pages cannot run this server. Never copy its source, environment, SQLite database, backups, or credentials into `public/` or `dist/`.
