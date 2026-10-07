# Deployment readiness

Prepared October 5, 2026. Local implementation and deployable static output are separate from live hosting, policy adoption, and Roblox app approval. The current static website can publish with clearly labelled policy drafts; actual privacy duties still require the operating review below. No DNS records, hosting purchases, Pages settings, or OAuth registration were changed.

## Verified domain state

The owner confirmed Namecheap registration of `frameforgeui.website` and has since configured DNS. A fresh read-only check on October 5, 2026 supersedes the earlier registrar-parking snapshot:

| Query | Observed response | Meaning |
| --- | --- | --- |
| Apex A | `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` | Correct GitHub Pages records. |
| Apex AAAA | No record | IPv6 is optional; correct IPv4 is present. |
| Nameservers | `dns1.registrar-servers.com`, `dns2.registrar-servers.com` | Registrar-managed DNS. |
| `www` CNAME | `mngr-off.github.io` | Correct Pages hostname, without a repository path. |
| TLS | Valid Let’s Encrypt certificate for apex and `www`, expires January 3, 2027 | HTTPS is available. |
| HTTPS apex | GitHub `404 Not Found` | Domain works; the website artifact still needs successful publication. |
| HTTP / `www` / project URL | Redirect to HTTPS apex | Custom-domain routing is active. |

The latest automatic [pages build and deployment run 37337762060](https://github.com/MNGR-OFF/frameforge-website/actions/runs/37337762060) failed at **Build with Jekyll**, while the [Astro run 37336489412](https://github.com/MNGR-OFF/frameforge-website/actions/runs/37336489412) passed. The failed Jekyll run indicates a branch-build configuration; authenticated Pages settings were unavailable to this read-only check. Select **GitHub Actions** as the source in Settings → Pages and retain the custom domain. Do not try to make Jekyll build the Astro source. No DNS change is needed based on these observations. Account/domain-verification TXT values still come from the owner's authenticated GitHub settings.

## Owner-authorized Pages setup

Follow [Astro's Pages deployment guidance](https://docs.astro.build/en/guides/deploy/github/) and [GitHub's current custom-domain instructions](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). For an Actions deployment, repository **Settings → Pages** controls the custom domain; GitHub ignores the artifact `CNAME` for that setting. The build retains a conventional canonical-domain `CNAME` for compatibility.

1. Review and push the prepared website changes to MNGR-OFF/frameforge-website. The current static configuration passes with clearly labelled policy drafts; adopting the policies is a separate decision.
2. In **Settings → Pages**, select **GitHub Actions** as Source and retain `frameforgeui.website` as the custom domain. Check account-level ownership verification using the exact TXT value GitHub supplies.
3. Retain the verified Namecheap A and `www` records. Add GitHub's documented IPv6 records only if desired; avoid wildcard records. The future `api` host uses a separate server provider.
4. Enable **Enforce HTTPS** if not already enabled. Follow [GitHub's HTTPS guidance](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https) if certificate status changes.
5. Push website or workflow changes to `main`, the repository's default branch, to publish automatically using origin `https://frameforgeui.website` and base `/`. Static, browser, alternate-base, and publication checks must pass before publishing `website/dist/`. PRs and other branches only validate. For a manual publication, run **FrameForge website** on `main` and check **Publish the reviewed website to GitHub Pages**; an unchecked manual run only validates.
6. After deployment, verify every public route by direct navigation and refresh, canonical/social metadata, font/logo requests, the plugin download hash, `404.html`, sitemap/robots, HTTPS, navigation, and configured destinations.

For project-site testing, use `SITE_ORIGIN=https://OWNER.github.io` and `SITE_BASE_PATH=/REPOSITORY/`. The built `CNAME` must be absent. Repository Pages custom-domain configuration applies to the repository as a whole; use a separate preview repository if an independent public project URL is needed alongside production. Do not assume two dispatches create two separately hosted sites.

## Policy adoption and operating review

- **Operator and contact:** the owner supplied MNGR (@mngr06), Morocco and grnour06@gmail.com; Discord is preferred for direct contact. The owner now accepts checking both channels every two days. Confirm legally adequate operator identification and follow that monitoring routine.
- **Jurisdiction and provisions:** assess applicable Moroccan CNDP formalities/current-support transfers and any EU/UK territorial, representative or child-data obligations. Adopt the reviewed free-tool terms, rights/complaints procedure and effective date; no jurisdiction is inferred from the workstation.
- **Current providers:** GitHub Pages, Gmail/Discord support, Namecheap registrar and platform processing. Confirm actual arrangements and any required safeguards rather than treating provider policies as a substitute for the maintainer's duties.
- **Current retention:** the owner accepted 12-month support correspondence, 30-day resolved/closed-case attachments and 24-month minimal request/complaint records. Implement these limits with the 90-day inactivity closure. See [legal adoption and operating record](LEGAL-READINESS.md). They are not verified past deletion practice.
- **Future backend:** host selection, token/upload-history/rate-limit/log/backup retention and authenticated deletion are separate launch requirements while account linking is unavailable. Upload records currently survive disconnect and have no automatic age deletion; the future notice must reflect or fix that behavior. They do not block adoption of the current static/manual-workflow notice.
- **Rights and destinations:** retain supplied-brand permission evidence, resolve any expanded brand license, and verify any future donation destination. The owner supplied both plugin listings on October 7, 2026; primary page/asset reads confirm FrameForge destinations. Store installation and the store release version remain untested, while the verified local file is an independent installation option.

For policy adoption, update the actual page prose and centralized legal settings to reflect completed decisions, then run `npm run check:publication`. Static publication is also supported with explicit draft labels, no effective date, and noindex metadata. A draft label does not waive duties for actual support-data processing or satisfy a public OAuth review requirement.

## Hosted upload and Roblox review

Pages hosts static HTML only. The account service and its detailed `docs/hosted-uploader.md` instructions remain in the separate FrameForge plugin project, outside this website-only clone. It requires HTTPS, a single Node 24 instance, persistent protected SQLite volume, server-only encryption/token secrets, and an exact `/oauth/callback` origin. Do not publish server source or secrets as static files. Backend DNS, host selection, actual consent/upload tests, privacy answers, and app review remain incomplete. See `../ROBLOX-OAUTH-REVIEW.md` and `DATA-HANDLING-AUDIT.md` for the included review and audit records.

## Verification record

Website source is isolated; builds use a dedicated lockfile and only the static output is uploaded. Static verification checks routes, local references, metadata, safe external URLs, the configured email destination, client-size limits, CSP, private artifact boundaries, and truthful policy status. Browser verification exercises accessibility, mobile layouts, navigation, clipping controls, reduced motion, and console errors. GitHub run 37336489412 at commit bbe6bf3 passed both checks and skipped deployment under the previous manual-only workflow. The updated workflow publishes eligible default-branch pushes or explicitly enabled manual runs after successful technical and configuration checks. Automated checks do not establish legal compliance, complete WCAG conformance, OAuth approval, or live DNS/HTTPS readiness.
