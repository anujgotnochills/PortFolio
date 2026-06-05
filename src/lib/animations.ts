/**
 * GSAP Animation Library
 * Centralized animation configurations and reusable functions
 * Note: GSAP and ScrollTrigger must be installed via npm
 */

// Common easing functions
export const easings = {
    power1: 'power1.out',
    power2: 'power2.out',
    power3: 'power3.out',
    power4: 'power4.out',
    back: 'back.out(1.7)',
    elastic: 'elastic.out(1, 0.5)',
    expo: 'expo.out',
    smooth: 'power2.inOut',
};

// Common durations
export const durations = {
    fast: 0.3,
    normal: 0.6,
    slow: 1,
    slower: 1.5,
};

/**
 * Fade in animation
 */
export const fadeIn = (element: any, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    return gsap.from(element, {
        opacity: 0,
        duration: options.duration || durations.normal,
        ease: options.ease || easings.power2,
        ...options,
    });
};

/**
 * Slide up animation
 */
export const slideUp = (element: any, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    return gsap.from(element, {
        y: options.distance || 60,
        opacity: 0,
        duration: options.duration || durations.normal,
        ease: options.ease || easings.power3,
        ...options,
    });
};

/**
 * Stagger animation
 */
export const staggerAnimation = (elements: any, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    return gsap.from(elements, {
        y: options.y || 30,
        opacity: 0,
        duration: options.duration || durations.normal,
        stagger: options.stagger || 0.1,
        ease: options.ease || easings.power2,
        ...options,
    });
};

/**
 * Scale animation
 */
export const scaleIn = (element: any, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    return gsap.from(element, {
        scale: options.from || 0.8,
        opacity: 0,
        duration: options.duration || durations.normal,
        ease: options.ease || easings.back,
        ...options,
    });
};

/**
 * Parallax effect
 */
export const parallax = (element: any, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap || !(window as any).ScrollTrigger) return;

    const gsap = (window as any).gsap;

    return gsap.to(element, {
        y: options.distance || -100,
        ease: 'none',
        scrollTrigger: {
            trigger: options.trigger || element,
            start: options.start || 'top bottom',
            end: options.end || 'bottom top',
            scrub: options.scrub !== undefined ? options.scrub : true,
            ...options.scrollTrigger,
        },
    });
};

/**
 * Text reveal animation (split text)
 */
export const textReveal = (element: any, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    return gsap.from(element, {
        opacity: 0,
        y: options.y || 20,
        duration: options.duration || durations.normal,
        ease: options.ease || easings.power3,
        stagger: options.stagger || 0.03,
        ...options,
    });
};

/**
 * Scroll trigger animation helper
 */
export const scrollTriggerAnimation = (element: any, animationOptions: any = {}, triggerOptions: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap || !(window as any).ScrollTrigger) return;

    const gsap = (window as any).gsap;

    return gsap.from(element, {
        ...animationOptions,
        scrollTrigger: {
            trigger: triggerOptions.trigger || element,
            start: triggerOptions.start || 'top 80%',
            end: triggerOptions.end,
            toggleActions: triggerOptions.toggleActions || 'play none none none',
            markers: triggerOptions.markers || false,
            scrub: triggerOptions.scrub,
            ...triggerOptions,
        },
    });
};

/**
 * Counter animation (number count up)
 */
export const counterAnimation = (element: any, endValue: number, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;

    const obj = { val: 0 };
    return gsap.to(obj, {
        val: endValue,
        duration: options.duration || 2,
        ease: options.ease || easings.power2,
        onUpdate: () => {
            element.textContent = Math.floor(obj.val) + (options.suffix || '');
        },
        scrollTrigger: options.scrollTrigger,
    });
};

/**
 * 3D rotation on hover/touch
 */
export const tilt3D = (element: HTMLElement, options: any = {}) => {
    if (typeof window === 'undefined' || !(window as any).gsap) return;

    const gsap = (window as any).gsap;
    const maxRotation = options.maxRotation || 15;
    const scale = options.scale || 1.05;

    const handleMove = (e: MouseEvent | TouchEvent) => {
        const rect = element.getBoundingClientRect();
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const y = 'touches' in e ? e.touches[0].clientY : e.clientY;

        const xPercent = (x - rect.left) / rect.width - 0.5;
        const yPercent = (y - rect.top) / rect.height - 0.5;

        gsap.to(element, {
            rotateY: xPercent * maxRotation,
            rotateX: -yPercent * maxRotation,
            scale: scale,
            duration: 0.3,
            ease: easings.power2,
            transformPerspective: 1000,
        });
    };

    const handleLeave = () => {
        gsap.to(element, {
            rotateY: 0,
            rotateX: 0,
            scale: 1,
            duration: 0.5,
            ease: easings.power2,
        });
    };

    element.addEventListener('mousemove', handleMove);
    element.addEventListener('touchmove', handleMove as any);
    element.addEventListener('mouseleave', handleLeave);
    element.addEventListener('touchend', handleLeave);

    return () => {
        element.removeEventListener('mousemove', handleMove);
        element.removeEventListener('touchmove', handleMove as any);
        element.removeEventListener('mouseleave', handleLeave);
        element.removeEventListener('touchend', handleLeave);
    };
};
