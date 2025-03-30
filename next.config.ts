import type { NextConfig } from 'next';

import initializeBundleAnalyzer from '@next/bundle-analyzer';

// https://www.npmjs.com/package/@next/bundle-analyzer
const withBundleAnalyzer = initializeBundleAnalyzer({
    enabled: process.env.BUNDLE_ANALYZER_ENABLED === 'true',
    openAnalyzer: process.env.NODE_ENV === 'development'
});

/**
 * Enhanced Next.js configuration with advanced options
 */
const nextConfig: NextConfig = {
    // Use standalone output for containerized deployments
    output: 'standalone',

    // Include additional files in trace output
    outputFileTracingIncludes: {
        '/*': ['./registry/**/*']
    },

    // Image optimization configuration
    images: {
        formats: ['image/avif', 'image/webp'],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com'
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com'
            }
        ]
    },

    // Strict mode for React development
    reactStrictMode: true,

    // Compression options (Gzip or Brotli)
    compress: true,

    // Configure server-side features
    experimental: {
        // Enable server actions
        serverActions: {
            bodySizeLimit: '2mb'
        },
        // Optimize performance
        optimizeServerReact: true,
        // Turbopack configuration
        turbo: {
            rules: {
                // Configure loaders for different file types
                '*.svg': [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            svgo: true,
                            svgoConfig: {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: { removeViewBox: false }
                                        }
                                    }
                                ]
                            }
                        }
                    }
                ]
            }
        }
    },

    // Configure more headers for improved security
    headers: async () => [
        {
            // Apply these headers to all routes
            source: '/(.*)',
            headers: [
                // Strict Transport Security
                {
                    key: 'Strict-Transport-Security',
                    value: 'max-age=63072000; includeSubDomains; preload'
                }
            ]
        }
    ],

    // Custom webpack configuration - only used when not using Turbopack
    webpack: (config, { dev, isServer }) => {
        // Example optimization: Skip source maps in production
        if (!dev && !isServer) {
            config.devtool = false;
        }

        return config;
    },

    // Configure redirects
    redirects: async () => [
        {
            source: '/home',
            destination: '/',
            permanent: true
        }
    ],

    // Performance and analytics
    poweredByHeader: false, // Remove X-Powered-By header
    generateBuildId: async () => {
        // You can use git commit hash as build ID
        return `build-${Date.now()}`;
    }
};

export default withBundleAnalyzer(nextConfig);
