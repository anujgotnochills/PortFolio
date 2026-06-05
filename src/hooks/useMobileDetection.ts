import { useEffect, useState } from 'react';

interface MobileDetection {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    isTouchDevice: boolean;
    screenWidth: number;
}

/**
 * Hook to detect mobile devices and screen sizes
 * Useful for conditional rendering and optimization
 */
export function useMobileDetection(): MobileDetection {
    const [detection, setDetection] = useState<MobileDetection>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        isTouchDevice: false,
        screenWidth: typeof window !== 'undefined' ? window.innerWidth : 1920,
    });

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }

        const checkDevice = () => {
            const width = window.innerWidth;
            const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

            const isMobile = width < 768;
            const isTablet = width >= 768 && width < 1024;
            const isDesktop = width >= 1024;

            setDetection({
                isMobile,
                isTablet,
                isDesktop,
                isTouchDevice,
                screenWidth: width,
            });
        };

        // Check on mount
        checkDevice();

        // Listen for resize
        window.addEventListener('resize', checkDevice);

        return () => {
            window.removeEventListener('resize', checkDevice);
        };
    }, []);

    return detection;
}
