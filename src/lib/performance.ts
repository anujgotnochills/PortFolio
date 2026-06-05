/**
 * Performance utilities for detecting device capabilities
 * and implementing progressive enhancement
 */

export interface DeviceCapabilities {
    tier: 'high' | 'medium' | 'low';
    hasWebGL: boolean;
    hasWebGL2: boolean;
    maxTextureSize: number;
    supportsPerformanceAPI: boolean;
    deviceMemory?: number;
    hardwareConcurrency: number;
}

/**
 * Detect device GPU tier and capabilities
 */
export function detectDeviceCapabilities(): DeviceCapabilities {
    if (typeof window === 'undefined') {
        return {
            tier: 'medium',
            hasWebGL: false,
            hasWebGL2: false,
            maxTextureSize: 0,
            supportsPerformanceAPI: false,
            hardwareConcurrency: 4,
        };
    }

    // Check WebGL support
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    const gl2 = canvas.getContext('webgl2');

    const hasWebGL = !!gl;
    const hasWebGL2 = !!gl2;

    let maxTextureSize = 0;
    if (gl) {
        maxTextureSize = (gl as WebGLRenderingContext).getParameter((gl as WebGLRenderingContext).MAX_TEXTURE_SIZE);
    }

    // Check device memory and hardware concurrency
    const deviceMemory = (navigator as any).deviceMemory;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    // Check performance API
    const supportsPerformanceAPI = 'performance' in window && 'memory' in performance;

    // Determine tier
    let tier: 'high' | 'medium' | 'low' = 'medium';

    if (hasWebGL2 && hardwareConcurrency >= 8 && (!deviceMemory || deviceMemory >= 8)) {
        tier = 'high';
    } else if (!hasWebGL || hardwareConcurrency < 4 || (deviceMemory && deviceMemory < 4)) {
        tier = 'low';
    }

    return {
        tier,
        hasWebGL,
        hasWebGL2,
        maxTextureSize,
        supportsPerformanceAPI,
        deviceMemory,
        hardwareConcurrency,
    };
}

/**
 * Check if device can handle heavy 3D animations
 */
export function canHandle3D(): boolean {
    const capabilities = detectDeviceCapabilities();
    return capabilities.hasWebGL && capabilities.tier !== 'low';
}

/**
 * Get recommended particle count based on device tier
 */
export function getRecommendedParticleCount(): number {
    const capabilities = detectDeviceCapabilities();

    switch (capabilities.tier) {
        case 'high':
            return 1000;
        case 'medium':
            return 500;
        case 'low':
            return 200;
        default:
            return 500;
    }
}

/**
 * Debounce function for performance optimization
 */
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function executedFunction(...args: Parameters<T>) {
        const later = () => {
            timeout = null;
            func(...args);
        };

        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function for scroll/resize events
 */
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let inThrottle: boolean;

    return function executedFunction(...args: Parameters<T>) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

/**
 * Request animation frame with fallback
 */
export const raf = (callback: FrameRequestCallback): number => {
    if (typeof window === 'undefined') {
        return 0;
    }
    return window.requestAnimationFrame(callback);
};

/**
 * Cancel animation frame with fallback
 */
export const caf = (handle: number): void => {
    if (typeof window === 'undefined') {
        return;
    }
    window.cancelAnimationFrame(handle);
};
