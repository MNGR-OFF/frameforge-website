import { site, safeExternalUrl } from '../src/data/site.ts';

const missing = [];
const requireValue = (condition, message) => { if (!condition) missing.push(message); };
for (const field of ['operatorName', 'contact', 'jurisdiction']) requireValue(typeof site.legal[field] === 'string' && site.legal[field].trim().length > 0, `Confirm legal.${field}.`);
const policiesAdopted = site.legal.publicationReady === true;
if (policiesAdopted) {
  const effectiveDate = site.legal.effectiveDate;
  const dateTime = typeof effectiveDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(effectiveDate) ? Date.parse(effectiveDate) : NaN;
  requireValue(Number.isFinite(dateTime) && new Date(dateTime).toISOString().slice(0, 10) === effectiveDate, 'Set an approved, valid legal effectiveDate (YYYY-MM-DD).');
  requireValue(site.legal.decisionsReviewed === true, 'Adopt the policies before presenting them as effective.');
  requireValue(site.legal.contactMonitored === true && site.legal.responseProcedureReady === true, 'Confirm monitored contacts and the rights/complaints procedure before adopting the policies.');
  requireValue(site.legal.retentionReviewed === true && site.legal.providersReviewed === true && site.legal.legalScopeReviewed === true, 'Complete the recorded retention/provider/legal-scope review before presenting the policies as adopted.');
  if (site.legal.ownerDecisions && typeof site.legal.ownerDecisions === 'object') {
    for (const [decision, confirmed] of Object.entries(site.legal.ownerDecisions)) requireValue(confirmed === true || typeof confirmed === 'string' && confirmed.trim().length > 0, `Unresolved legal owner decision: ${decision}`);
  }
} else {
  requireValue(site.legal.status === 'Review draft' && site.legal.effectiveDate === null, 'Unadopted policies must retain draft status without an effective date.');
}
for (const [name, value] of Object.entries(site.links)) {
  if (value !== null) { try { safeExternalUrl(value); } catch { missing.push(`Unsafe external destination: ${name}`); } }
}
if (site.account.available) {
  requireValue(policiesAdopted, 'Hosted account linking requires adopted policies describing its actual processing.');
  requireValue(site.account.authorizationUploadVerified === true && site.account.reviewApproved === true && typeof site.account.liveOrigin === 'string', 'Hosted account availability requires a deployed HTTPS origin, real consent/upload testing, and completed Roblox review.');
  requireValue(site.account.dataHandlingReviewed === true && site.account.privacyPolicyMatches === true, 'Before hosted linking, publish matching notices and implement separate token/upload-history/log/backup retention, deletion, provider, and transfer arrangements.');
}
if (site.donations.donationsEnabled) {
  requireValue(policiesAdopted, 'Enabling donations requires adopted notices describing the chosen provider.');
  requireValue(site.donations.verified && !!site.donations.donationProvider, 'Donation destination/provider must be verified and reflected in privacy information.');
  try { safeExternalUrl(site.donations.donationUrl); } catch { missing.push('Donation URL must be a public HTTPS destination.'); }
}
if (missing.length) {
  console.error(`Publication configuration failed:\n${missing.map(item => `- ${item}`).join('\n')}\nDo not label unadopted policies as effective or enable unreviewed hosted/payment features.`);
  process.exit(1);
}
console.log(`Publication configuration passed${policiesAdopted ? '' : ' for the static website with clearly labelled policy drafts'}. Deploy only the verified website/dist output.`);
if (!policiesAdopted) console.warn('Policy adoption and the operating reviews in docs/LEGAL-READINESS.md remain separate tasks; this configuration check is not a compliance certification.');
