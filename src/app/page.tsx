import type { Metadata } from 'next';
import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { LogoLoop } from '@/components/landing/LogoLoop';
import { About } from '@/components/landing/About';
import { Skills } from '@/components/landing/Skills';
import { Projects } from '@/components/landing/Projects';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/landing/Footer';
import { FloatingContact } from '@/components/ui/FloatingContact';
import { homeUrl, profileStructuredData, siteConfig } from '@/lib/seo';

export const metadata: Metadata = {
  alternates: { canonical: homeUrl },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: siteConfig.name,
    title: siteConfig.title,
    description: siteConfig.description,
    url: homeUrl,
  },
};

export default function Home() {
  return <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(profileStructuredData).replace(/</g, '\\u003c') }}
    />
    <a className="skip-link" href="#projects">Skip to work</a>
    <div className="portfolio-paper"><Header /><main><Hero /><LogoLoop /><Projects /><Skills /><About /><Testimonials /></main><Footer /></div>
    <FloatingContact />
  </>;
}
