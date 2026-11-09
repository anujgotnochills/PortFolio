import type { MetadataRoute } from 'next';
import { homeUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // Section anchors belong to the homepage; add entries when real pages are added.
  // Omit lastModified until a reliable content modification date is available.
  return [{ url: homeUrl }];
}
