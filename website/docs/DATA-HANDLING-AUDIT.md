# FrameForge data-handling audit

Reviewed 5 October 2026. This is a source-code audit and a publication-preparation record, not a verification of a deployed service or a legal compliance certification. No private environment files, secrets, account databases, or actual user records were inspected.

The public legal content is maintained in `website/src/data/legal.ts`. The owner supplied MNGR (@mngr06), Morocco, grnour06@gmail.com and Discord as a direct contact, then expressly accepted two-day contact checks and the support-retention routine. The revised public notice covers the static website/manual workflow and voluntary support; hosted-service inventory below is retained for its separate future launch. See [legal adoption and operating record](LEGAL-READINESS.md) for accepted commitments and remaining current-scope requirements. There is no effective legal-policy date yet.

## Architecture and current state

The website is static product documentation prepared for GitHub Pages. The Figma plugin performs native UI serialization, previews, metadata edits, and JSON export. Optional image uploading uses a separate Node account service; GitHub Pages cannot execute it. Neither the registered domain nor the prepared code verifies backend deployment, DNS, public OAuth approval, or successful real asset uploads.

Evidence from the separate FrameForge plugin project: `docs/hosted-uploader.md` requires deployment before the normal connection flow is available; `figma-plugin/src/ui/hosted-uploads.ts:43` rejects linking when no service origin is configured. `docs/oauth-setup.md` describes a separate developer helper workflow. Those plugin/server sources and instructions are not included in this website-only repository; the references record audit provenance rather than standalone-clone file destinations.

## Data inventory

| Processing | Information | Purpose and location | Retention / deletion evidence |
| --- | --- | --- | --- |
| Public website | Browser example controls; network request metadata at the host | Controls run in the browser. The prepared website does not accept visitor designs, account login, or payment credentials. GitHub Pages logs visitor IP addresses for security. | GitHub controls its own logs. No owner/provider retention schedule is confirmed. No website analytics or embeds should be enabled without another review. |
| Figma client preferences | Export settings (`ff.settings`), asset-ID mappings (`ff.assets`), automatic-upload choice (`ff.upload.preferences`) | Figma private plugin client storage; improves repeated export and mapping workflows. | No automatic age-based deletion in controller source. Disconnect does not delete mappings/settings. See `figma-plugin/src/code/main.ts:34`, `:92`, `:162`, `:165`. |
| Figma account storage | Service origin, opaque connection token, expiry | `frameforge.hostedAccount.v1`; scoped to configured service origin. Roblox tokens are absent. | Removed by disconnect and invalid-session handling. Shared validator limits accepted saved sessions to 90 days. See `shared/hosted-account.ts:25` and `figma-plugin/src/code/main.ts:80`. |
| Figma design metadata | Layer behavior and configuration | Node plugin data, distinct from private account credentials. Travels with the document's nodes. | Edited/cleared as layer metadata; not removed by account disconnect. See `figma-plugin/src/code/metadata.ts` and `figma-plugin/src/code/main.ts:109`. |
| Hosted connection row | Token/request/browser/state hashes, validity timestamps, state/message, encrypted OAuth snapshot | SQLite persistent service volume; authenticates and binds consent to initiating plugin. | Ten-minute pending validity; successful connection is assigned 90-day validity on first transition to connected. Expired connection rows are pruned opportunistically. See `upload-service/hosted-store.mjs:52`, `:70`. |
| Hosted OAuth snapshot | PKCE pending state/verifier/deadline, Roblox access/refresh tokens and expiry, internal session ID, Roblox user ID and displayed profile name | AES-256-GCM encryption, per-row authenticated data; account identity, upload authorization, token refresh. | Connection removal deletes its row; token expiry alone does not establish data deletion. See `upload-service/oauth.mjs:82` and `upload-service/hosted-store.mjs:29`. |
| Authorization browser cookie | Random browser-flow credential | Hosted backend cookie binds callback to browser. HTTPS cookie uses `__Host-`, Secure, HttpOnly, SameSite=Lax, Path=/. | Max-Age 600 seconds; callback clears cookie. See `upload-service/hosted-http.mjs:59` and `:130`. |
| Requested images | Figma asset identifier/name, MIME type, encoded bytes; decoded PNG/JPEG bytes and sanitized filename | Plugin → service memory → Roblox Assets API. Display name and creator context accompany file. | No image-file write or image BLOB persistence in inspected implementation. Provider logs and backups require separate configuration review. See `figma-plugin/src/ui/hosted-uploads.ts:185`, `upload-service/validation.mjs:32`, `upload-service/uploader.mjs:103`. |
| Hosted upload records | `User:<Roblox ID>:<SHA-256 image hash>`, owner ID, operation ID, creating flag, result asset ID/moderation, failure code/message/status/details | Persistent SQLite records allow retry of an existing operation and avoid duplicating a possibly accepted upload after restart. | No time-based expiry, no timestamp field, no account-disconnect purge. Specific rejected creation failures can remove their record. See `upload-service/uploader.mjs:25`, `:117`, `:129` and `upload-service/hosted-store.mjs:92`. |
| Hosted rate limits | Hashed namespace/value bucket, count, reset time | Request-abuse/capacity handling. Network bucket uses socket remote address, often the proxy; upload bucket uses Roblox ID. | Expired rows pruned during new connection creation or capacity checks. Namespace windows vary (one or ten minutes); window expiry is not exact deletion time. See `upload-service/hosted-store.mjs:82`, `upload-service/hosted-http.mjs:90`, `:99`, `:169`. |
| Hosting / monitoring / backup records | Potential network metadata, database backups, operational messages | Provider and operator operations | No deployed provider or schedule verified. The server source logs a fixed startup/configuration message rather than request bodies. Hosting logs must be reviewed independently. |
| Support messages | Email/Discord identity, voluntary messages, dates and attachments | Troubleshooting and privacy requests; MNGR in Morocco, Gmail and Discord @mngr06 | Owner accepted 12-month correspondence, 30-day closed-case attachments and 24-month minimal request/complaint records, plus two-day contact checks. Implement the routine in LEGAL-READINESS.md; no independent verification of existing-message deletion. |
| Future donations | Potential provider-side payment and supporter details | Disabled external support link; no site payment collection | Provider/destination and owner transaction-data access are unchosen. Re-audit before enabling. |

