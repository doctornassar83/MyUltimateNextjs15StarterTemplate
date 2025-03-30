'use client';

import { useEffect, useRef, useState } from 'react';

import { Benefits, CTA, Features, Footer, Header, Hero, Screenshots, Stats, Testimonials } from '@/components/landing';

export default function HomePage() {
    const [isVisible, setIsVisible] = useState({
        hero: false,
        features: false,
        benefits: false,
        testimonials: false,
        stats: false
    });

    // References for sections to track visibility
    const heroRef = useRef(null);
    const featuresRef = useRef(null);
    const benefitsRef = useRef(null);
    const testimonialsRef = useRef(null);
    const statsRef = useRef(null);

    // Set up intersection observer for animations
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            for (const entry of entries) {
                if (entry.isIntersecting) {
                    if (entry.target === heroRef.current) {
                        setIsVisible((prev) => ({ ...prev, hero: true }));
                    } else if (entry.target === featuresRef.current) {
                        setIsVisible((prev) => ({ ...prev, features: true }));
                    } else if (entry.target === benefitsRef.current) {
                        setIsVisible((prev) => ({ ...prev, benefits: true }));
                    } else if (entry.target === testimonialsRef.current) {
                        setIsVisible((prev) => ({ ...prev, testimonials: true }));
                    } else if (entry.target === statsRef.current) {
                        setIsVisible((prev) => ({ ...prev, stats: true }));
                    }
                }
            }
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        if (heroRef.current) observer.observe(heroRef.current);
        if (featuresRef.current) observer.observe(featuresRef.current);
        if (benefitsRef.current) observer.observe(benefitsRef.current);
        if (testimonialsRef.current) observer.observe(testimonialsRef.current);
        if (statsRef.current) observer.observe(statsRef.current);

        return () => {
            observer.disconnect();
        };
    }, []);

    return (
        <div className='flex min-h-screen flex-col'>
            <Header />

            <main className='flex-1'>
                {/* Hero Section */}
                <div ref={heroRef}>
                    <Hero isVisible={isVisible.hero} />
                </div>

                {/* Features Section */}
                <div ref={featuresRef}>
                    <Features isVisible={isVisible.features} />
                </div>

                {/* Benefits Section */}
                <div ref={benefitsRef}>
                    <Benefits isVisible={isVisible.benefits} />
                </div>

                {/* Stats Section */}
                <div ref={statsRef}>
                    <Stats isVisible={isVisible.stats} />
                </div>

                {/* Screenshots Section - Optimized Images */}
                <Screenshots />

                {/* Testimonials Section */}
                <div ref={testimonialsRef}>
                    <Testimonials isVisible={isVisible.testimonials} />
                </div>
            </main>

            {/* CTA Section */}
            <CTA />

            {/* Footer */}
            <Footer />
        </div>
    );
}
