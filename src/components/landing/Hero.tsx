import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="container grid items-center justify-center gap-6 pb-8 pt-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-extrabold leading-tight tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-headline">
          Crafting Stories, Frame by Frame.
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
          Welcome to Editorial Edge, a showcase of professional video editing
          across commercial, narrative, and documentary genres. Discover how
          expert storytelling can elevate your vision.
        </p>
      </div>
      <div className="flex justify-center gap-4">
        <Button asChild size="lg">
          <Link href="#portfolio">View My Work</Link>
        </Button>
        <Button asChild size="lg" variant="outline">
          <Link href="#contact">Get In Touch</Link>
        </Button>
      </div>
    </section>
  );
}
