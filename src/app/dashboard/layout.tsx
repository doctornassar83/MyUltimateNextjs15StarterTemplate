'use client';

import type React from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeSwitcher } from '@/components/ui';
import { useAuthProtection } from '@/context/auth-context';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();

    // Protect this route
    useAuthProtection();

    return (
        <div className='flex min-h-screen flex-col'>
            <header className='bg-background sticky top-0 z-50 border-b backdrop-blur-sm'>
                <div className='flex h-16 items-center px-6'>
                    <h1 className='text-xl font-bold'>Dashboard</h1>
                    <div className='ml-auto flex items-center gap-4'>
                        <div className='relative'>
                            <ThemeSwitcher />
                        </div>
                    </div>
                </div>
            </header>

            <div className='flex flex-1'>
                <aside className='sticky top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r p-4'>
                    <nav className='flex flex-col gap-2'>
                        <a
                            href='/dashboard'
                            className={`rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            Overview
                        </a>
                        <a
                            href='/dashboard/analytics'
                            className={`rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/analytics' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            Analytics
                        </a>
                        <a
                            href='/dashboard/todos'
                            className={`rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/todos' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            Todo List
                        </a>
                        <a
                            href='/dashboard/advanced-todo'
                            className={`rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/advanced-todo' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            Advanced Todo
                        </a>
                        <a
                            href='/dashboard/settings'
                            className={`rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            Settings
                        </a>
                        <a
                            href='/theme-test'
                            className={`rounded-md px-3 py-2 transition-colors ${pathname === '/theme-test' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            Theme Test
                        </a>
                    </nav>
                </aside>

                <main className='flex-1 overflow-auto p-6'>
                    {/* Add Todo Demo Banner, but don't show it on Todo pages themselves */}
                    {!pathname.includes('/todo') && (
                        <div className='mb-6 rounded-lg border bg-blue-50 p-4 dark:bg-blue-900/30'>
                            <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
                                <div>
                                    <h3 className='text-lg font-semibold text-blue-800 dark:text-blue-300'>
                                        Try Our Todo Demos
                                    </h3>
                                    <p className='text-sm text-blue-700 dark:text-blue-400'>
                                        Check out our Todo List demonstrations to see different state management
                                        patterns in action!
                                    </p>
                                </div>
                                <div className='flex gap-3'>
                                    <Link
                                        href='/dashboard/todos'
                                        className='rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700'>
                                        Basic Todo
                                    </Link>
                                    <Link
                                        href='/dashboard/advanced-todo'
                                        className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700'>
                                        Advanced Todo
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='mx-auto w-full max-w-6xl'>{children}</div>
                </main>
            </div>
        </div>
    );
}
