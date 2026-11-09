export const siteConfig = {
  url: 'https://anujonedit-portfolio.vercel.app',
  name: 'Anuj - Video Editor Portfolio',
  title: 'Anuj | Video Editor & Motion Graphics Portfolio',
  description:
    'Anuj is an independent video editor with 2+ years of experience. Explore motion graphics, reels, real estate videos, color grading and long-form edits.',
  socialProfiles: [
    'https://instagram.com/anujgotnochills',
    'https://www.youtube.com/@anujgotnochills',
  ],
} as const;

export const homeUrl = `${siteConfig.url}/`;

export const profileStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${homeUrl}#website`,
      url: homeUrl,
      name: siteConfig.name,
      inLanguage: 'en',
      publisher: { '@id': `${homeUrl}#person` },
    },
    {
      '@type': 'ProfilePage',
      '@id': `${homeUrl}#webpage`,
      url: homeUrl,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: 'en',
      isPartOf: { '@id': `${homeUrl}#website` },
      mainEntity: { '@id': `${homeUrl}#person` },
    },
    {
      '@type': 'Person',
      '@id': `${homeUrl}#person`,
      name: 'Anuj',
      url: homeUrl,
      image: `${siteConfig.url}/portrait-suit-cutout.png`,
      jobTitle: 'Video Editor',
      description:
        'Independent video editor and visual storyteller with 2+ years of experience creating content for brands, creators, and businesses.',
      sameAs: siteConfig.socialProfiles,
      knowsAbout: [
        'Video editing',
        'Motion graphics',
        'Color grading',
        'Sound design',
        'Visual effects',
        'Compositing',
      ],
      mainEntityOfPage: { '@id': `${homeUrl}#webpage` },
    },
  ],
};
