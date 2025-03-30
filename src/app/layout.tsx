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
        icon: [
            { url: '/favicons/favicon.ico', sizes: 'any' },
            { url: '/favicons/favicon.svg', type: 'image/svg+xml' }
        ],
        apple: [{ url: '/favicons/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
        other: [
            { url: '/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
            { url: '/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' }
        ]
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: config.app.url,
        title: config.app.name,
        description: config.app.description,
        siteName: config.app.name,
        images: [
            {
                url: `${config.app.url}/og-image.jpg`,
                width: 1200,
                height: 630,
                alt: config.app.name
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: config.app.name,
        description: config.app.description,
        images: [`${config.app.url}/og-image.jpg`]
    }
};

// Viewport configuration
export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#6366F1' },
        { media: '(prefers-color-scheme: dark)', color: '#8B5CF6' }
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
    return (
        <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
            <html lang='en' suppressHydrationWarning>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} bg-background text-foreground antialiased`}>
                    <Providers>{children}</Providers>
                </body>
            </html>
        </ClerkProvider>
    );
}
