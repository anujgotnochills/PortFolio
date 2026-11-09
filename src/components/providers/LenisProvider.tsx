'use client';

import { type ReactNode, useEffect } from 'react';
import type Lenis from 'lenis';
import type { ScrollToOptions } from 'lenis';

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let instance: Lenis | undefined;

    const updateMotion = () => {
      if (motionPreference.matches) instance?.destroy();
      else if (!disposed) {
        import('lenis').then(({ default: Lenis }) => {
          if (disposed || motionPreference.matches) return;
          instance?.destroy();
          instance = new Lenis({ autoRaf: true, duration: 1, anchors: { offset: -24 }, smoothWheel: true });
        });
      }
    };
    const scrollTo = (event: Event) => {
      const { target, options } = (event as CustomEvent<{ target: string | number; options?: ScrollToOptions }>).detail;
      instance?.scrollTo(target, options);
    };
    updateMotion();
    motionPreference.addEventListener('change', updateMotion);
    window.addEventListener('lenis-scroll-to', scrollTo);
    return () => {
      disposed = true;
      instance?.destroy();
      motionPreference.removeEventListener('change', updateMotion);
      window.removeEventListener('lenis-scroll-to', scrollTo);
    };
  }, []);
  return <>{children}</>;
}

export function useLenis() {
  return { scrollTo(target: string | number, options?: ScrollToOptions) {
    window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { target, options } }));
  } };
}
