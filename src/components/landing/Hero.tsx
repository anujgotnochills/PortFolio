import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container flex items-center justify-center text-center min-h-[calc(100vh-10rem)] py-16">
      <div className="max-w-4xl">
        <h1 className="text-5xl font-bold leading-tight tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
          VIDEO EDITOR & MOTION DESIGNER
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-xl text-muted-foreground">
          I'm a freelance video editor and motion designer based in India, helping businesses and creators to bring their ideas to life.
        </p>
        <div className="mt-12">
          <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 text-lg px-8 py-6">
            <Link href="#work">View My Work</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
