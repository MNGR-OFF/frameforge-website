import { site, safeExternalUrl } from '../src/data/site.ts';

const missing = [];
const requireValue = (condition, message) => { if (!condition) missing.push(message); };
requireValue(site.legal.publicationReady === true, 'Privacy and terms must receive owner/legal review before publication.');
requireValue(typeof site.legal.effectiveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(site.legal.effectiveDate) && Number.isFinite(Date.parse(site.legal.effectiveDate)), 'Set an approved legal effectiveDate (YYYY-MM-DD).');
requireValue(site.legal.decisionsReviewed === true, 'Confirm that owner identity, monitored contact, jurisdiction, providers, retention, deletion, logging, backups, and legal provisions are resolved; set legal.decisionsReviewed only after review.');
for (const field of ['operatorName', 'contact', 'jurisdiction']) requireValue(typeof site.legal[field] === 'string' && site.legal[field].trim().length > 0, `Confirm legal.${field}.`);
requireValue(site.legal.retentionReviewed === true && site.legal.providersReviewed === true, 'Confirm and document actual providers and separate retention/deletion schedules.');
if (site.legal.ownerDecisions && typeof site.legal.ownerDecisions === 'object') {
  for (const [decision, confirmed] of Object.entries(site.legal.ownerDecisions)) requireValue(confirmed === true || typeof confirmed === 'string' && confirmed.trim().length > 0, `Unresolved legal owner decision: ${decision}`);
}
for (const [name, value] of Object.entries(site.links)) {
  if (value !== null) { try { safeExternalUrl(value); } catch { missing.push(`Unsafe external destination: ${name}`); } }
}
if (site.account.available) requireValue(site.account.authorizationUploadVerified === true && site.account.reviewApproved === true && typeof site.account.liveOrigin === 'string', 'Hosted account availability requires a deployed HTTPS origin, real consent/upload testing, and completed Roblox review.');
if (site.donations.donationsEnabled) {
  requireValue(site.donations.verified && !!site.donations.donationProvider, 'Donation destination/provider must be verified and reflected in privacy information.');
  try { safeExternalUrl(site.donations.donationUrl); } catch { missing.push('Donation URL must be a public HTTPS destination.'); }
}
if (missing.length) {
  console.error(`Publication is intentionally blocked:\n${missing.map(item => `- ${item}`).join('\n')}\nThe local preview and static build remain available for review. Do not change readiness flags merely to bypass this gate.`);
  process.exit(1);
}
console.log('Publication configuration passed. Deploy only the verified website/dist output.');
