import { authMiddleware } from '@clerk/nextjs';

/**
 * Clerk authentication middleware
 * Protects routes and defines public routes that don't require authentication
 */
export default authMiddleware({
    publicRoutes: ['/', '/login', '/register', '/api/webhook/clerk', '/clerk-debug']
});

/**
 * Defines paths that should be handled by middleware
 */
export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
};
