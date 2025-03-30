'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { Laptop, Moon, Sun } from 'lucide-react';

/**
 * ThemeSwitcher Component
 *
 * A theme switching UI component that allows users to toggle between light, dark,
 * and system themes. Avoids hydration mismatch by delaying initial render.
 *
 * @returns A theme switching button group
 */
export function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    // useEffect to avoid hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Don't render anything until after mounting to prevent hydration mismatch
    if (!mounted) {
        return <div className='h-9 w-[94px] rounded-md border' />;
    }

    return (
        <div className='relative z-10 flex items-center space-x-1 rounded-md border p-1'>
            {/* Light theme button */}
            <ThemeButton
                theme='light'
                currentTheme={theme}
                onClick={() => setTheme('light')}
                icon={<Sun className='h-4 w-4' />}
            />

            {/* Dark theme button */}
            <ThemeButton
                theme='dark'
                currentTheme={theme}
                onClick={() => setTheme('dark')}
                icon={<Moon className='h-4 w-4' />}
            />

            {/* System theme button */}
            <ThemeButton
                theme='system'
                currentTheme={theme}
                onClick={() => setTheme('system')}
                icon={<Laptop className='h-4 w-4' />}
            />
        </div>
    );
}

/**
 * ThemeButton Component
 *
 * Individual button in the theme switcher interface.
 */
interface ThemeButtonProps {
    theme: string;
    currentTheme: string | undefined;
    onClick: () => void;
    icon: React.ReactNode;
}

function ThemeButton({ theme, currentTheme, onClick, icon }: ThemeButtonProps) {
    const isActive = currentTheme === theme;

    return (
        <button
            type='button'
            onClick={onClick}
            className={`relative z-20 flex h-8 w-8 cursor-pointer items-center justify-center rounded-sm p-1.5 transition-colors ${
                isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted'
            }`}
            aria-label={`${theme.charAt(0).toUpperCase() + theme.slice(1)} mode`}>
            {icon}
        </button>
    );
}
