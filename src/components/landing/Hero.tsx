import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-24">
      <div className="container px-8">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            {/* Heading with Glass Effect */}
            <div className="space-y-4 backdrop-blur-xl bg-card/30 border border-border/50 rounded-3xl p-6 sm:p-8 md:p-10 shadow-2xl text-center">
              <p className="text-xl sm:text-2xl text-muted-foreground">Hey, I'm</p>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold">
                <span className="text-primary drop-shadow-[0_0_25px_rgba(190,242,100,0.5)]">Anuj</span>
                <br />
                <span className="text-foreground">Video Editor</span>
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl text-foreground italic max-w-2xl mx-auto">
                Turning raw clips into captivating stories.
              </p>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-full max-w-[300px] md:max-w-[400px] mx-auto aspect-square">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <img
                  src="/profile-image.jpg"
                  alt="Anuj - Video Editor"
                  className="relative w-full h-full object-cover rounded-full border-4 border-primary/50 shadow-2xl"
                />
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="space-y-1 sm:space-y-2 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">1+</h3>
                <p className="text-xs sm:text-sm md:text-base text-foreground leading-tight">years<br className="sm:hidden" /> experience</p>
              </div>
              <div className="space-y-1 sm:space-y-2 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">100+</h3>
                <p className="text-xs sm:text-sm md:text-base text-foreground leading-tight">projects<br className="sm:hidden" /> done</p>
              </div>
              <div className="space-y-1 sm:space-y-2 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary">99%</h3>
                <p className="text-xs sm:text-sm md:text-base text-foreground leading-tight">satisfaction</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4 justify-center">
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
        </div>
      </div>
    </section>
  );
}
