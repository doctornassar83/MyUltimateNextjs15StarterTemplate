'use client';

import Link from 'next/link';

import { ArrowRight, CheckCircle, Code, Terminal } from 'lucide-react';

export interface BenefitsProps {
    isVisible: boolean;
}

interface Benefit {
    id: string;
    text: string;
}

export function Benefits({ isVisible }: BenefitsProps) {
    const benefits: Benefit[] = [
        { id: 'production-config', text: 'Production-ready configuration' },
        { id: 'best-practices', text: 'Best practices built-in' },
        { id: 'performance', text: 'Optimized for performance' },
        { id: 'component-library', text: 'Comprehensive component library' },
        { id: 'theming', text: 'Flexible theming system' },
        { id: 'workflow', text: 'Modern development workflow' }
    ];

    return (
        <section className='bg-muted/30 relative overflow-hidden px-4 py-28'>
            <div className='bg-primary/5 absolute top-20 -left-20 h-40 w-40 rounded-full mix-blend-multiply blur-3xl' />
            <div className='absolute -right-20 bottom-20 h-40 w-40 rounded-full bg-blue-500/5 mix-blend-multiply blur-3xl' />

            <div className='container mx-auto'>
                <div className='grid items-center gap-10 md:grid-cols-2'>
                    <div
                        className={`order-2 transition-all duration-1000 md:order-1 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}`}>
                        <h2 className='text-3xl font-bold md:text-4xl'>Why Choose Our Starter?</h2>
                        <p className='text-muted-foreground mt-4'>
                            Our enterprise-grade template saves you weeks of setup and configuration time.
                        </p>

                        <div className='mt-8 space-y-4'>
                            {benefits.map((benefit, index) => (
                                <div
                                    key={benefit.id}
                                    className={`flex items-start gap-3 transition-all duration-500 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-8 opacity-0'}`}
                                    style={{ transitionDelay: `${100 * index}ms` }}>
                                    <div className='relative'>
                                        <div className='bg-primary/20 absolute inset-0 animate-pulse rounded-full blur-sm' />
                                        <CheckCircle className='text-primary relative z-10 mt-0.5 h-5 w-5 shrink-0' />
                                    </div>
                                    <span>{benefit.text}</span>
                                </div>
                            ))}
                        </div>

                        <div
                            className={`mt-12 transition-all delay-500 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                            <Link
                                href='/register'
                                className='group relative inline-flex min-w-[180px] items-center justify-center overflow-visible rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:shadow-lg'>
                                <span className='relative z-10 flex items-center whitespace-nowrap'>
                                    Start Building Today
                                    <ArrowRight
                                        size={16}
                                        className='ml-2 transition-transform group-hover:translate-x-1'
                                    />
                                </span>
                                <span className='absolute inset-0 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100' />
                            </Link>
                        </div>
                    </div>

                    <div
                        className={`order-1 flex justify-center transition-all duration-1000 md:order-2 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`}>
                        <div className='relative'>
                            <div className='animate-float-slow absolute -top-6 -left-6 h-40 w-40 rounded-full bg-purple-500/10 blur-2xl' />
                            <div className='bg-primary/10 animate-float-slow-reverse absolute -right-6 -bottom-6 h-40 w-40 rounded-full blur-2xl' />
                            <div className='bg-background relative z-10 rounded-xl border p-1 shadow-2xl'>
                                <div className='bg-muted/30 rounded-lg p-6 backdrop-blur-sm'>
                                    <div className='flex flex-col gap-4'>
                                        <div className='flex items-center justify-between'>
                                            <div className='flex space-x-2'>
                                                <div className='h-3 w-3 rounded-full bg-red-500' />
                                                <div className='h-3 w-3 rounded-full bg-yellow-500' />
                                                <div className='h-3 w-3 rounded-full bg-green-500' />
                                            </div>
                                            <div className='bg-muted h-3 w-20 rounded-full' />
                                        </div>

                                        <div className='bg-muted h-3 w-24 rounded-full' />
                                        <div className='bg-muted h-3 w-32 rounded-full' />
                                        <div className='bg-muted h-3 w-20 rounded-full' />
                                        <div className='bg-primary/20 h-10 w-full rounded-md' />
                                        <div className='grid grid-cols-3 gap-2'>
                                            <div className='bg-muted h-16 rounded-md' />
                                            <div className='bg-muted h-16 rounded-md' />
                                            <div className='bg-muted h-16 rounded-md' />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Code snippets */}
                            <div className='absolute -right-12 -bottom-12 rotate-12 transform'>
                                <div className='bg-background rounded-lg border px-4 py-2 shadow-lg'>
                                    <div className='flex items-center gap-2'>
                                        <Code size={16} className='text-primary' />
                                        <div className='font-mono text-xs'>{`import { useRouter } from 'next/navigation'`}</div>
                                    </div>
                                </div>
                            </div>

                            <div className='absolute -top-10 -left-10 -rotate-6 transform'>
                                <div className='bg-background rounded-lg border px-4 py-2 shadow-lg'>
                                    <div className='flex items-center gap-2'>
                                        <Terminal size={16} className='text-green-500' />
                                        <div className='font-mono text-xs'>npm run dev</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
