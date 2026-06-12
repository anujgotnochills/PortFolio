'use client';

import { useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Dynamically import GSAP to avoid SSR issues
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Heading animation - fade in and slide up
        gsap.from(headingRef.current, {
          opacity: 0,
          y: 50,
          duration: 1,
          ease: 'power3.out',
          immediateRender: false,
          onComplete: () => { gsap.set(headingRef.current, { clearProps: 'all' }); },
        });

        // Profile image - scale in with rotation
        gsap.from(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          rotation: -10,
          duration: 1.2,
          ease: 'back.out(1.7)',
          delay: 0.3,
          immediateRender: false,
          onComplete: () => { gsap.set(imageRef.current, { clearProps: 'all' }); },
        });

        // Stats cards - staggered entrance
        gsap.from(statsRef.current?.children || [], {
          opacity: 0,
          y: 30,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          delay: 0.6,
          immediateRender: false,
          onComplete: () => { gsap.set(statsRef.current?.children || [], { clearProps: 'all' }); },
        });

        // Buttons - fade in
        gsap.from(buttonsRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: 'power2.out',
          delay: 1,
          immediateRender: false,
          onComplete: () => { gsap.set(buttonsRef.current, { clearProps: 'all' }); },
        });
      }, heroRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={heroRef} id="home" className="relative pt-24 sm:pt-28 pb-10 sm:pb-12">
      <div className="container px-6 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-3 sm:space-y-5">
            {/* Heading with Glass Effect */}
            <div
              ref={headingRef}
              className="space-y-2 sm:space-y-3 backdrop-blur-xl bg-card/30 border border-border/50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl text-center will-animate"
            >
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground">Hey, I'm</p>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="text-primary drop-shadow-[0_0_25px_rgba(168,85,247,0.5)] animate-pulse">Anuj</span>
                <br />
                <span className="text-foreground">Video Editor</span>
              </h1>
              <p className="text-sm sm:text-base md:text-lg text-foreground italic max-w-xl mx-auto">
                Turning raw clips into captivating stories.
              </p>
            </div>

            {/* Profile Image */}
            <div ref={imageRef} className="relative will-animate">
              <div className="relative w-full max-w-[200px] sm:max-w-[250px] md:max-w-[300px] mx-auto aspect-square">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <img
                  src="/profile-image.jpg"
                  alt="Anuj - Video Editor"
                  className="relative w-full h-full object-cover rounded-full border-4 border-primary/50 shadow-2xl hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Stats */}
            <div ref={statsRef} className="grid grid-cols-3 gap-2 sm:gap-3 md:gap-4 max-w-2xl mx-auto">
              <div className="space-y-1 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-2 sm:p-3 md:p-4 hover:border-primary hover:scale-105 transition-all duration-300 will-animate">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">2+</h3>
                <p className="text-xs sm:text-sm text-foreground leading-tight">years<br className="sm:hidden" /> experience</p>
              </div>
              <div className="space-y-1 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-2 sm:p-3 md:p-4 hover:border-primary hover:scale-105 transition-all duration-300 will-animate">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">60+</h3>
                <p className="text-xs sm:text-sm text-foreground leading-tight">projects<br className="sm:hidden" /> done</p>
              </div>
              <div className="space-y-1 text-center backdrop-blur-xl bg-card/30 border border-border/50 rounded-xl p-2 sm:p-3 md:p-4 hover:border-primary hover:scale-105 transition-all duration-300 will-animate">
                <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary">99%</h3>
                <p className="text-xs sm:text-sm text-foreground leading-tight">satisfaction</p>
              </div>
            </div>

            {/* Buttons */}
            <div ref={buttonsRef} className="flex flex-wrap gap-3 sm:gap-4 justify-center will-animate">
              <Link
                href="https://wa.me/8447836894"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-110 transition-all rounded-2xl px-6 py-4 sm:px-8 sm:py-5 text-base sm:text-lg font-bold shadow-lg hover:shadow-primary/50">
                  CONTACT ME!
                </Button>
              </Link>
              <Link href="#projects">
                <Button variant="ghost" className="text-foreground hover:bg-primary/20 hover:text-primary hover:scale-110 transition-all rounded-2xl text-base sm:text-lg px-4 py-4 sm:px-6 sm:py-5">
                  Browse Projects {"»»»"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
