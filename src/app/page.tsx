import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Skills } from "@/components/landing/Skills";
import { Projects } from "@/components/landing/Projects";
import { Testimonials } from "@/components/landing/Testimonials";
import { Footer } from "@/components/landing/Footer";
import { FloatingContact } from "@/components/ui/FloatingContact";
import { ScrollToTop } from "@/components/ui/ScrollToTop";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Testimonials />
      </main>
      <Footer />
      <FloatingContact />
      <ScrollToTop />
    </div>
  );
}
