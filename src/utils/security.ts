/**
 * Security utility functions to prevent common web vulnerabilities
 *
 * Note: This project uses Clerk for authentication and security (see src/middleware.ts).
 * These utilities provide additional security measures that can be used alongside Clerk
 * for content sanitization, URL validation, and other security concerns.
 */

/**
 * Sanitize HTML to prevent XSS attacks
 * This is a simple implementation; consider using DOMPurify in production
 */
export function sanitizeHtml(html: string): string {
    return html
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

/**
 * Generate a nonce for Content-Security-Policy
 */
export function generateNonce(): string {
    const randomBytes = new Uint8Array(16);

    if (typeof window !== 'undefined' && window.crypto) {
        window.crypto.getRandomValues(randomBytes);
    }

    return Array.from(randomBytes)
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
}

/**
 * Check if an URL is from the same origin
 * Useful for preventing open redirects
 */
export function isSameOrigin(url: string): boolean {
    try {
        const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
        const targetOrigin = new URL(url, currentOrigin).origin;
        return currentOrigin === targetOrigin;
    } catch (error) {
        return false;
    }
}

/**
 * Validate a safe redirect URL to prevent open redirect vulnerabilities
 */
export function validateRedirect(url: string | null | undefined): string {
    // Default redirect path
    const defaultPath = '/';

    // If URL is missing, return default
    if (!url) return defaultPath;

    try {
        // Check if this is a relative path
        if (url.startsWith('/') && !url.startsWith('//')) {
            // Only allow relative paths that don't try to navigate upwards
            if (!url.includes('..')) {
                return url;
            }
        } else {
            // For absolute URLs, check if it's the same origin
            if (isSameOrigin(url)) {
                return url;
            }
        }
    } catch (error) {
        // In case of parsing errors, return default
        console.warn(`Invalid redirect URL: ${url}`);
    }

    return defaultPath;
}

/**
 * Create a Content Security Policy header value
 */
export function generateCSP(nonce: string): string {
    return `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic';
    style-src 'self' 'nonce-${nonce}';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `
        .replace(/\s+/g, ' ')
        .trim();
}
