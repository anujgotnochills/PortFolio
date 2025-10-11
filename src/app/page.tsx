import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Portfolio } from "@/components/landing/Portfolio";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
