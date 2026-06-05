'use client';

import { useEffect, useRef } from 'react';
import { Video, Scissors, Sparkles, Zap, Film, Palette } from "lucide-react";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const skills = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Adobe Premiere Pro, Final Cut Pro, DaVinci Resolve"
    },
    {
      icon: Film,
      title: "Motion Graphics",
      description: "After Effects, Cinema 4D, Blender"
    },
    {
      icon: Palette,
      title: "Color Grading",
      description: "Professional color correction and cinematic looks"
    },
    {
      icon: Scissors,
      title: "Sound Design",
      description: "Audio mixing, sound effects, and music synchronization"
    },
    {
      icon: Sparkles,
      title: "VFX & Compositing",
      description: "Visual effects and advanced compositing techniques"
    },
    {
      icon: Zap,
      title: "Fast Delivery",
      description: "Quick turnaround without compromising quality"
    }
  ];

  useEffect(() => {
    Promise.all([
      import('gsap'),
      import('gsap/ScrollTrigger')
    ]).then(([{ gsap }, { ScrollTrigger }]) => {
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Staggered card entrance with clean hand-off to CSS
        gsap.from(cardsRef.current?.children || [], {
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            // clearProps allows CSS hover effects to take over without conflict
            gsap.set(cardsRef.current?.children || [], { clearProps: "all" });
          }
        });
      }, sectionRef);

      return () => ctx.revert();
    });
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="relative py-6 sm:py-8 bg-background scroll-mt-20 md:scroll-mt-24">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
      <div className="container px-6 sm:px-8">
        <div className="text-center mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">My Skills</h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Expertise across the full video production pipeline
          </p>
        </div>

        <div ref={cardsRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-6xl mx-auto">
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <div
                key={index}
                className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 hover:border-primary transition-colors duration-300 group hover:scale-105 hover:shadow-xl hover:shadow-primary/20 will-animate"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px',
                }}
              >
                <div className="mb-3 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                  <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-primary" />
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{skill.title}</h3>
                <p className="text-sm sm:text-base text-muted-foreground">{skill.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
