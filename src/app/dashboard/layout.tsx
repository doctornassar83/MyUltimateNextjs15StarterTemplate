'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ThemeSwitcher } from '@/components/ui';
import { UserButton } from '@clerk/nextjs';

import {
    BarChart,
    ChevronLeft,
    ChevronRight,
    Home,
    LayoutDashboard,
    ListTodo,
    Settings,
    Sparkles,
    User
} from 'lucide-react';

interface DashboardLayoutProps {
    children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };

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
        <div className='flex min-h-screen flex-col'>
            <header
                className={`sticky top-0 z-50 border-b backdrop-blur-sm transition-all duration-300 ${
                    scrolled ? 'bg-slate-900/60 dark:bg-white/60' : 'bg-slate-900/90 dark:bg-white/90'
                } text-white dark:text-slate-900`}>
                <div className='flex h-16 items-center px-6'>
                    <Link
                        href='/'
                        className='mr-4 flex items-center gap-2 text-white/90 transition-colors hover:text-white dark:text-slate-900/90 dark:hover:text-slate-900'>
                        <Home size={18} />
                        <span className='sr-only text-sm md:not-sr-only'>Back to Home</span>
                    </Link>
                    <h1 className='text-xl font-bold'>Dashboard</h1>
                    <div className='ml-auto flex items-center gap-4'>
                        <div className='relative'>
                            <ThemeSwitcher />
                        </div>
                        <UserButton afterSignOutUrl='/' />
                    </div>
                </div>
            </header>

            <div className='flex flex-1'>
                <aside
                    className={`sticky top-16 h-[calc(100vh-4rem)] ${collapsed ? 'w-16' : 'w-64'} overflow-y-auto border-r p-4 transition-all duration-300`}>
                    <div className='mb-4 flex justify-end'>
                        <button
                            type='button'
                            onClick={toggleSidebar}
                            className='rounded-full p-1 hover:bg-gray-200 dark:hover:bg-gray-700'
                            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
                            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                        </button>
                    </div>
                    <nav className='flex flex-col gap-2'>
                        <a
                            href='/dashboard'
                            className={`flex items-center rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <LayoutDashboard
                                size={18}
                                className={`flex-shrink-0 ${pathname === '/dashboard' ? 'text-primary' : 'text-blue-500 dark:text-blue-400'}`}
                            />
                            {!collapsed && <span className='ml-2'>Overview</span>}
                        </a>
                        <a
                            href='/dashboard/analytics'
                            className={`flex items-center rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/analytics' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <BarChart
                                size={18}
                                className={`flex-shrink-0 ${pathname === '/dashboard/analytics' ? 'text-primary' : 'text-orange-500'}`}
                            />
                            {!collapsed && <span className='ml-2'>Analytics</span>}
                        </a>
                        <a
                            href='/dashboard/todos'
                            className={`flex items-center rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/todos' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <ListTodo
                                size={18}
                                className={`flex-shrink-0 ${pathname === '/dashboard/todos' ? 'text-primary' : 'text-green-500'}`}
                            />
                            {!collapsed && <span className='ml-2'>Todo List</span>}
                        </a>
                        <a
                            href='/dashboard/advanced-todo'
                            className={`flex items-center rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/advanced-todo' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <Sparkles
                                size={18}
                                className={`flex-shrink-0 ${pathname === '/dashboard/advanced-todo' ? 'text-primary' : 'text-purple-500'}`}
                            />
                            {!collapsed && <span className='ml-2'>Advanced Todo</span>}
                        </a>
                        <a
                            href='/dashboard/settings'
                            className={`flex items-center rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/settings' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <Settings
                                size={18}
                                className={`flex-shrink-0 ${pathname === '/dashboard/settings' ? 'text-primary' : 'text-amber-500 dark:text-amber-400'}`}
                            />
                            {!collapsed && <span className='ml-2'>Settings</span>}
                        </a>
                        <a
                            href='/dashboard/profile'
                            className={`flex items-center rounded-md px-3 py-2 transition-colors ${pathname === '/dashboard/profile' ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}>
                            <User
                                size={18}
                                className={`flex-shrink-0 ${pathname === '/dashboard/profile' ? 'text-primary' : 'text-indigo-500'}`}
                            />
                            {!collapsed && <span className='ml-2'>Profile</span>}
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
