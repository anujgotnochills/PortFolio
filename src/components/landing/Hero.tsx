import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center pt-20 pb-8">
      <div className="container px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4 sm:space-y-6">
            {/* Heading with Glass Effectdsdsd */}
            <div className="space-y-2 sm:space-y-3 backdrop-blur-xl bg-card/30 border border-border/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl text-center">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Hey, I'm</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary drop-shadow-[0_0_25px_rgba(190,242,100,0.5)]">Anuj</span>
                <br />
                <span className="text-foreground">Video Editor</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-foreground italic max-w-xl mx-auto">
                Turning raw clips into captivating stories.
              </p>
            </div>

            {/* Profile Image */}
            <div className="relative">
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto aspect-square">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl"></div>
                <img
                  src="/profile-image.jpg"
                  alt="Anuj - Video Editor"
                  className="relative w-full h-full object-cover rounded-full border-4 border-primary/50 shadow-2xl"
                />
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto">
              <div className="space-y-1 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-2 sm:p-3 md:p-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">1+</h3>
                <p className="text-xs sm:text-sm text-foreground leading-tight">years<br className="sm:hidden" /> experience</p>
              </div>
              <div className="space-y-1 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-2 sm:p-3 md:p-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">60+</h3>
                <p className="text-xs sm:text-sm text-foreground leading-tight">projects<br className="sm:hidden" /> done</p>
              </div>
              <div className="space-y-1 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-2 sm:p-3 md:p-4">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">99%</h3>
                <p className="text-xs sm:text-sm text-foreground leading-tight">satisfaction</p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
              <Link
                href="https://wa.me/8447836894"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-2xl px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg font-bold">
                  CONTACT ME!
                </Button>
              </Link>
              <Link href="#projects">
                <Button variant="ghost" className="text-foreground hover:text-primary text-base sm:text-lg px-4 py-4 sm:px-6 sm:py-5">
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
