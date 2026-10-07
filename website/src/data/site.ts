export const site = {
  name: 'FrameForge',
  tagline: 'Design in Figma. Forge it into Roblox.',
  description: 'Turn Figma frames, layouts, and interactions into real, editable Roblox UI. Keep building in Studio with FrameForge.',
  version: '0.1.7',
  releaseStage: 'Alpha',
  creator: 'Discord: @mngr06',
  independence: 'FrameForge is an independent tool and is not affiliated with, endorsed by, or sponsored by Roblox or Figma.',
  account: { available: false, status: 'Hosted linking is not live', proposedOrigin: 'https://api.frameforgeui.website' },
  legal: {
    publicationReady: false, status: 'Review draft', reviewedOn: 'October 5, 2026', effectiveDate: null,
    decisionsReviewed: false, operatorName: 'MNGR', operatorPublicName: '@mngr06',
    contact: 'grnour06@gmail.com', discord: '@mngr06', jurisdiction: 'Morocco',
    contactMonitored: true, responseProcedureReady: false,
    retentionReviewed: true, providersReviewed: false, legalScopeReviewed: false
  },
  links: {
    figmaPlugin: 'https://www.figma.com/community/plugin/1688245182223969540' as string | null,
    robloxPlugin: 'https://create.roblox.com/store/asset/90693215219484/FrameForge' as string | null,
    figmaCommunity: 'https://www.figma.com/community',
    robloxCreatorStore: 'https://create.roblox.com/store/plugins',
    robloxAssetsGuide: 'https://create.roblox.com/docs/art/creator-store',
    githubPagesPrivacy: 'https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement',
    uiResources: 'https://ui-resources.com/'
  },
  downloads: {
    studio: {
      enabled: true,
      path: 'downloads/FrameForge-0.1.7.rbxmx',
      fileName: 'FrameForge-0.1.7.rbxmx',
      version: '0.1.7',
      bytes: 358399,
      sha256: '53f3ac43f29868c2006fdace12a9f4b237b84fcdb1980b1aa8833fd2aeb20347',
      verified: true
    }
  },
  donations: {
    donationsEnabled: false,
    donationUrl: '',
    donationProvider: '',
    donationLabel: 'Support the forge',
    verified: false
  }
} as const;

export function safeExternalUrl(value: string): string {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.port || /^(localhost|127\.|\[|0\.0\.0\.0)/i.test(url.hostname)) {
    throw new Error('External links must use a public HTTPS destination without credentials.');
  }
  return url.href;
}

export function localUrl(path = ''): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export const navigation = [
  { label: 'Features', path: '#features', home: true },
  { label: 'Guide', path: 'guide/' },
  { label: 'Account linking', path: 'account/' },
  { label: 'Support', path: 'support/' }
];

export const workflow = [
  { title: 'Install both plugins', text: 'Get FrameForge from Figma Community. For Studio, choose the Roblox Creator Store or the plugin file. The guide walks you through installation.' },
  { title: 'Choose your root frame', text: 'Select the complete interface you want to export. Keep its triggers and target layers inside that root.' },
  { title: 'Make it interactive', text: 'Configure optional behaviors and effects, then save the layer settings. Hover and Loop are explicit choices.' },
  { title: 'Export and review', text: 'Choose Export to Roblox and read the diagnostics. Warnings identify layers that need an image fallback or adjustment.' },
  { title: 'Map your image assets', text: 'Download the collected PNGs, upload them to Roblox, and enter their asset IDs. Hosted automatic uploading is not live yet.' },
  { title: 'Forge it in Studio', text: 'Copy the current JSON, open the Studio plugin, validate the export, and import into StarterGui.' },
  { title: 'Keep building', text: 'Edit the generated objects and test in Play mode. Each import creates a new GUI; it does not sync an existing one.' }
];

export const troubleshooting = [
  { title: 'Export is disabled', text: 'Run the installed plugin inside Figma and select a canvas frame or layer. Close and reopen the plugin if selection is not detected. A browser preview cannot access your canvas or export.' },
  { title: 'Only part of the design appears', text: 'Selecting a button exports that button. Select the complete root frame, including the layers targeted by interactions, and export again.' },
  { title: 'Images are missing in Studio', text: 'In Assets, map every required image key to its Roblox asset ID. Check upload processing, moderation, ownership, and access for the intended experience. Read the import report for missing keys.' },
  { title: 'A font is no longer editable', text: 'An unavailable font family or style becomes an individual text image and produces a warning. Map the image to preserve its appearance, or use a supported Roblox font for editable text, input fields, and live bindings.' },
  { title: 'Changed artwork shows an old image', text: 'Edited text, cropping, filters, and rasterized masks can produce a new image-content key. Download the current PNG, upload a fresh Roblox asset, map the new key, and copy the latest JSON.' },
  { title: 'A hover effect keeps looping', text: 'Choose Mouse hover in the effect trigger, save the layer settings, and export and import again. Earlier exports can retain their previous looping behavior until updated.' },
  { title: 'Stripes escape the mask', text: 'Keep the mask stationary and move the frame inside it. In Figma’s Layers panel, the mask must sit below the layers it clips. An empty-mask warning may offer Fix mask order for one unambiguous frame-and-mask pair; otherwise repair the order manually. Use the parent as hover source when appropriate.' },
  { title: 'Connect Roblox is unavailable', text: 'The hosted account service is prepared but has not been deployed. Continue with manual PNG uploads and asset-ID mapping. A normal user does not need a helper or an API key.' }
];
