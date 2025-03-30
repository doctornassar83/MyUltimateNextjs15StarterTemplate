# Advanced Guide: Extending Your Next.js 15 Enterprise Template

This guide provides instructions for extending your Next.js 15 Enterprise Starter Template with additional features and integrations, including databases, testing strategies, styling customizations, and more.

## Table of Contents

- [Adding a Database](#adding-a-database)
- [Authentication Integration](#authentication-integration)
- [Advanced Styling](#advanced-styling)
- [Testing Strategy](#testing-strategy)
- [Performance Optimization](#performance-optimization)
- [Deployment Options](#deployment-options)
- [Security Enhancements](#security-enhancements)
- [Internationalization](#internationalization)
- [Analytics and Monitoring](#analytics-and-monitoring)

## Adding a Database

### Option 1: Prisma (SQL Databases)

Prisma works well with PostgreSQL, MySQL, SQLite, and SQL Server.

```bash
# Install Prisma
pnpm add prisma @prisma/client
pnpm dlx prisma init
```

Configure your database in `prisma/schema.prisma`:

```prisma
// Example schema
datasource db {
  provider = "postgresql" // or "mysql", "sqlite", "sqlserver"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  password  String
  role      String   @default("user")
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  todos     Todo[]
}

model Todo {
  id          String   @id @default(cuid())
  title       String
  description String?
  completed   Boolean  @default(false)
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Create a database client singleton in `src/lib/prisma.ts`:

```typescript
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error']
    });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
```

### Option 2: MongoDB with Mongoose

```bash
# Install Mongoose
pnpm add mongoose
```

Create a connection file at `src/lib/mongoose.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
            return mongoose;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default connectDB;
```

Create models in `src/models/`:

```typescript
// src/models/User.ts
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        role: {
            type: String,
            default: 'user'
        }
    },
    {
        timestamps: true
    }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
```

### Option 3: Serverless Databases (Supabase/Firebase)

#### Supabase

```bash
# Install Supabase
pnpm add @supabase/supabase-js
```

Create a client in `src/lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### Firebase

```bash
# Install Firebase
pnpm add firebase
```

Create a client in `src/lib/firebase.ts`:

```typescript
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
```

## Authentication Integration

### NextAuth.js v5 (Auth.js)

```bash
pnpm add next-auth@beta
```

Create an Auth.js configuration:

```typescript
// src/auth.ts
import { prisma } from '@/lib/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

import bcrypt from 'bcryptjs';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: 'jwt' },
    pages: {
        signIn: '/login',
        error: '/error'
    },
    providers: [
        GitHub({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
        Credentials({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { email: credentials.email }
                });

                if (!user || !user?.password) {
                    return null;
                }

                const passwordMatch = await bcrypt.compare(credentials.password, user.password);

                if (!passwordMatch) {
                    return null;
                }

                return {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    role: user.role
                };
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            if (token.role && session.user) {
                session.user.role = token.role as string;
            }

            return session;
        },
        async jwt({ token }) {
            if (!token.sub) return token;

            const existingUser = await prisma.user.findUnique({
                where: { id: token.sub }
            });

            if (!existingUser) return token;

            token.role = existingUser.role;
            return token;
        }
    }
});
```

## Advanced Styling

### TailwindCSS V4 (When Released)

When Tailwind v4 releases, update to it:

```bash
# Update to Tailwind v4 when available
pnpm add tailwindcss@latest postcss@latest autoprefixer@latest
```

Configure your `tailwind.config.ts` file with v4 features:

```typescript
import type { Config } from 'tailwindcss';

export default {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            // Example of extending the theme with custom values
            colors: {
                brand: {
                    50: '#f0f9ff',
                    100: '#e0f2fe',
                    // ... other shades
                    900: '#0c4a6e'
                }
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out'
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' }
                }
            }
        }
    },
    plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms'), require('@tailwindcss/aspect-ratio')]
} satisfies Config;
```

### Custom Design System

Create a dedicated design system folder:

```
src/
└── design-system/
    ├── tokens/          # Design tokens
    │   ├── colors.ts
    │   ├── spacing.ts
    │   └── typography.ts
    ├── components/      # Base components
    │   ├── Button/
    │   ├── Card/
    │   └── Input/
    └── patterns/        # UI patterns
        ├── DataTable/
        ├── Forms/
        └── Layout/
```

For example, create a design token system:

```typescript
// src/design-system/tokens/colors.ts
export const colors = {
    primary: {
        50: 'hsl(220, 100%, 98%)',
        100: 'hsl(220, 100%, 95%)',
        // ... other shades
        900: 'hsl(220, 65%, 15%)'
    }
    // ... other color families
};

// Integrate with Tailwind by adding to tailwind.config.ts
```

## Testing Strategy

### Unit and Component Testing with Vitest and Testing Library

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitejs/plugin-react jsdom happy-dom
```

Create a setup file at `src/tests/setup.ts`:

```typescript
import '@testing-library/jest-dom';

import { mockRouter } from './mocks/router';
import { vi } from 'vitest';

// Mock Next.js router
vi.mock('next/navigation', () => mockRouter);

// Add global mocks here
```

Create a test file, e.g., `src/components/Button/Button.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, describe, it, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Integration and E2E Testing with Playwright

```bash
pnpm add -D @playwright/test
npx playwright install
```

Create a test file at `e2e/basic.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';

test('basic navigation test', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');

    // Check page title
    await expect(page).toHaveTitle(/Next.js 15 Enterprise/);

    // Click on a link
    await page.click('text=Login');

    // Verify URL after navigation
    await expect(page).toHaveURL(/login/);
});

test('theme switching works', async ({ page }) => {
    await page.goto('/');

    // Find and click the theme switcher
    await page.click('[aria-label="Dark mode"]');

    // Verify dark mode is active
    const html = await page.locator('html');
    await expect(html).toHaveClass(/dark/);
});
```

## Performance Optimization

### Bundle Analysis and Monitoring

Install bundle analyzer:

```bash
pnpm add -D @next/bundle-analyzer
```

Update `next.config.js`:

```javascript
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true'
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    // your existing config
};

module.exports = withBundleAnalyzer(nextConfig);
```

Run with analysis:

```bash
ANALYZE=true pnpm build
```

### Image Optimization Best Practices

- Use Next.js `<Image>` component with appropriate `sizes` and `priority`
- Implement responsive image strategies
- Consider using a CDN like Cloudinary or Imgix for advanced transformations

## Deployment Options

### Vercel (Recommended)

```bash
pnpm add -g vercel
vercel
```

### Docker for Custom Deployments

Create a `Dockerfile`:

```Dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Create a `docker-compose.yml` file:

```yaml
version: '3'

services:
    web:
        build: .
        ports:
            - '3000:3000'
        environment:
            - DATABASE_URL=your_db_url
            - NEXTAUTH_URL=http://localhost:3000
            - NEXTAUTH_SECRET=your_nextauth_secret
            # Add other environment variables
```

## Security Enhancements

### Content Security Policy

Create or update `src/app/layout.tsx` with a CSP:

```typescript
export const metadata = {
    // existing metadata
    metadataBase: new URL('https://your-domain.com')
};

// Add CSP headers
export async function generateMetadata() {
    return {
        // This adds security headers including Content-Security-Policy
        headers: {
            'Content-Security-Policy': `
        default-src 'self';
        script-src 'self' 'unsafe-eval' 'unsafe-inline';
        style-src 'self' 'unsafe-inline';
        img-src 'self' blob: data:;
        font-src 'self';
        object-src 'none';
        base-uri 'self';
        form-action 'self';
        frame-ancestors 'none';
        block-all-mixed-content;
        upgrade-insecure-requests;
      `
                .replace(/\s{2,}/g, ' ')
                .trim()
        }
    };
}
```

### Rate Limiting

Install rate limiting middleware:

```bash
pnpm add @upstash/ratelimit @upstash/redis
```

Create a rate limiter in `/src/app/api/[...path]/route.ts`:

```typescript
import { NextResponse } from 'next/server';

import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

// Create a rate limiter that allows 10 requests per 10 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, '10 s')
});

export async function GET(request: Request) {
    const ip = request.headers.get('x-forwarded-for') || '127.0.0.1';
    const { success, limit, reset, remaining } = await ratelimit.limit(ip);

    if (!success) {
        return new NextResponse('Too Many Requests', {
            status: 429,
            headers: {
                'X-RateLimit-Limit': limit.toString(),
                'X-RateLimit-Remaining': remaining.toString(),
                'X-RateLimit-Reset': reset.toString()
            }
        });
    }

    // Your API handler logic here
}
```

## Internationalization

Install i18n packages:

```bash
pnpm add next-intl
```

Configure internationalization:

1. Create message files in `/messages/` directory
2. Set up Next.js middleware for locale detection
3. Implement i18n provider and hook

Example implementation:

```typescript
// src/i18n.ts
// middleware.ts
import createMiddleware from 'next-intl/middleware';
import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
    return {
        messages: (await import(`../messages/${locale}.json`)).default
    };
});

export default createMiddleware({
    locales: ['en', 'fr', 'es', 'de'],
    defaultLocale: 'en'
});

export const config = {
    matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

## Analytics and Monitoring

### Application Monitoring with OpenTelemetry

```bash
pnpm add @opentelemetry/sdk-node @opentelemetry/auto-instrumentations-node
```

Create an OpenTelemetry setup file:

```typescript
// src/lib/telemetry.ts
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { NodeSDK } from '@opentelemetry/sdk-node';

const exporter = new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces'
});

export const otelSDK = new NodeSDK({
    traceExporter: exporter,
    instrumentations: [getNodeAutoInstrumentations()]
});

// Start SDK in server-side code
if (process.env.NODE_ENV === 'production' && typeof window === 'undefined') {
    otelSDK.start();
}
```

### Real User Monitoring

Implement Web Vitals tracking:

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

---

This advanced guide provides a solid foundation for extending the Next.js 15 Enterprise Starter Template with additional features to meet the requirements of your project. Each section can be expanded or tailored based on your specific needs.