Image hashes and account-linked credential hashes are **not anonymous data**. They remain identifiers connected to processing or an account. Only the OAuth blob is encrypted by the application; upload metadata and connection/rate fields are separate SQLite columns. Disk/provider encryption is unverified.

## OAuth scope evidence

The authorization request uses `openid profile asset:read asset:write` (`upload-service/oauth.mjs:5`, `:59`).

| Scope | Implemented purpose | Evidence |
| --- | --- | --- |
| `openid` | Receive and validate the Roblox account subject | `/userinfo`, numeric `profile.sub` validation, `oauth.mjs:78`–`:82` |
| `profile` | Display username/profile name for the linked account | `preferred_username` or `name` fallback, `oauth.mjs:82` |
| `asset:write` | Create requested image assets under the linked personal user | POST `/assets`, `uploader.mjs:103`; hosted creator kind fixed to User, `hosted-http.mjs:176` |
| `asset:read` | Poll the created upload operation and inspect asset/moderation result | GET `/operations/<operationId>`, `uploader.mjs:86` |

The token-response scope validator requires `openid asset:read asset:write` when Roblox returns a scope string; the request also asks for `profile`. Do not claim broader asset browsing, group upload in hosted mode, payment access, email collection, or password collection. The service does not persist a complete Roblox profile response, only the selected ID/name.

## Disconnect, revocation, and deletion

The Figma UI clears its saved credential before making DELETE `/v1/account` (`figma-plugin/src/ui/hosted-uploads.ts:91`). If the request fails, it reports local disconnection and advises revoking FrameForge in Roblox. This is not proof of remote revocation.

On the backend, disconnect clears pending/session state, invokes Roblox token revocation, and removes the connection row before awaiting the revocation result (`upload-service/hosted-http.mjs:153`, `upload-service/oauth.mjs:105`). Existing application access is invalidated even if Roblox revocation is unavailable. A current active upload blocks disconnect until it finishes.

Upload-operation records survive disconnect because `store.remove()` deletes only from `connections`. Roblox assets, saved export files, client mappings, provider logs, and backups are separate. There is no authenticated upload-history deletion endpoint or backup-erasure procedure in the inspected code. SQL row deletion is not a promise of immediate physical erasure from SQLite pages, journal files, or backups.

## Retention and operating decisions before hosted launch

1. Confirm the legal operator and location; the Discord identity does not establish either.
2. Choose a monitored privacy/support contact and a verified-request procedure.
3. Confirm host, ingress/DNS/proxy, monitoring, backup providers, processing locations, administrators, and transfer arrangements.
4. Set justified retention rules separately for pending/connected records, upload history, rate limits, provider logs, support messages, and backups. Implement those rules rather than equating 90-day credential validity with retention of all data.
5. Implement account-associated upload-history deletion and backup handling. Consider timestamps and a safe expiry design that preserves duplicate-upload protection while processing is uncertain.
6. Exclude Authorization, Cookie, callback query strings, private connection paths, request bodies, and image content from access/error logs. Confirm this at the ingress and provider as well as in app code.
7. Confirm applicable lawful bases, privacy rights, age/parental safeguards, required operator notices, and legal-request handling. Roblox consent is not automatically a chosen privacy-law basis for every processing purpose.
8. Review warranty/liability language, consumer protections, license, governing law, disputes, eligibility, and change notices before adopting terms.
9. Re-audit donations after provider selection and enable only a verified external URL.
10. Verify real deployment, HTTPS callback, consent/upload behavior, disconnection failure, restart recovery, storage access and backups before approving final notices and effective dates.

## Primary references checked

- [GitHub Pages data collection](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages): static hosting and visitor IP logging for security.
- [GitHub Privacy Statement](https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement): GitHub's own processing; does not establish a FrameForge log-retention period.
- [Figma Privacy Policy](https://www.figma.com/legal/privacy/): Figma platform processing; do not promise the platform stores no data.
- [Roblox Privacy and Cookie Policy](https://en.help.roblox.com/hc/en-us/articles/115004630823-Roblox-Privacy-and-Cookie-Policy): Roblox independently processes data; do not equate FrameForge disconnect with Roblox asset deletion.
- [Roblox OAuth app registration](https://create.roblox.com/docs/cloud/auth/oauth2-registration): public app-review requirements are separate from website preparation.
- [ICO guide to individual rights](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/): supports conditional rights categories; does not establish UK GDPR applicability to this unconfirmed operator.

Public draft copy should link these provider policies and retain conspicuous status. None of these sources establishes the owner's identity, jurisdiction, deployment, legal basis, retention commitments, or approval.
