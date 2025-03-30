'use client';

import type React from 'react';

import { config } from '@/config';
import { AuthProvider } from '@/context/auth-context';
import { TodoProvider } from '@/context/todo-context';
import { Analytics } from '@vercel/analytics/react';

import { ThemeProvider } from './theme-provider';
import { Toaster } from 'sonner';

// Export all from theme-provider
export * from './theme-provider';

interface ProvidersProps {
    children: React.ReactNode;
}

/**
 * Main providers component to wrap the application
 * Provides all global contexts and providers
 */
export function Providers({ children }: ProvidersProps) {
    const analyticsEnabled = config.env.NEXT_PUBLIC_ANALYTICS_ENABLED === 'true';

    return (
        <ThemeProvider>
            <AuthProvider>
                <TodoProvider>
                    {children}

                    {/* Toast notifications */}
                    <Toaster
                        position='top-right'
                        richColors
                        closeButton
                        toastOptions={{
                            duration: 5000
                        }}
                    />

                    {/* Analytics */}
                    {analyticsEnabled && <Analytics />}
                </TodoProvider>
            </AuthProvider>
        </ThemeProvider>
    );
}
