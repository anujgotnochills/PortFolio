import { Header } from '@/components/landing/Header';
import { Hero } from '@/components/landing/Hero';
import { LogoLoop } from '@/components/landing/LogoLoop';
import { About } from '@/components/landing/About';
import { Skills } from '@/components/landing/Skills';
import { Projects } from '@/components/landing/Projects';
import { Testimonials } from '@/components/landing/Testimonials';
import { Footer } from '@/components/landing/Footer';
import { FloatingContact } from '@/components/ui/FloatingContact';

export default function Home() {
  return <>
    <a className="skip-link" href="#projects">Skip to work</a>
    <div className="portfolio-paper"><Header /><main><Hero /><LogoLoop /><Projects /><Skills /><About /><Testimonials /></main><Footer /></div>
    <FloatingContact />
  </>;
}
