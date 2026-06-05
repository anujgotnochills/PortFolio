'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export function Testimonials() {
  const containerRef = useRef<HTMLElement>(null);
  const titleRef     = useRef<HTMLDivElement>(null);
  const cardsRef     = useRef<HTMLDivElement>(null);

  const testimonials = [
    {
      name: "Mrs Bhuvesh",
      role: "Content Creator",
      content: "It was a good experience to let him make edit of my choice. I got a quick response and well mannered consultation. I got edit of my choice and my preference with any post-edit changes I need. Well recommended",
      screenshot: "/testimonials/client1-chat.png"
    },
    {
      name: "Avinash Kumar",
      role: "Business Owner",
      content: "Anuj is working so efficiently and delevered my video as per my satisfaction I am fully satisfied what I see in anuj that he doesn't know only editing briefly he knows that what to skip in video or what to continue in it that's important for a good editor, that's I liked as it is called professional",
      screenshot: "/testimonials/client2-chat.png"
    }
  ];

  useEffect(() => {
    // Set initial state to prevent flash
    if (titleRef.current) {
      gsap.set(titleRef.current, { opacity: 0, y: 50 });
    }
    if (cardsRef.current?.children) {
      gsap.set(cardsRef.current.children, { opacity: 0, y: 100 });
    }

    const ctx = gsap.context(() => {
      // Title Animation
      gsap.to(titleRef.current, {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          gsap.set(titleRef.current, { clearProps: 'all' });
        }
      });

      // Cards Animation
      gsap.to(cardsRef.current?.children || [], {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
        onComplete: () => {
          if (cardsRef.current?.children) {
            Array.from(cardsRef.current.children).forEach(child => {
              gsap.set(child, { clearProps: 'all' });
            });
          }
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="testimonials" className="relative py-6 sm:py-8 bg-background overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-60 shadow-[0_0_20px_rgba(168,85,247,0.6)]" />
      <div className="container px-4 sm:px-6 md:px-8">

        {/* Heading */}
        <div ref={titleRef} className="text-center mb-8 sm:mb-10 md:mb-12 will-animate">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            What <span className="text-primary">My Clients</span> Have to Say
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Real feedback from satisfied clients
          </p>
        </div>

        {/* Cards — stack on mobile, 2-col on md+ */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-2xl overflow-hidden
                         hover:border-primary transition-all duration-300
                         hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2
                         group will-animate"
            >
              {/* Content */}
              <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-between h-full relative">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="currentColor" className="text-primary">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 16.6569 20.6739 18 19.017 18H16.017C15.4647 18 16.017 18.4477 15.017 19V21L14.017 21ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 16.6569 11.6735 18 10.0166 18H7.0166C6.46432 18 6.0166 18.4477 6.0166 19V21L5.0166 21Z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary mb-3 sm:mb-4">Client Feedback</h3>
                  <p className="text-sm sm:text-base text-foreground leading-relaxed mb-6 italic">
                    "{testimonial.content}"
                  </p>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 pt-4 border-t border-border">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm sm:text-base flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm sm:text-base md:text-lg">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
