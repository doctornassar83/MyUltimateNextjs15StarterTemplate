'use client';

import { useEffect, useRef, useState } from 'react';

import Link from 'next/link';

import { ArrowRight, Github, Star, Zap } from 'lucide-react';

export interface HeroProps {
    isVisible: boolean;
}

export function Hero({ isVisible }: HeroProps) {
    return (
        <section className='relative overflow-hidden px-4 py-28 md:py-40'>
            <div className='bg-primary/30 absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl' />
            <div className='bg-accent/30 absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl' />

            <div className='animate-float-slow absolute top-1/4 right-1/3 h-24 w-24 rounded-full bg-blue-500/20 blur-xl' />
            <div className='animate-float absolute bottom-1/3 left-1/4 h-32 w-32 rounded-full bg-green-500/20 blur-xl' />
            <div className='animate-float-slow-reverse absolute top-2/3 right-1/4 h-16 w-16 rounded-full bg-pink-500/20 blur-xl' />

            <div className='animate-pulse-scale absolute top-1/2 left-1/3 h-16 w-16 rounded-full bg-purple-500/20 blur-xl' />
            <div className='animate-spin-slow absolute right-1/3 bottom-1/4 h-20 w-20 rounded-full bg-yellow-500/20 blur-xl' />

            <div
                className={`relative z-10 container mx-auto transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className='flex flex-col items-center justify-center gap-2 pb-6'>
                    <div className='bg-background/50 flex items-center rounded-full border px-3 py-1 text-sm backdrop-blur-sm'>
                        <span className='bg-primary mr-1 flex h-4 w-4 items-center justify-center rounded-full'>
                            <Star size={10} className='text-white' />
                        </span>
                        <span>Built with Next.js 15 and React 19</span>
                    </div>

                    <Link
                        href='https://github.com/doctornassar83/MyUltimateNextjs15StarterTemplate'
                        target='_blank'
                        className='bg-background/50 hover:bg-background/80 flex items-center gap-2 rounded-full border px-3 py-1 text-sm backdrop-blur-sm transition-colors'>
                        <Github size={14} />
                        <span>Star on GitHub</span>
                    </Link>
                </div>

                <h1 className='bg-gradient-to-r from-gray-900 via-blue-700 to-gray-600 bg-clip-text text-center text-4xl leading-tight font-bold text-transparent sm:text-5xl md:text-6xl lg:text-7xl dark:from-white dark:via-blue-400 dark:to-gray-400'>
                    <span
                        className={`block transition-all delay-200 duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        Next.js 15 Enterprise
                    </span>
                    <span
                        className={`block bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent transition-all delay-500 duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                        Starter Template
                    </span>
                </h1>

                <p
                    className={`text-muted-foreground mx-auto mt-6 max-w-2xl text-center text-lg transition-all delay-700 duration-700 md:text-xl ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    A production-ready, fully-featured Next.js template for building robust applications with modern
                    tooling and best practices.
                </p>

                <div
                    className={`mt-10 flex flex-col items-center justify-center space-y-4 transition-all delay-1000 duration-700 sm:flex-row sm:space-y-0 sm:space-x-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                    <Link
                        href='/register'
                        className='group relative inline-flex min-w-[160px] items-center justify-center overflow-visible rounded-md bg-gradient-to-r from-blue-600 via-blue-500 to-purple-600 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl'>
                        <span className='relative z-10 flex items-center whitespace-nowrap'>
                            Get Started
                            <ArrowRight size={16} className='ml-2 transition-transform group-hover:translate-x-1' />
                        </span>
                        <span className='absolute inset-0 rounded-md bg-gradient-to-r from-blue-700 via-blue-600 to-purple-700 opacity-0 transition-opacity group-hover:opacity-100' />
                    </Link>

                    <Link
                        href='/dashboard'
                        className='bg-background/50 hover:bg-background border-primary/20 hover:border-primary/50 rounded-md border px-8 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:shadow-md'>
                        View Demo
                    </Link>
                </div>
            </div>
        </section>
    );
}
