export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

/** Factual drafts. Publication readiness and effective dates belong in site configuration. */
export const legalOwnerDecisions = [
  'Confirm the legal operator name, location, and any required business or representative details. Discord @mngr06 is a supplied creator identity, not a confirmed legal identity.',
  'Choose and verify a monitored privacy and support contact, a request-verification process, and response procedures. Discord availability has not been confirmed.',
  'Confirm the actual website, DNS, proxy, backend hosting, monitoring, and backup providers, processing locations, administrator access, and international-transfer arrangements.',
  'Set and implement separate retention schedules for account connections, upload records, rate-limit records, access/security logs, support messages, and backups. Upload records currently have no automatic age-based deletion.',
  'Implement an authenticated procedure for deleting account-associated upload records and handling backups. Disconnect currently removes the connection record but retains upload history.',
  'Review applicable privacy law, lawful bases, age/parental requirements, user rights, and required notices for the intended audience and jurisdiction.',
  'Approve product terms, any software license, warranty and liability provisions, governing law, dispute procedures, and any required consumer protections with appropriate legal advice.',
  'Confirm any future donation provider, verified destination, provider disclosures, transaction-data access, and retention before enabling support links.',
  'Approve the final privacy policy and terms, set their effective dates and change-notice process, verify the live service behavior, and then change the centralized legal status from draft.',
] as const;

