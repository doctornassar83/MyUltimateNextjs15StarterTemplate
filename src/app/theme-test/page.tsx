'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

import { useTheme as useNextTheme } from 'next-themes';

import { ThemeSwitcher } from '@/components/ui';
import { useTheme } from '@/providers/theme-provider';

export default function ThemeTestPage() {
    const nextThemes = useNextTheme();
    const customTheme = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <p>Loading...</p>;
    }

    return (
        <div className='container mx-auto py-12'>
            <h1 className='mb-4 text-3xl font-bold'>Theme Switcher Test Page</h1>

            <div className='mb-8 rounded-md bg-yellow-100 p-4 dark:bg-yellow-900'>
                <p className='text-yellow-800 dark:text-yellow-200'>
                    This page allows you to test the theme switcher and see the current theme information.
                </p>
            </div>

            <div className='grid gap-8'>
                <div className='rounded-lg border p-6'>
                    <h2 className='mb-4 text-xl font-bold'>Current Theme Information</h2>
                    <pre className='bg-muted overflow-auto rounded-md p-4'>
                        {JSON.stringify(
                            {
                                'next-themes': {
                                    theme: nextThemes.theme,
                                    resolvedTheme: nextThemes.resolvedTheme,
                                    systemTheme: nextThemes.systemTheme
                                },
                                'custom-hook': {
                                    theme: customTheme.theme,
                                    resolvedTheme: customTheme.resolvedTheme,
                                    systemTheme: customTheme.systemTheme,
                                    isDarkMode: customTheme.isDarkMode,
                                    isSystemTheme: customTheme.isSystemTheme
                                }
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>

                <div className='rounded-lg border p-6'>
                    <h2 className='mb-4 text-xl font-bold'>Theme Switcher</h2>
                    <div className='mb-4 flex justify-center'>
                        <ThemeSwitcher />
                    </div>
                    <p className='text-muted-foreground text-center text-sm'>
                        Click the buttons above to change the theme
                    </p>
                </div>

                <div className='mt-4 flex justify-center'>
                    <Link href='/' className='bg-primary text-primary-foreground rounded-md px-4 py-2'>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
