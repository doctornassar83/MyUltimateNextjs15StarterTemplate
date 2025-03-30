'use client';

import { Zap } from 'lucide-react';

export interface FeaturesProps {
    isVisible: boolean;
}

interface Feature {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
}

export function Features({ isVisible }: FeaturesProps) {
    const features: Feature[] = [
        {
            id: 'nextjs',
            title: 'Next.js 15',
            icon: <Zap className='text-primary h-6 w-6' />,
            description: 'Built with the latest features of Next.js App Router for optimized performance'
        },
        {
            id: 'typescript',
            title: 'TypeScript',
            icon: <span className='text-xl font-bold text-blue-500'>TS</span>,
            description: 'Fully typed codebase for better development experience and fewer bugs'
        },
        {
            id: 'auth',
            title: 'Authentication',
            icon: <span className='text-xl font-bold text-green-500'>🔐</span>,
            description: 'Complete auth system with login, registration, and protected routes'
        },
        {
            id: 'api',
            title: 'API Integration',
            icon: <span className='text-xl font-bold text-purple-500'>API</span>,
            description: 'Robust API client with error handling and request management'
        },
        {
            id: 'tailwind',
            title: 'Tailwind CSS 4',
            icon: <span className='text-xl font-bold text-cyan-500'>TW</span>,
            description: 'Beautiful UI components and responsive design with the latest Tailwind'
        },
        {
            id: 'shadcn',
            title: 'Shadcn UI',
            icon: <span className='text-xl font-bold text-gray-500 dark:text-gray-400'>UI</span>,
            description: 'High-quality UI components built with Radix UI and Tailwind CSS'
        }
    ];

    return (
        <section id='features' className='from-background to-muted/30 bg-gradient-to-b px-4 py-32'>
            <div className='relative'>
                {/* Decorative elements */}
                <div className='bg-primary/5 absolute top-10 -right-4 h-64 w-64 rounded-full blur-3xl' />
                <div className='absolute bottom-10 -left-8 h-40 w-40 rounded-full bg-purple-500/5 blur-3xl' />

                <div className='relative z-10 container mx-auto'>
                    <div
                        className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        <h2 className='text-3xl font-bold md:text-4xl'>Powerful Features</h2>
                        <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
                            Everything you need to build modern web applications with confidence
                        </p>
                    </div>

                    <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                        {features.map((feature, index) => (
                            <div
                                key={feature.id}
                                className={`group bg-background hover:shadow-primary/5 relative overflow-hidden rounded-xl border p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                                style={{ transitionDelay: `${150 * index}ms` }}>
                                <div className='bg-muted/50 mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
                                    {feature.icon}
                                </div>
                                <h3 className='text-xl font-bold'>{feature.title}</h3>
                                <p className='text-muted-foreground mt-2 text-sm'>{feature.description}</p>
                                <div className='from-primary absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r to-purple-600 transition-all duration-300 group-hover:w-full' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
