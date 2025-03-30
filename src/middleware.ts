/**
 * Next.js Middleware using Clerk Authentication
 *
 * This middleware protects routes and handles authentication with Clerk.
 * It runs on all non-static routes as defined in the matcher configuration.
 *
 * - Public routes like the homepage and login/register pages are accessible to everyone
 * - Protected routes like /dashboard require authentication
 * - Authenticated users are redirected away from login/register pages
 */
import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)'
    ]
};
