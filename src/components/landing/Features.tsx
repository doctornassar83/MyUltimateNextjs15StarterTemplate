'use client';

import { ArrowRight, Braces, Layers, Layout, Lock, Palette, Zap } from 'lucide-react';

export interface FeaturesProps {
    isVisible: boolean;
}

interface Feature {
    id: string;
    title: string;
    icon: React.ReactNode;
    description: string;
    gradient: string;
}

export function Features({ isVisible }: FeaturesProps) {
    const features: Feature[] = [
        {
            id: 'nextjs',
            title: 'Next.js 15',
            icon: <Zap className='h-6 w-6 text-white' />,
            description: 'Built with the latest features of Next.js App Router for optimized performance',
            gradient: 'from-blue-600 to-blue-400'
        },
        {
            id: 'typescript',
            title: 'TypeScript',
            icon: <Braces className='h-6 w-6 text-white' />,
            description: 'Fully typed codebase for better development experience and fewer bugs',
            gradient: 'from-cyan-500 to-blue-500'
        },
        {
            id: 'auth',
            title: 'Authentication',
            icon: <Lock className='h-6 w-6 text-white' />,
            description: 'Complete auth system with login, registration, and protected routes',
            gradient: 'from-green-500 to-emerald-400'
        },
        {
            id: 'api',
            title: 'API Integration',
            icon: <Layers className='h-6 w-6 text-white' />,
            description: 'Robust API client with error handling and request management',
            gradient: 'from-purple-600 to-indigo-500'
        },
        {
            id: 'tailwind',
            title: 'Tailwind CSS 4',
            icon: <Palette className='h-6 w-6 text-white' />,
            description: 'Beautiful UI components and responsive design with the latest Tailwind',
            gradient: 'from-cyan-500 to-teal-400'
        },
        {
            id: 'shadcn',
            title: 'Shadcn UI',
            icon: <Layout className='h-6 w-6 text-white' />,
            description: 'High-quality UI components built with Radix UI and Tailwind CSS',
            gradient: 'from-gray-700 to-gray-500 dark:from-gray-200 dark:to-gray-400'
        }
    ];

    return (
        <section
            id='features'
            className='from-background via-muted/5 to-muted/20 relative overflow-hidden bg-gradient-to-b px-4 py-32'>
            {/* Enhanced decorative elements with animations */}
            <div className='animate-float-slow bg-primary/10 absolute top-10 -right-4 h-64 w-64 rounded-full blur-3xl' />
            <div className='animate-float bg-accent/10 absolute bottom-10 -left-8 h-40 w-40 rounded-full blur-3xl' />
            <div className='animate-pulse-scale absolute top-40 left-20 h-32 w-32 rounded-full bg-blue-500/10 blur-2xl' />
            <div className='animate-float-slow-reverse absolute right-20 bottom-40 h-24 w-24 rounded-full bg-purple-500/10 blur-2xl' />

            <div className='relative z-10 container mx-auto'>
                <div
                    className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className='via-primary dark:via-primary bg-gradient-to-r from-gray-900 to-gray-900 bg-clip-text pb-2 text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:to-white'>
                        Powerful Features
                    </h2>
                    <p className='text-muted-foreground mx-auto mt-4 max-w-2xl text-lg'>
                        Everything you need to build modern web applications with confidence
                    </p>
                </div>

                <div className='mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
                    {features.map((feature, index) => (
                        <div
                            key={feature.id}
                            className={`group border-primary/10 bg-card hover:border-primary/20 dark:shadow-primary/10 dark:hover:shadow-primary/15 relative overflow-hidden rounded-xl border shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-lg ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                            style={{ transitionDelay: `${150 * index}ms` }}>
                            <div className='relative z-10 p-6'>
                                <div
                                    className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${feature.gradient} shadow-sm ring-1 ring-white/10`}>
                                    {feature.icon}
                                </div>
                                <h3 className='text-card-foreground mb-2 text-xl font-bold'>{feature.title}</h3>
                                <p className='text-muted-foreground text-sm'>{feature.description}</p>

                                <div className='text-primary mt-4 flex items-center font-medium opacity-0 transition-opacity duration-300 group-hover:opacity-100'>
                                    <span>Learn more</span>
                                    <ArrowRight className='ml-1 h-4 w-4 transition-transform group-hover:translate-x-1' />
                                </div>
                            </div>

                            {/* Card hover effect - subtle glow */}
                            <div className='via-primary/5 absolute inset-0 -z-10 bg-gradient-to-br from-transparent to-transparent opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-100' />

                            {/* Bottom highlight line */}
                            <div
                                className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${feature.gradient} transition-all duration-300 group-hover:w-full`}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
