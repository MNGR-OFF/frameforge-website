# Deployment readiness

Prepared October 5, 2026. Local implementation and deployable static output are separate from live hosting, final legal publication readiness, and Roblox app approval. No DNS records, hosting purchases, Pages settings, or OAuth registration were changed.

## Verified domain state

The owner confirmed that registration of `frameforgeui.website` is managed at Namecheap. The supplied registrar screenshot shows the domain in the owner's account with expiration on October 4, 2027. This is registration evidence, not proof of a working website or certificate.

Read-only PowerShell DNS checks and an independent Google Public DNS HTTPS lookup found:

| Query | Observed response | Meaning |
| --- | --- | --- |
| Apex A | `192.64.119.108` | Does not match GitHub Pages A records. |
| Apex AAAA | Google public DNS returned NOERROR with no AAAA answer | No public AAAA record observed. A local resolver returned a DNS64-synthesized `64:ff9b::c040:776c`, which is not a Pages IPv6 record. |
| Nameservers | `dns1.registrar-servers.com`, `dns2.registrar-servers.com` | Registrar-managed DNS. |
| `www` CNAME | `parkingpage.namecheap.com` | Registrar parking, not a Pages hostname. |
| `api` A | NXDOMAIN | Proposed backend address is not configured. |

These responses can change; recheck at deployment. A public TLS certificate and a site response have not been verified at the custom domain. Repo owner/name, repository Pages settings, and domain-verification TXT value cannot be inferred from the screenshot.

## Owner-authorized Pages setup

Follow [Astro's Pages deployment guidance](https://docs.astro.build/en/guides/deploy/github/) and [GitHub's current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). For an Actions deployment, repository **Settings → Pages** controls the custom domain; GitHub ignores the artifact `CNAME` for that setting. The build retains a conventional canonical-domain `CNAME` for compatibility.

1. Confirm the destination repository and authorize publication after resolving the legal decisions below.
2. Verify ownership using GitHub's account/domain verification instructions and the exact TXT value it supplies. Select **GitHub Actions** as the Pages source and save `frameforgeui.website` as the custom domain before pointing DNS at Pages.
3. In Namecheap, remove/replace conflicting apex parking or URL redirect entries. Use the four GitHub Pages A records: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Alternatively use a provider-supported ALIAS/ANAME to the actual `OWNER.github.io` host. Reconfirm these values in the linked official instructions when performing the change.
4. If IPv6 is enabled, add GitHub's four AAAA records: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`; retain IPv4 as GitHub recommends. Do not keep unrelated apex address records.
5. Optionally replace `www` parking with a CNAME pointing directly to the actual `OWNER.github.io` hostname, without a repository path. Do not add a wildcard DNS record. The backend's `api` host uses its separate provider's instructions.
6. Resolve the domain again, wait for GitHub's DNS/certificate checks, enable **Enforce HTTPS**, and verify HTTP redirects to HTTPS with no mixed content. Follow [GitHub's HTTPS guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) if certificate provisioning fails.
7. Dispatch **FrameForge website** from the repository's default branch with the appropriate origin/base and `deploy: true`. The default is false; pushes and PRs only validate. The build must pass static, browser, alternate-base, and publication checks before publishing `website/dist/`.
8. After deployment, verify every public route by direct navigation and refresh, the actual custom-domain canonical/social metadata, font/logo requests, `404.html`, sitemap/robots, HTTPS, navigation, and optional configured destinations.

For project-site testing, use `SITE_ORIGIN=https://OWNER.github.io` and `SITE_BASE_PATH=/REPOSITORY/`. The built `CNAME` must be absent. Repository Pages custom-domain configuration applies to the repository as a whole; use a separate preview repository if an independent public project URL is needed alongside production. Do not assume two dispatches create two separately hosted sites.

## Publication decisions still required

- **Operator and contact:** legal operator identity and a monitored privacy/support contact. `Discord: @mngr06` is supplied creator identification; it is not an invented legal business identity or confirmed privacy mailbox.
- **Jurisdiction and provisions:** applicable legal jurisdiction, effective date, and reviewed warranty/liability/rights terms. Do not select them from the workstation's timezone.
- **Providers:** actual static/backend providers and processors, their logging/security processing, and any donation provider once selected.
- **Retention and deletion:** separate schedules and procedures for connections, upload hashes/status/asset mappings, proxy/application logs, SQLite copies, and backups. Code gives a ten-minute pending link and a ninety-day connection expiry, but expiry is not a universal retention schedule. Current `hosted-store.mjs` pruning deletes expired connection/rate rows; disconnect deletes the connection row. It does not automatically delete persistent user upload records or uploaded Roblox assets. Decide and document the operational cleanup and deletion process.
- **Rights and destinations:** retain supplied-brand permission evidence, resolve any expanded brand license, confirm official plugin listings, and verify any donation destination. Installation guidance remains usable while specific listings are unverified.

Update the actual page prose and centralized legal settings, then run `npm run check:publication`. Draft legal pages remain explicitly labeled, with no effective date until approved. Their local availability does not mean they satisfy a public OAuth review requirement.

## Hosted upload and Roblox review

Pages hosts static HTML only. Deploy `upload-service/` separately using `../../docs/hosted-uploader.md`: HTTPS, a single Node 24 instance, persistent protected SQLite volume, server-only encryption/token secrets, and an exact `/oauth/callback` origin. Do not publish server source or secrets as static files. DNS, host selection, actual consent/upload tests, privacy answers, and app review remain incomplete. See `../ROBLOX-OAUTH-REVIEW.md` for verified code-based scope purposes and the real recording plan.

## Verification record

Website source is isolated; builds use a dedicated lockfile and only the static output is uploaded. Static verification checks routes, local references, metadata, safe external URLs, client-size limits, CSP, and private artifact boundaries. Browser verification exercises accessibility, mobile layouts, navigation, clipping controls, reduced motion, and console errors. The final local report records actual results and screenshots; workflow execution and live-host checks remain unperformed until authorized. Automated checks do not establish legal compliance, complete WCAG conformance, OAuth approval, or live DNS/HTTPS readiness.
