import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { About } from "@/components/landing/About";
import { Skills } from "@/components/landing/Skills";
import { Projects } from "@/components/landing/Projects";
import { Testimonials } from "@/components/landing/Testimonials";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
