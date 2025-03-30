'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { ThemeSwitcher } from '@/components/ui';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

import { Sparkles, Zap } from 'lucide-react';

export function Header() {
    const { isSignedIn } = useAuth();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            if (isScrolled !== scrolled) {
                setScrolled(isScrolled);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [scrolled]);

    return (
        <header
            className={`sticky top-0 z-50 w-full border-b backdrop-blur transition-all duration-300 ${
                scrolled ? 'bg-slate-900/60 dark:bg-white/60' : 'bg-slate-900/90 dark:bg-white/90'
            } text-white dark:text-slate-900`}>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                <div className='flex items-center gap-2'>
                    <div className='relative h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 p-[2px] shadow-lg'>
                        <div className='flex h-full w-full items-center justify-center rounded-full bg-slate-900 dark:bg-white'>
                            <Sparkles size={16} className='text-blue-500' />
                        </div>
                    </div>
                    <span className='text-xl font-bold'>Next.js 15 Enterprise</span>
                </div>
                <nav className='hidden space-x-6 md:flex'>
                    <Link
                        href='#features'
                        className='text-sm font-medium text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                        Features
                    </Link>
                    <Link
                        href='/api-examples'
                        className='text-sm font-medium text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                        API Examples
                    </Link>
                    <Link
                        href='/accessibility'
                        className='text-sm font-medium text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                        Accessibility
                    </Link>
                    <Link
                        href='#about'
                        className='text-sm font-medium text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                        About
                    </Link>
                </nav>
                <div className='flex items-center space-x-4'>
                    <div className='relative'>
                        <ThemeSwitcher />
                    </div>

                    {isSignedIn ? (
                        <>
                            <Link
                                href='/dashboard'
                                className='text-sm font-medium text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                                Dashboard
                            </Link>
                            <UserButton afterSignOutUrl='/' />
                        </>
                    ) : (
                        <>
                            <SignInButton mode='modal'>
                                <button
                                    type='button'
                                    className='text-sm font-medium text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                                    Sign In
                                </button>
                            </SignInButton>

                            <SignUpButton mode='modal'>
                                <button
                                    type='button'
                                    className='relative overflow-hidden rounded-md bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-md dark:text-white'>
                                    <span className='relative z-10'>Sign up</span>
                                    <span className='absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 transition-opacity hover:opacity-100' />
                                </button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
