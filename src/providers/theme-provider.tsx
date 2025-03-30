import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes';

import type { Theme } from '@/types';

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme: Theme | undefined;
    resolvedTheme: Theme;
    isSystemTheme: boolean;
    isDarkMode: boolean;
    themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEMES: Theme[] = ['light', 'dark', 'system'];
const STORAGE_KEY = 'theme';

/**
 * Enhanced theme provider with additional functionality
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [systemTheme, setSystemTheme] = useState<Theme | undefined>(undefined);
    const [mounted, setMounted] = useState(false);

    // During SSR, delay initialization until component is mounted
    useEffect(() => {
        setMounted(true);

        // Detect system preference
        const darkMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemTheme(darkMediaQuery.matches ? 'dark' : 'light');

        // Listen for system preference changes
        const handleChange = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };

        darkMediaQuery.addEventListener('change', handleChange);

        return () => {
            darkMediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // Avoid hydration mismatch by rendering children only after mounting
    if (!mounted) {
        return null;
    }

    return (
        <NextThemesProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            storageKey={STORAGE_KEY}
            disableTransitionOnChange>
            <ThemeContextProvider>{children}</ThemeContextProvider>
        </NextThemesProvider>
    );
}

/**
 * Context provider with additional theme functionality
 */
function ThemeContextProvider({ children }: { children: React.ReactNode }) {
    const { theme, setTheme: setNextTheme, resolvedTheme, systemTheme: nextSystemTheme } = useNextTheme();
    const currentTheme = theme as Theme;
    const currentResolvedTheme = (resolvedTheme || 'light') as Theme;

    // Set theme with validation
    const setTheme = (newTheme: Theme) => {
        if (THEMES.includes(newTheme)) {
            console.log(`Setting theme to ${newTheme} via context`);
            setNextTheme(newTheme);
        } else {
            console.error(`Invalid theme: ${newTheme}. Must be one of: ${THEMES.join(', ')}`);
            setNextTheme('system');
        }
    };

    // Expose context value
    const contextValue: ThemeContextType = {
        theme: currentTheme,
        setTheme,
        systemTheme: nextSystemTheme as Theme | undefined,
        resolvedTheme: currentResolvedTheme,
        isSystemTheme: currentTheme === 'system',
        isDarkMode: currentResolvedTheme === 'dark',
        themes: THEMES
    };

    return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
}

/**
 * Hook to access the theme context
 */
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}
