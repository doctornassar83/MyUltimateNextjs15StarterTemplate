import type { ReactNode } from 'react';

import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';

import '@/app/globals.css';
import { config } from '@/config';
import { Providers } from '@/providers';
import { ClerkProvider } from '@clerk/nextjs';

// Geist typeface as a variable font
const geistSans = localFont({
    src: './fonts/GeistVF.woff',
    variable: '--font-geist-sans',
    weight: '100 900',
    display: 'swap'
});
const geistMono = localFont({
    src: './fonts/GeistMonoVF.woff',
    variable: '--font-geist-mono',
    weight: '100 900',
    display: 'swap'
});

// Metadata for the site
export const metadata: Metadata = {
    title: {
        default: config.app.name,
        template: `%s | ${config.app.name}`
    },
    description: config.app.description,
    metadataBase: new URL(config.app.url),
    robots: {
        index: true,
        follow: true
    },
    manifest: '/site.webmanifest',
    icons: {
        icon: '/favicon.ico',
        apple: '/apple-touch-icon.png'
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: config.app.url,
        title: config.app.name,
        description: config.app.description,
        siteName: config.app.name
    },
    twitter: {
        card: 'summary_large_image',
        title: config.app.name,
        description: config.app.description
    }
};

// Viewport configuration
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: 'white' },
        { media: '(prefers-color-scheme: dark)', color: 'black' }
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <html lang='en' suppressHydrationWarning>
            <body className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
                <ClerkProvider>
                    <Providers>{children}</Providers>
                </ClerkProvider>
            </body>
        </html>
    );
}
