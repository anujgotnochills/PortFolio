'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content reveal animation
      gsap.from(contentRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        immediateRender: false,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          if (contentRef.current?.children) {
            Array.from(contentRef.current.children).forEach(child => {
              gsap.set(child, { clearProps: 'all' });
            });
          }
        }
      });

      // Stats counter animation
      const stats = document.querySelectorAll('.stat-number');
      stats.forEach((stat) => {
        const target = parseInt(stat.getAttribute('data-target') || '0');
        gsap.to(stat, {
          innerText: target,
          duration: 2,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: stat,
            start: 'top 85%',
            toggleActions: 'play none none none',
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="relative py-6 sm:py-8 bg-background scroll-mt-20 md:scroll-mt-24">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
      <div ref={containerRef} className="container px-4 sm:px-6 md:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Content */}
          <div ref={contentRef} className="space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-center">About Me</h2>
              <div className="space-y-4 text-base sm:text-lg text-muted-foreground leading-relaxed text-center sm:text-left">
                <p>
                  I'm a passionate video editor with over 2 years of experience creating
                  engaging content for brands, creators, and businesses.
                </p>
                <p>
                  I specialize in transforming raw footage into compelling stories that
                  captivate audiences. From short-form content for social media to
                  long-form documentaries, I bring creativity and technical expertise
                  to every project.
                </p>
                <p>
                  My approach combines storytelling with cutting-edge editing techniques
                  to deliver videos that not only look great but also achieve your goals.
                </p>
              </div>
            </div>

            {/* Stats — 4-col grid on small and up, 2-col on mobile */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 sm:pt-8 border-t border-border/55">
              {[
                { target: 60, label: 'Projects Completed' },
                { target: 99, label: 'Client Satisfaction', suffix: '%' },
                { target: 1,  label: 'Years Experience', suffix: '+' },
                { target: 50, label: 'Happy Clients', suffix: '+' },
              ].map(({ target, label, suffix }) => (
                <div key={label} className="space-y-1 sm:space-y-2 text-center">
                  <h3 className="text-2xl sm:text-3xl font-bold text-primary">
                    <span className="stat-number" data-target={target}>0</span>
                    {suffix ?? '+'}
                  </h3>
                  <p className="text-xs sm:text-sm text-foreground leading-snug">{label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
