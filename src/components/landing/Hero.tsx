import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Star } from "lucide-react";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24">
      <div className="container px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            <div className="flex items-center gap-2">
              <Star className="w-16 h-16 text-primary fill-primary" />
            </div>
            <div className="space-y-4">
              <p className="text-2xl text-muted-foreground">Hey, I'm</p>
              <h1 className="text-6xl md:text-7xl font-bold">
                <span className="text-primary">Anuj</span>
                <br />
                <span className="text-foreground">Video Editor</span>
              </h1>
              <p className="text-xl md:text-2xl text-foreground italic max-w-lg">
                Turning raw clips into captivating stories.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Link
                href="https://www.instagram.com/anujgotnochills/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-8 py-6 text-lg font-bold">
                  CONTACT ME!
                </Button>
              </Link>
              <Link href="#projects">
                <Button variant="ghost" className="text-foreground hover:text-primary text-lg">
                  Browse Projects >>>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right side - Stats */}
          <div className="relative">
            <div className="bg-card rounded-3xl p-12 border border-border">
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">2+</h3>
                  <p className="text-lg text-foreground">years of experience</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">250+</h3>
                  <p className="text-lg text-foreground">projects completed</p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-5xl font-bold text-primary">99%</h3>
                  <p className="text-lg text-foreground">client satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