export const privacySections: LegalSection[] = [
  {
    id: 'scope', title: 'Scope and draft status',
    paragraphs: [
      'This draft explains the inspected FrameForge implementation: its static website, Figma plugin, optional OAuth/upload service, and transfers to Roblox. Hosted account linking is prepared in source code; deployment and public availability have not been verified. The owner decisions below must be resolved before this becomes an effective policy.',
      'The creator’s supplied contact identity is Discord @mngr06. A legal operator identity and monitored privacy contact have not been confirmed. This draft has no effective date.',
    ],
  },
  {
    id: 'website', title: 'Public website',
    paragraphs: [
      'The website provides product information and documentation. It does not receive Figma files, perform imports, provide a website account login, or collect payment details. The browser demonstration processes its example controls in your browser.',
      'No third-party analytics, advertising, tracking embeds, or payment SDK are included by default. The site’s own code does not set tracking cookies or save Roblox authorization credentials in browser storage.',
      'The website is prepared for GitHub Pages. When a GitHub Pages site is visited, GitHub logs visitors’ IP addresses for security purposes. GitHub’s privacy statement describes its processing. Actual deployment and any additional DNS, proxy, or hosting-provider processing must be confirmed before publication.',
    ],
  },
  {
    id: 'figma-storage', title: 'Figma plugin and local preferences',
    paragraphs: [
      'FrameForge reads your selected layers to create the export and previews inside Figma. Exported JSON contains the design hierarchy, supported visual properties, configured interactions, diagnostics, and image mappings. You choose when to copy, download, or import it.',
      'The plugin uses Figma client storage to remember export settings, image-to-Roblox asset mappings, and the automatic-upload preference. When linking is available and succeeds, it stores the configured service origin, an opaque FrameForge connection credential, and its expiry in private plugin client storage. Roblox access and refresh tokens are not stored there or included in exported JSON.',
      'Configured layer behavior is saved as plugin metadata on the affected Figma nodes and can travel with the design. That metadata is distinct from private account storage. Figma operates its own platform and storage under its own privacy policy.',
    ],
  },
  {
    id: 'account', title: 'Optional Roblox authorization',
    paragraphs: [
      'When the separate account service is available, you initiate linking inside Figma and review Roblox’s consent screen. FrameForge does not request your Roblox password. The implemented scopes are openid, profile, asset:read, and asset:write: they identify the authorized account, display its name, create requested image assets, and check upload operations.',
      'The service obtains your Roblox user ID and a username or profile name, access and refresh tokens, token expiry, and authorization/session state. The saved OAuth snapshot, including identity and tokens, is encrypted on the server. Connection identifiers, their hashes, status, and deadlines also support binding the browser consent flow to the initiating plugin session.',
      'These records support your requested connection and uploads, token refresh, access control, and safe retries. The implemented authorization flow uses PKCE, state checks, and browser binding. Encryption reduces exposure but does not make stored information anonymous or guarantee security.',
    ],
  },
  {
    id: 'uploads', title: 'Exported images and upload records',
    paragraphs: [
      'If you request an image upload, the plugin sends its asset identifier, name, image type, and encoded PNG or JPEG bytes to the account service. The service validates the request, calculates an image hash, and sends the image and asset name to Roblox under the linked personal account. Native editable UI conversion remains inside the plugin.',
      'The inspected application passes image bytes through memory and does not write uploaded image files to its database or disk. This does not establish the logging or backup practices of a future hosting provider.',
      'The service persists records containing the Roblox creator ID, image hash, upload operation ID, creation status, result asset ID, moderation status, and relevant failure metadata. These records allow an interrupted request to resume checking its existing operation and help avoid duplicate uploads. Image hashes are linked to the account and are not treated as anonymous data.',
    ],
  },
  {
    id: 'security-logs', title: 'Security processing and recipients',
    paragraphs: [
      'The backend uses account and network request limits to protect availability. The rate-limit table stores hashed bucket identifiers, counters, and reset times. Network buckets use the connection’s remote address; behind a proxy this may be the proxy address. The implementation does not trust user-supplied forwarded IP addresses.',
      'Requested uploads are disclosed to Roblox. Figma provides the plugin environment and storage. A deployed service’s hosting, ingress, backup, and monitoring providers may process network requests, operational records, and logs. Their identities, locations, log contents, retention, and administrator access remain owner decisions.',
      'The inspected backend has no request-body or token logging routine. Provider logging configuration must nevertheless exclude authorization headers, cookies, OAuth callback query parameters, image bodies, and private connection links. Support messages you choose to send through an external platform are also handled by that platform.',
    ],
  },
  {
    id: 'retention', title: 'Retention is different for each record',
    paragraphs: [
      'Pending connection requests and browser-flow cookies have a ten-minute validity. A successful connection is assigned a 90-day application validity period. Roblox token expiry and refresh rotation are separate from that period.',
      'Expired connections and rate-limit rows are removed by the current pruning routine during new connection creation or rate-table capacity checks. Expiry immediately prevents use of the connection, but it does not promise physical deletion at that exact moment.',
      'Upload records have no automatic age-based retention limit in the current code and are not removed when you disconnect. Hosting logs, support messages, and backups have no confirmed retention schedule. Their deletion rules and any justified legal retention must be set and implemented before hosted public operation.',
    ],
  },
  {
    id: 'choices', title: 'Your choices and disconnection',
    paragraphs: [
      'You can export and map image IDs manually without linking Roblox. You control the automatic-upload preference, can request individual or batch uploads, and can stop a batch after its current image. Existing mapped images are skipped.',
      'Disconnect Roblox clears the plugin’s saved connection and asks the service to invalidate its connection record and revoke Roblox refresh authorization. If the service cannot be reached, local disconnection still happens and the plugin tells you to revoke FrameForge access in Roblox if needed. A failed network request cannot guarantee remote revocation.',
      'Disconnecting does not delete uploaded Roblox assets, existing export files, saved image mappings, or retained upload-operation records. Manage published assets and app authorization through Roblox. A separate verified request procedure for retained FrameForge records is an owner requirement.',
    ],
  },
  {
    id: 'rights', title: 'Privacy requests and younger users',
    paragraphs: [
      'Depending on the law that applies, you may have rights to access, correct, delete, restrict, object to, or receive a portable copy of personal information, and to complain to a relevant authority. These rights can have conditions and exceptions. The operator, applicable law, verification steps, and monitored request contact must be confirmed before this policy takes effect.',
      'Do not send passwords, tokens, or unnecessary private design content in a support request. Follow the eligibility and parental requirements of Figma and Roblox. FrameForge-specific age safeguards and obligations have not yet been determined; this draft does not claim that third-party rules resolve them.',
    ],
  },
  {
    id: 'third-parties', title: 'Roblox, external links, and future support payments',
    paragraphs: [
      'Roblox independently processes, stores, and moderates uploaded assets under its platform policies. Asset visibility and permission settings affect who can access them. FrameForge cannot promise removal from Roblox by removing its own connection records.',
      'External links open the destination service, where that service’s privacy practices apply. Donations are disabled by default. If a verified external support provider is selected later, the policy must identify that provider, explain any transaction information received by the owner, and describe the relevant retention. This website does not collect card details.',
    ],
  },
  {
    id: 'changes', title: 'Changes and publication readiness',
    paragraphs: [
      'The final policy must match the deployed configuration and operating practices, identify an effective date, and describe how material changes will be communicated. Changes to hosting, account linking, logs, support channels, or donations require another data-handling review. The current text remains a review draft until the listed owner decisions are resolved.',
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: 'terms-status', title: 'Status and product scope',
    paragraphs: [
      'These are proposed terms for owner and legal review, with no effective date or confirmed legal contracting party. They are not presented as an approved agreement. The supplied creator identity is Discord @mngr06.',
      'FrameForge helps convert selected Figma designs into editable Roblox UI through a Figma export and Roblox Studio import. The static website provides information and illustrative browser examples. Optional hosted account linking requires a separately deployed service and Roblox authorization; its public availability has not been verified.',
    ],
  },
  {
    id: 'limitations', title: 'Conversion and testing',
    paragraphs: [
      'Conversion supports specific design properties and interactions. Some Figma features are approximated, unsupported, or require individual image assets; unavailable fonts can require fallbacks. Review export warnings and test generated objects, responsiveness, input behavior, and performance in Roblox Studio and Play mode before releasing an experience.',
      'Examples demonstrate concepts and are not a guarantee that every design will look or behave identically. Roblox processing, moderation, platform limits, and asset permissions can delay or prevent use of an uploaded image.',
    ],
  },
  {
    id: 'content-rights', title: 'Your designs and permissions',
    paragraphs: [
      'You retain your rights in the content you provide. Use designs, fonts, images, and other materials that you own or are authorized to process and publish. You are responsible for obtaining permissions required by their licenses and by the people whose information appears in them.',
      'When you request an export or upload, you permit the processing, conversion, and transfer needed to carry out that request. Uploading to Roblox also invokes Roblox’s terms for those assets. This proposed processing permission does not transfer ownership of your designs to FrameForge or grant unrelated marketing rights.',
    ],
  },
  {
    id: 'account-terms', title: 'Account linking and uploads',
    paragraphs: [
      'Authorize an account you are permitted to use and review Roblox’s consent screen. The implemented hosted flow uploads to the linked personal Roblox account. Confirm the displayed account before uploading. Keep private connection credentials secure and never share access tokens, client secrets, encryption keys, or pairing codes.',
      'Automatic uploading is a user-controlled preference. Already mapped images are skipped. A pending or uncertain operation may require checking the existing Roblox upload rather than creating a new copy. Do not use a different account or credential to evade permissions, moderation, or limits.',
    ],
  },
  {
    id: 'acceptable-use', title: 'Acceptable use',
    paragraphs: ['Use FrameForge in accordance with applicable law and the rules of the platforms you use.'],
    bullets: [
      'Do not upload unlawful, infringing, deceptive, or harmful content, or expose personal information without an appropriate permission basis.',
      'Do not attempt to access someone else’s connection, interfere with the service, bypass security checks, or evade request limits.',
      'Do not imply that your content or FrameForge is officially endorsed by Roblox, Figma, or another rights holder.',
    ],
  },
  {
    id: 'third-party-terms', title: 'Third-party platforms and independence',
    paragraphs: [
      'FrameForge is an independent tool and is not affiliated with, endorsed by, or sponsored by Roblox or Figma.',
      'Figma, Roblox, GitHub, and any external destination operate their services under their own terms and policies. Their availability, API behavior, account restrictions, moderation, and asset access remain outside FrameForge’s control. Use their names descriptively and comply with any applicable brand rules.',
    ],
  },
  {
    id: 'disconnect-terms', title: 'Disconnection and stored information',
    paragraphs: [
      'You can stop using the plugin and disconnect Roblox in its settings. The plugin removes its saved connection and requests server invalidation and Roblox revocation. When the service is unreachable, revoke FrameForge access through Roblox as needed.',
      'Disconnection does not remove uploaded Roblox assets, your downloaded exports, image mappings, or retained upload-operation records. The privacy draft explains current handling and the retention and deletion procedures that still require owner approval.',
    ],
  },
  {
    id: 'support-changes', title: 'Support and product changes',
    paragraphs: [
      'The supplied creator contact identity is Discord @mngr06; a monitored support channel and response commitments have not been confirmed. When reporting an issue, share the smallest reproducible example and relevant warnings, with secrets and private information removed.',
      'Compatibility and features can change as the product and third-party platforms evolve. Keep a copy of your design and export, review update notes when provided, and retest generated UI. No uptime, support-response, or compatibility service-level agreement has been chosen.',
    ],
  },
  {
    id: 'payments', title: 'Optional project support',
    paragraphs: [
      'External support payments are disabled by default. If the owner later enables a verified external support page, contributions are optional and governed by that provider’s terms. The website will not collect payment details.',
      'No subscription, paid access entitlement, commercial software license, refund commitment, charitable status, or tax deductibility is established by this draft. Any future paid offering requires its own approved terms and disclosures.',
    ],
  },
  {
    id: 'ip', title: 'FrameForge branding and other materials',
    paragraphs: [
      'User-content rights, FrameForge branding, software licensing, and third-party asset licenses are separate. A copyright footer does not grant a software license or permission to reuse a brand or third-party asset. Consult the asset register and Credits for the provenance of website materials.',
      'No new open-source or commercial license is granted by these website terms. Redistribution rights for source code or plugins must follow an expressly approved license or permission.',
    ],
  },
  {
    id: 'legal-review', title: 'Warranties, liability, disputes, and changes',
    paragraphs: [
      'Warranty language, liability limits, consumer protections, governing law, dispute procedures, eligibility requirements, the operator identity, and notice methods remain owner and legal decisions. This draft does not invent a liability cap, jurisdiction, arbitration requirement, or waiver of mandatory rights.',
      'Before adopting terms, the owner must approve those provisions, confirm that the product behavior and contact details are accurate, and set an effective date and a process for communicating material changes. The listed owner decisions remain visible while these documents are drafts.',
    ],
  },
];

export const legalSources = [
  { title: 'GitHub Pages data collection', url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages' },
  { title: 'GitHub Privacy Statement', url: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' },
  { title: 'Figma Privacy Policy', url: 'https://www.figma.com/legal/privacy/' },
  { title: 'Roblox Privacy and Cookie Policy', url: 'https://en.help.roblox.com/hc/en-us/articles/115004630823-Roblox-Privacy-and-Cookie-Policy' },
  { title: 'ICO guide to individual rights', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/individual-rights/individual-rights/' },
] as const;
