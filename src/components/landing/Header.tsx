'use client';

import Link from 'next/link';

import { ThemeSwitcher } from '@/components/ui';
import { SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/nextjs';

import { Zap } from 'lucide-react';

export function Header() {
    const { isSignedIn } = useAuth();

    return (
        <header className='bg-background/80 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
            <div className='container mx-auto flex h-16 items-center justify-between px-4'>
                <div className='flex items-center gap-2'>
                    <div className='from-primary/90 relative h-8 w-8 rounded-full bg-gradient-to-br to-purple-600 p-[2px]'>
                        <div className='bg-background flex h-full w-full items-center justify-center rounded-full'>
                            <Zap size={16} className='text-primary' />
                        </div>
                    </div>
                    <span className='text-xl font-bold'>Next.js 15 Enterprise</span>
                </div>
                <nav className='hidden space-x-8 md:flex'>
                    <Link href='#features' className='hover:text-primary text-sm font-medium transition-colors'>
                        Features
                    </Link>
                    <Link href='#about' className='hover:text-primary text-sm font-medium transition-colors'>
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
                                className='hover:text-primary text-sm font-medium transition-colors'>
                                Dashboard
                            </Link>
                            <UserButton afterSignOutUrl='/' />
                        </>
                    ) : (
                        <>
                            <SignInButton mode='modal'>
                                <button
                                    type='button'
                                    className='hover:text-primary text-sm font-medium transition-colors'>
                                    Sign In
                                </button>
                            </SignInButton>

                            <SignUpButton mode='modal'>
                                <button
                                    type='button'
                                    className='from-primary relative overflow-hidden rounded-md bg-gradient-to-r to-purple-600 px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-md'>
                                    <span className='relative z-10'>Sign up</span>
                                    <span className='to-primary absolute inset-0 bg-gradient-to-r from-purple-600 opacity-0 transition-opacity hover:opacity-100' />
                                </button>
                            </SignUpButton>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
