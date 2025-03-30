import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Debounce a function call with a specified delay
 * Useful for expensive operations like search inputs or window resize handlers
 */
export function debounce<T extends (...args: unknown[]) => unknown>(fn: T, ms = 300): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: unknown, ...args: Parameters<T>) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
}

/**
 * Throttle a function call to execute at most once per specified interval
 * Useful for scroll events or other high-frequency events
 */
export function throttle<T extends (...args: unknown[]) => unknown>(fn: T, ms = 100): (...args: Parameters<T>) => void {
    let lastCall = 0;

    return function (this: unknown, ...args: Parameters<T>) {
        const now = Date.now();

        if (now - lastCall >= ms) {
            lastCall = now;
            fn.apply(this, args);
        }
    };
}

/**
 * React hook for debounced values
 * Updates the value after the specified delay
 */
export function useDebouncedValue<T>(value: T, delay = 500): T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

/**
 * Hook for safe mounting/unmounting to avoid memory leaks
 * Returns a function that only executes if the component is still mounted
 */
export function useSafeDispatch<T extends (...args: unknown[]) => unknown>(dispatch: T) {
    const mounted = useRef(false);

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    return useCallback((...args: Parameters<T>) => (mounted.current ? dispatch(...args) : void 0), [dispatch]);
}

/**
 * Measure component render performance
 * Only active in development mode
 */
export function useRenderMetrics(componentName: string) {
    const renderCount = useRef(0);
    const renderTime = useRef(0);
    const renderStart = useRef(0);

    if (process.env.NODE_ENV === 'development') {
        useEffect(() => {
            renderCount.current += 1;
            renderTime.current = performance.now() - renderStart.current;
            console.log(
                `[Render Metrics] ${componentName} rendered ${renderCount.current} times (${renderTime.current.toFixed(2)}ms)`
            );
        });

        renderStart.current = performance.now();
    }
}

/**
 * Lazy load components or resources based on viewport visibility
 */
export function useIntersectionObserver(
    elementRef: React.RefObject<Element>,
    options: IntersectionObserverInit = { threshold: 0 }
): IntersectionObserverEntry | null {
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    useEffect(() => {
        if (!elementRef.current) return;

        const observer = new IntersectionObserver(([entry]) => {
            setEntry(entry);
        }, options);

        observer.observe(elementRef.current);

        return () => observer.disconnect();
    }, [elementRef, options]);

    return entry;
}
