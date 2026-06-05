'use client';

import { ReactNode, useEffect, useRef } from 'react';

/**
 * Lenis Smooth Scroll Provider
 * Wraps the application with smooth scrolling functionality
 * Integrates with GSAP ScrollTrigger for synchronized animations
 */

interface LenisProviderProps {
    children: ReactNode;
}

export function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        // Dynamically import Lenis and GSAP to avoid SSR issues
        Promise.all([
            import('lenis'),
            import('gsap'),
            import('gsap/ScrollTrigger')
        ]).then(([{ default: Lenis }, { gsap }, { ScrollTrigger }]) => {
            // Register ScrollTrigger plugin
            gsap.registerPlugin(ScrollTrigger);

            // Initialize Lenis
            const lenis = new Lenis({
                duration: 1.2,
                easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                orientation: 'vertical' as const,
                gestureOrientation: 'vertical' as const,
                smoothWheel: true,
                wheelMultiplier: 1,
                smoothTouch: false, // Disable on touch for better mobile performance
                touchMultiplier: 2,
                infinite: false,
            } as any);

            lenisRef.current = lenis;

            // RAF loop for Lenis
            function raf(time: number) {
                lenis.raf(time);
                requestAnimationFrame(raf);
            }

            requestAnimationFrame(raf);

            // Integrate with GSAP ScrollTrigger
            lenis.on('scroll', ScrollTrigger.update);

            gsap.ticker.add((time) => {
                lenis.raf(time * 1000);
            });

            gsap.ticker.lagSmoothing(0);

            // Cleanup
            return () => {
                lenis.destroy();
                gsap.ticker.remove((time) => {
                    lenis.raf(time * 1000);
                });
            };
        });
    }, []);

    return <>{children}</>;
}

/**
 * Hook to access Lenis instance
 * Use this to programmatically scroll to elements
 */
export function useLenis() {
    const scrollTo = (target: string | number, options?: any) => {
        if (typeof window === 'undefined') return;

        // Dispatch custom event that the Lenis instance will listen to
        const event = new CustomEvent('lenis-scroll-to', {
            detail: { target, options },
        });
        window.dispatchEvent(event);
    };

    return { scrollTo };
}
