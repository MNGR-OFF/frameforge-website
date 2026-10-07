import { site } from './site';

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  links?: { title: string; url: string }[];
}

// Adoption and operating procedures belong in docs/LEGAL-READINESS.md.
// Current scope: the static website, manual plugins, and voluntary support.
const operator = site.legal.operatorName ? `${site.legal.operatorName} (${site.legal.operatorPublicName})` : site.legal.operatorPublicName;

export const privacySections: LegalSection[] = [
  {
    id: 'who', title: 'Who runs FrameForge',
    paragraphs: [
      `FrameForge is independently maintained by ${operator}, based in ${site.legal.jurisdiction}. The maintainer is responsible for personal information received when you contact FrameForge. The platforms described below are responsible for their own processing under their policies.`,
      'This notice covers the product website, the current Figma and Roblox Studio plugins, and voluntary support correspondence. FrameForge is free to use. There are no subscriptions, purchases, or enabled donation payments on this website.',
    ],
  },
  {
    id: 'website', title: 'When you visit the website',
    paragraphs: [
      'The website provides information, installation help, and plugin downloads. It has no website account, design-upload form, payment form, advertising, visitor analytics, or tracking embeds. The interactive example uses sample content and runs in your browser; it does not send your designs to FrameForge.',
      'The website’s own code does not set cookies or save information in browser storage. Fonts and website assets are served with the site rather than loaded from a third-party font service.',
      'GitHub Pages is the selected website host. GitHub receives the network information needed to serve pages and downloads, and states that it logs visitors’ IP addresses for security. Its privacy statement governs those host records; the FrameForge maintainer does not control their retention or deletion. Namecheap is the domain registrar.',
    ],
  },
  {
    id: 'plugins', title: 'Your designs and plugin settings',
    paragraphs: [
      'The Figma plugin reads your selected layers and creates an export inside Figma. The JSON can contain layer names, hierarchy, layout, supported properties, interactions, diagnostics, and image mappings. You decide when to copy or download it and import it into Studio. The current manual workflow does not send those exports or image files to the FrameForge maintainer.',
      'Figma plugin storage remembers export settings, image-to-Roblox asset mappings, and your automatic-upload preference between sessions. Layer behavior is saved as metadata on Figma nodes and can travel with a shared design. The Studio plugin remembers its sizing preference in Studio settings.',
      'When an image is needed, you download it, upload it to Roblox yourself, and map its asset ID. Figma and Roblox process information through their own platforms. Your exported files and uploaded assets remain under your control and those platforms’ rules; deleting a support message does not remove them.',
      'The hosted Roblox account-linking and automatic-upload service is not live. This website does not collect Roblox passwords, OAuth tokens, account connections, or hosted upload histories. A separate notice and data-handling review are required before that service is enabled.',
    ],
  },
  {
    id: 'support-data', title: 'When you contact the creator',
    paragraphs: [
      'If you email or send a Discord message, the maintainer receives your email address or Discord identity, message content, correspondence dates, and attachments you choose to include. A bug report may include your plugin version, export warnings, device information, and a small design example. This information comes from you; FrameForge does not purchase contact lists or collect it from your designs automatically.',
      'Messages are used to answer your question, reproduce a problem, improve a reported feature, or handle a privacy request or complaint. Support is optional. You can use the website and manual plugin workflow without contacting the maintainer. Without enough information, a particular issue may be impossible to diagnose.',
      'Send the smallest example needed, with other people’s personal information and private artwork removed where possible. Never send passwords, tokens, API keys, private connection credentials, identity documents, or payment details in a routine bug report.',
    ],
  },
  {
    id: 'lawful-basis', title: 'Why support information is used',
    paragraphs: [
      'Where the EU or UK GDPR applies, ordinary support correspondence is processed on the basis of legitimate interests: answering a message you initiated and maintaining a useful, reliable tool. Only information reasonably needed for that purpose should be used, with particular care for younger users and private designs. You can object as explained below.',
      'Under Morocco’s Law 09-08, the corresponding support purpose relies on the legitimate-interest provision only where the processing is necessary and respects your interests and fundamental rights. Processing necessary to meet an applicable legal obligation has its separate legal basis. Other uses need an appropriate basis before they start.',
      'Information needed to meet an applicable legal duty, including a valid data-rights request, is processed on the basis of that legal obligation. This does not permit unrelated uses of your correspondence.',
      'FrameForge does not sell personal information, use support messages for advertising, or make automated decisions or profiles that have legal or similarly significant effects on you. Visiting the website is not treated as consent to marketing or unrelated processing.',
    ],
  },
  {
    id: 'recipients', title: 'Who handles information and where',
    paragraphs: [
      'The maintainer receives support messages in Morocco. Google provides the Gmail mailbox, and Discord processes messages sent through Discord. GitHub hosts the website; Figma and Roblox provide their respective plugin environments. Their processing and retention are described in the linked policies. No FrameForge backend host, analytics service, or payment processor is active.',
      'These platforms may process information outside your country, including outside the UK or European Economic Area. Sending a message to the maintainer also involves processing in Morocco. Provider policies describe their own international-processing arrangements; they do not establish a safeguard for every disclosure made by the maintainer.',
      'Support attachments are not published or forwarded to another creator for troubleshooting without checking with you first. Information may be disclosed when required by applicable law. Before a disclosure requiring international-transfer safeguards, the required legal arrangement must be in place. You can ask about recipients, processing locations, and any applicable safeguard using the contact below.',
    ],
  },
  {
    id: 'retention', title: 'How long information is kept',
    paragraphs: [
      'Routine support correspondence is kept while resolving the issue and for up to 12 months after the last substantive reply, so related follow-up questions can be understood. A case with no substantive activity for 90 days is closed rather than retained indefinitely as unresolved. Design examples and attachments are removed from copies controlled by the maintainer within 30 days after resolution or closure. If you ask to continue investigating, only examples still needed for that work are kept.',
      'A minimal record of a privacy request or complaint, its response, and the actions taken is kept for up to 24 months after closure to demonstrate how it was handled. If a specific legal requirement or unresolved dispute requires longer retention, only the necessary information is retained for that purpose and reviewed when the need ends.',
      'These periods apply to copies controlled by the maintainer. The platforms may retain their own records or backups under their policies. The maintainer cannot promise to erase those independent records or your exported files. Plugin preferences and node metadata have no automatic age-based expiry in the current code.',
    ],
  },
  {
    id: 'rights', title: 'Your privacy rights',
    paragraphs: [
      'Depending on the law that applies, you can ask to see personal information held about you, correct it, delete it, or restrict its use. Data portability is available where its legal conditions are met. If processing relies on consent, you can withdraw it without changing the lawfulness of earlier processing.',
      'You have the right to object to processing based on legitimate interests, including ordinary support correspondence. Explain your situation using either contact below. Processing must stop unless the applicable law permits a compelling overriding reason or use needed for legal claims.',
      'Requests are normally free. Where EU or UK GDPR response rules apply, a response is due without undue delay and usually within one month. If an extension is legally permitted, you will be told within the initial month why it is needed and when to expect a response. Where Morocco’s Law 09-08 applies, access is provided without delay and necessary correction, deletion, or blocking of nonconforming data is subject to its ten-clear-day rule. Any shorter applicable deadline takes priority.',
      'Only proportionate information should be requested to verify identity. Do not send an identity document unless it is needed and a suitable method has been agreed.',
    ],
  },
  {
    id: 'complaints', title: 'Requests and complaints',
    paragraphs: [
      `For a privacy request or complaint, email ${site.legal.contact} with “FrameForge privacy” in the subject, or contact ${site.legal.discord} directly on Discord. Say what you want checked and how you would prefer a reply. You do not need a special form. Discord is the creator’s preferred direct contact channel.`,
      'Where the UK data-protection complaints rules apply, a complaint must be acknowledged within 30 days, investigated without undue delay, and followed by an explanation of the outcome and any action taken. This acknowledgement period is separate from the response deadline for a data-rights request.',
      'You can complain to the relevant authority: the ICO in the UK, an EU/EEA supervisory authority such as the one where you live or work, or Morocco’s CNDP where Moroccan law applies. Contacting FrameForge first can help resolve a problem, but is not a condition of contacting an authority or exercising your legal rights.',
    ],
    links: [
      { title: 'Raise a concern with the UK ICO', url: 'https://ico.org.uk/make-a-complaint/' },
      { title: 'Find an EU/EEA data-protection authority', url: 'https://www.edpb.europa.eu/about-edpb/our-members_en' },
      { title: 'Morocco’s data-protection authority: CNDP', url: 'https://www.cndp.ma/' },
    ],
  },
  {
    id: 'younger-users', title: 'Younger users',
    paragraphs: [
      'Follow Figma’s and Roblox’s eligibility and parental-permission rules. If you are under 18, ask a parent or trusted adult before sharing personal information, a private design, or someone else’s details in a support message. FrameForge does not need your date of birth, school, address, or private photographs for an ordinary plugin issue.',
      'In plain language: your design stays in the tools you use unless you choose to send an example to the creator. You can ask what the creator has received and ask for it to be deleted. A parent or guardian can help you. Any consent-based feature directed to children will need the safeguards and parental permission required by applicable law before it is introduced.',
    ],
  },
  {
    id: 'privacy-changes', title: 'Changes to this notice',
    paragraphs: [
      'This notice will be reviewed before enabling hosted account linking, automatic uploading, payments, analytics, or another use of personal information. Material changes will be explained on the website with a new effective date before the new processing starts. Where a change requires consent or another legal step, publishing a notice alone is not enough.',
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: 'free-project', title: 'A free, independent tool',
    paragraphs: [
      `FrameForge is independently maintained by ${operator}, based in ${site.legal.jurisdiction}. It is provided free of charge: no purchase or subscription is required. Donations and paid services are not enabled on this website.`,
      'FrameForge helps convert selected Figma designs into real, editable Roblox UI through a Figma export and Studio import. The website provides information, installation help, downloads, and illustrative examples. It does not provide a website account or online conversion service.',
      'These terms explain use of the website and official plugins. They do not impose a non-commercial-use restriction on the Roblox experiences you create. Your content and the third-party materials you use remain subject to their own permissions.',
    ],
  },
  {
    id: 'conversion', title: 'Review and test your conversion',
    paragraphs: [
      'FrameForge is currently an alpha. It supports specific layout properties and interactions; some Figma features need adjustment or an individual image fallback. An unavailable font can become an image rather than editable text. The goal is editable, responsive Roblox UI, but every Figma feature is not guaranteed to convert identically.',
      'Read the export diagnostics, keep your original design, and test the generated objects in Studio and Play mode. Check screen sizes, input devices, interactions, accessibility, and performance before releasing an experience. Each import creates a new GUI rather than synchronising an existing one.',
      'Roblox’s processing, moderation, asset permissions, and platform limits affect whether an image can be used. Website examples illustrate supported concepts rather than guaranteeing identical results for every design.',
    ],
  },
  {
    id: 'your-content', title: 'Your designs stay yours',
    paragraphs: [
      'FrameForge does not take ownership of your designs, exports, or generated UI. You may use the generated UI in personal or commercial projects when you have the necessary rights in its content.',
      'Use designs, images, fonts, and other materials you own or have permission to convert and publish. Respect privacy and any conditions attached to those materials. Conversion does not remove a third party’s licence requirements.',
      'Running an export permits the processing needed for that conversion in the plugin. If you send a support example, the maintainer may use it only to handle that request as described in the privacy notice. This does not give FrameForge permission to sell your design, publish it as a showcase, or use it for marketing.',
    ],
  },
  {
    id: 'installation', title: 'Downloads and manual uploads',
    paragraphs: [
      'Use the FrameForge listings linked by this website on Figma Community and the Roblox Creator Store, or download the published Studio plugin file. Follow the installation guide and avoid running duplicate copies.',
      'In the current workflow, you upload required images to Roblox yourself and enter their asset IDs in FrameForge. Use an account you are permitted to use and follow Roblox’s asset rules. Keep private credentials and design files secure.',
      'Hosted Roblox account linking and automatic uploading are not live. Their privacy information, permissions, and any additional terms must be reviewed and supplied before they become available. No Roblox password or connection is needed to use the website.',
    ],
  },
  {
    id: 'acceptable-use', title: 'Use FrameForge responsibly',
    paragraphs: ['Use the website and plugins in accordance with applicable law and the relevant platform rules.'],
    bullets: [
      'Do not process or publish content that infringes someone else’s rights or unlawfully exposes personal information.',
      'Do not use FrameForge to distribute harmful code, interfere with another person’s access, or bypass platform security, permissions, or moderation.',
      'Do not represent FrameForge or your generated content as officially endorsed by Roblox, Figma, or another rights holder without their permission.',
    ],
  },
  {
    id: 'platforms', title: 'Figma, Roblox, and other platforms',
    paragraphs: [
      site.independence,
      'Figma, Roblox, GitHub, and external destinations operate under their own terms. Changes to their APIs, account permissions, moderation, or availability can affect FrameForge. The maintainer will explain known compatibility changes through the guide or release notes where practical.',
      'Review an external service’s terms and privacy information when you use it.',
    ],
  },
  {
    id: 'support', title: 'Support and stopping use',
    paragraphs: [
      `For a plugin issue, contact ${site.legal.discord} on Discord. Professional inquiries and privacy requests can also be sent to ${site.legal.contact}. Send your version, reproduction steps, and the smallest example you have permission to share, with private information and secrets removed.`,
      'This is an independently maintained project. Routine technical support has no guaranteed response time or service-level agreement. This does not alter an applicable deadline for a privacy request or complaint, or remove legal rights you have.',
      'You can stop using or uninstall the plugins without a FrameForge cancellation fee. Your generated UI, downloaded exports, and Roblox assets are not removed by stopping use. Plugin settings and Figma node metadata may remain in their platform storage; uninstalling does not guarantee their deletion.',
    ],
  },
  {
    id: 'software-brand', title: 'Software and branding',
    paragraphs: [
      'You may use the official plugins for their intended design-conversion purpose free of charge. This permission is separate from ownership of your designs and generated UI.',
      'FrameForge branding and website materials remain subject to their owners’ rights. These terms do not grant permission to redistribute FrameForge source code or plugin packages, or to use its name or logo to imply endorsement. An expressly published software licence or separate permission governs broader rights. Third-party notices apply to the materials they identify.',
    ],
  },
  {
    id: 'legal-rights', title: 'Your legal rights',
    paragraphs: [
      'These terms describe the tool’s capabilities and practical limits. They do not exclude mandatory rights or remedies under applicable law, including EU, UK, or other consumer and data-protection rights that apply to your situation. Free access does not by itself remove those protections.',
      'Nothing in these terms excludes or limits liability where doing so would be unlawful, including liability for fraud, fraudulent misrepresentation, or death or personal injury caused by negligence.',
      'Contact the maintainer if something goes wrong. You remain free to seek advice, contact the relevant authority, or pursue a remedy through a court with jurisdiction under applicable law. These terms do not require arbitration or require you to give up protections that apply where you live.',
    ],
  },
  {
    id: 'terms-changes', title: 'Updates and changes',
    paragraphs: [
      'Updates may address bugs, security, applicable legal requirements, or compatibility with specific Figma and Roblox changes. Material changes to these terms or supported features will be explained on the website or in release notes in advance where practical. Urgent security or legal changes may need to happen sooner; their reason will still be explained.',
      'Updated terms apply from their stated effective date. They do not retrospectively change rights you have already acquired. If you do not want to continue under an update, you can stop using FrameForge without charge. Keep your design and export backups and review release notes before installing a new version.',
      'A future paid offering or donation facility would need clear information and appropriate terms before being enabled.',
    ],
  },
];

export const privacySources = [
  { title: 'GitHub Pages: visitor IP logging', url: 'https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages' },
  { title: 'GitHub Privacy Statement', url: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement' },
  { title: 'Google Privacy Policy (Gmail)', url: 'https://policies.google.com/privacy' },
  { title: 'Discord Privacy Policy', url: 'https://discord.com/privacy' },
  { title: 'Namecheap Privacy Policy', url: 'https://www.namecheap.com/legal/general/privacy-policy/' },
  { title: 'Figma Privacy Policy', url: 'https://www.figma.com/legal/privacy/' },
  { title: 'Roblox Privacy and Cookie Policy', url: 'https://en.help.roblox.com/hc/en-us/articles/115004630823-Roblox-Privacy-and-Cookie-Policy' },
];

export const termsSources = [
  { title: 'Figma Terms of Service', url: 'https://www.figma.com/legal/tos/' },
  { title: 'Roblox Terms of Use', url: 'https://en.help.roblox.com/hc/en-us/articles/115004647846-Roblox-Terms-of-Use' },
];
