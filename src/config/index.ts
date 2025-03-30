import { z } from 'zod';

/**
 * Environment variable schema validation
 */
const envSchema = z.object({
    // Node environment
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // Base URLs
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),

    // API endpoints and keys
    NEXT_PUBLIC_API_URL: z.string().url().optional(),

    // Feature flags
    NEXT_PUBLIC_FEATURE_NEW_DASHBOARD: z.enum(['true', 'false']).optional(),
    NEXT_PUBLIC_FEATURE_NEW_EDITOR: z.enum(['true', 'false']).optional(),

    // Analytics
    NEXT_PUBLIC_ANALYTICS_ENABLED: z.enum(['true', 'false']).optional()
});

/**
 * Parse and validate environment variables
 */
const parseEnv = () => {
    const parsed = envSchema.safeParse(process.env);

    if (!parsed.success) {
        console.error('❌ Invalid environment variables:', parsed.error.flatten().fieldErrors);
        throw new Error('Invalid environment variables');
    }

    return parsed.data;
};

/**
 * App configuration with environment variables and constants
 */
export const config = {
    env: parseEnv(),

    // App metadata
    app: {
        name: 'Next.js 15 Enterprise',
        description: 'Enterprise-ready Next.js 15 application',
        url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    },

    // Feature flags
    features: {
        newDashboard: process.env.NEXT_PUBLIC_FEATURE_NEW_DASHBOARD === 'true',
        newEditor: process.env.NEXT_PUBLIC_FEATURE_NEW_EDITOR === 'true'
    },

    // API endpoints
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
        timeout: 10000
    }
} as const;

export type Config = typeof config;
