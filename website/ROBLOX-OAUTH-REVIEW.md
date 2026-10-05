# FrameForge — Roblox OAuth review preparation

Prepared October 5, 2026 from the implemented account/upload code and [current Roblox registration guidance](https://create.roblox.com/docs/cloud/auth/oauth2-registration). This is a maintainer checklist, not a submission or approval. Hosted account linking is not deployed; the proposed `api` hostname currently has no DNS record. The static website alone does not complete review.

## Dashboard values

| Field | Prepared value |
| --- | --- |
| Application name | FrameForge |
| Public Client ID | `5422817878534833533` — public identifier, not a secret |
| Category | Creation & Productivity Tools |
| Proposed Entry Link | `https://frameforgeui.website/` |
| Proposed Privacy URL | `https://frameforgeui.website/privacy/` |
| Proposed Terms URL | `https://frameforgeui.website/terms/` |
| Redirect URL | Exact deployed service origin + `/oauth/callback`; not determined until hosting/DNS/HTTPS are verified |

Short factual description for the current preparation stage (116 characters):

> FrameForge converts Figma designs into editable Roblox UI. Hosted account linking for image uploads is not live yet.

After real hosted authorization/upload verification, use the following description (133 characters):

> FrameForge converts Figma designs into editable Roblox UI, with optional image uploads through each user's authorized Roblox account.

The public registration documentation does not state the current dashboard description character limit. Confirm the live field counter before saving; these short alternatives avoid relying on an invented limit. Neither a signed-in dashboard nor its validator was inspected. Keep the current availability statement accurate until the private test actually works.

Roblox documents HTTPS privacy/terms links and redirects of at most 256 characters, and up to ten redirect URLs. The proposed public URLs fit that limit. The review requires final, publicly accessible HTTPS legal pages; drafts are not sufficient. `https://api.frameforgeui.website/oauth/callback` is an example only. The implemented hosted callback is derived from `FRAMEFORGE_PUBLIC_ORIGIN` in `upload-service/hosted-http.mjs`; use its actual value. The localhost callback is for development and is not the public callback.

## Category and scope justification

FrameForge is a content creation tool: users export their own Figma interface into structured, editable Roblox UI and map individual graphics to Roblox assets. It is more than an account identity mapping tool. The requested set is implemented in `upload-service/oauth.mjs`.

| Scope | Implemented purpose and evidence |
| --- | --- |
| `openid` | The OAuth callback requests `/userinfo`, validates the account's `sub`, and binds uploads to that user ID. `hosted-http.mjs` creates an uploader with `creatorKind: 'User'` and the authorized account ID. This keeps personal uploads associated with the user who consented. |
| `profile` | The same `/userinfo` response supplies `preferred_username` or `name` for the plugin's visible connected-account label. The code stores a bounded ID/name pair, not an unrestricted profile mirror. Roblox requires `openid` alongside `profile`. |
| `asset:read` | `upload-service/uploader.mjs` polls `GET /assets/v1/operations/{operationId}` for the image creation result, reads its asset ID and moderation result, and resumes a previously pending operation rather than silently creating another upload. It does not implement browsing a user's entire asset library. |
| `asset:write` | The uploader sends `POST /assets/v1/assets` with exported image bytes and the authorized personal creator ID. The resulting ID is mapped back to the export. This is creation of requested image assets, not arbitrary account editing or automatic deletion. |

The current [Roblox scopes reference](https://create.roblox.com/docs/cloud/reference/scopes) lists `GET /assets/v1/operations/{operationId}` under `asset:read`, asset creation under the asset scopes, and `/oauth/v1/userinfo` under identity scopes. This supports the purposes above; the implemented code uses only the described subset. Request only these implemented permissions and verify the real registered app against the [Assets API security guidance](https://create.roblox.com/docs/cloud/guides/usage-assets#security-permissions). Do not justify future group uploads, publishing experiences, or other unimplemented features. Existing mapped image keys are skipped by `figma-plugin/src/ui/hosted-uploads.ts`; server records prevent accidental duplicate creation across restarts.

## Actual flow and security to demonstrate

The connection starts in the installed Figma plugin. It creates a pending service connection, opens Roblox authorization, and checks the result automatically. A successful callback returns the browser to the service's completion page, which tells the user to return to Figma. The bound plugin session then displays the connected account; there is no public website login button or standalone pairing-code flow.

The service implements S256 PKCE, expiring state, a browser-binding HTTP-only cookie, per-user connection isolation, encrypted OAuth snapshots, rotating-token handling, and cancellation. Roblox credentials stay on the service; private Figma storage keeps only an opaque revocable connection credential. Never record access/refresh tokens, client secrets, encryption keys, callback queries, connection headers, pairing codes, or the database.

## Public demo recording plan — at most 60 seconds

Use the real installed app and deployed HTTPS service, with the same name, category, scopes, URLs, and thumbnail as the registration. Capture a continuous authorization flow; use narration to keep the sequence clear.

| Time | Visible action |
| --- | --- |
| 0–8 s | Show FrameForge in Figma signed out/disconnected, with the account settings open. |
| 8–15 s | Click the actual **Connect Roblox** action that begins the pending plugin session. |
| 15–32 s | Show Roblox's real authorization/consent screen and the requested account/scopes; approve them as the user. Include sign-in if Roblox requires it. |
| 32–43 s | Show the real redirect and service completion page without exposing callback URL query parameters. |
| 43–53 s | Return to the same Figma session and show the automatically updated connected account state. |
| 53–60 s | If time allows, show one real requested image upload reaching an asset-ID mapping. Otherwise provide that verification separately; the consent/redirect/result sequence has priority. |

Roblox requires a publicly reachable demo link no longer than one minute showing the starting signed-out state, triggering action, consent, redirect, and resulting original app content. Record only after deployment/private testing; do not substitute the website's illustrative browser animation for OAuth footage. The owner's video host and final link remain undecided.

## Required before submission

- Complete public-site authorization, DNS, HTTPS, and final privacy/terms review.
- Choose the backend host, deploy its actual origin, configure its exact callback, and protect its single-instance persistent volume and secret settings.
- Build the Figma plugin with that exact verified origin; confirm authorization, expected personal-account image ownership, mappings, reuse, restart recovery, cancellation, disconnect, and intended-experience image access.
- Reconcile actual service providers, logging, backups, upload-record retention, and deletion with the public policy. Disconnection removes the service connection; it does not delete uploaded Roblox assets or automatically erase upload records.
- Verify the live dashboard description counter, thumbnail, category/scopes, and video link, then review the one-minute recording for sensitive material.
- Obtain owner authorization before submitting. No app submission or dashboard edit has been performed.

Roblox currently limits private apps to ten unique users and keeps the app private during review. Scopes must reflect implemented behavior; planned functionality is not reviewable. Consult the linked current registration guidance before submission, especially if these rules have changed.
