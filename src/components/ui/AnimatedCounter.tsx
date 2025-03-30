'use client';

import { useEffect, useState } from 'react';

interface AnimatedCounterProps {
    end: number;
    suffix?: string;
    duration?: number;
    isVisible?: boolean;
    decimals?: number;
}

/**
 * AnimatedCounter component that animates a number counting up from 0 to a target value
 */
export function AnimatedCounter({
    end,
    suffix = '',
    duration = 2000,
    isVisible = true,
    decimals = 0
}: AnimatedCounterProps) {
    const [count, setCount] = useState(0);

    // Run animation when visible prop changes
    useEffect(() => {
        let interval: NodeJS.Timeout | undefined;
        let frame = 0;
        const totalFrames = 60; // ~60fps for smooth animation

        // Only animate when visible
        if (isVisible) {
            // Set initial value
            setCount(0);

            // Calculate intervals
            const timePerFrame = duration / totalFrames;

            // Create and run interval
            interval = setInterval(() => {
                frame++;

                // Calculate progress (0 to 1)
                const progress = Math.min(frame / totalFrames, 1);

                // Use a smooth easing function (ease-out)
                const easedProgress = 1 - (1 - progress) ** 3;

                // Calculate the current count
                const currentCount = end * easedProgress;

                // Update count state
                if (progress >= 1) {
                    // We've reached the end
                    setCount(end);
                    clearInterval(interval);
                } else {
                    // For decimal values, keep specified decimal places
                    if (end % 1 !== 0 || decimals > 0) {
                        setCount(Number.parseFloat(currentCount.toFixed(decimals)));
                    } else {
                        setCount(Math.floor(currentCount));
                    }
                }
            }, timePerFrame);
        } else {
            // Reset count when not visible
            setCount(0);
        }

        // Cleanup interval on unmount or when dependencies change
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        };
    }, [end, duration, isVisible, decimals]);

    // Format the count based on the suffix type
    const formatCount = () => {
        if (count >= 1000 && suffix.includes('K')) {
            // For K suffix values
            const inK = count / 1000;

            // For values like 2.5K+
            if (inK % 1 !== 0 || end % 1000 !== 0) {
                const formatted = inK.toFixed(1).replace(/\.0$/, '');
                return `${formatted}${suffix}`;
            }

            // For whole numbers like 20K+
            return `${Math.round(inK)}${suffix}`;
        }

        // For values with decimal places
        if (end % 1 !== 0 || decimals > 0) {
            return `${count.toFixed(decimals)}${suffix}`;
        }

        // Default for whole numbers
        return `${Math.round(count)}${suffix}`;
    };

    return <span className='inline-block'>{formatCount()}</span>;
}
