import { ApiError } from '@/services/api';

export interface ErrorDetails {
    message: string;
    code?: string;
    status?: number;
    isNetworkError?: boolean;
    isAuthError?: boolean;
    isValidationError?: boolean;
    validationErrors?: Record<string, string[]>;
}

/**
 * Parse API error into a standardized format
 */
export function parseApiError(error: unknown): ErrorDetails {
    // API errors
    if (error instanceof ApiError) {
        const isAuthError = error.status === 401 || error.status === 403;
        const isValidationError = error.status === 422 || error.status === 400;

        return {
            message: error.message,
            status: error.status,
            isAuthError,
            isValidationError,
            validationErrors:
                isValidationError && typeof error.data === 'object' && error.data
                    ? ((error.data as Record<string, unknown>).errors as Record<string, string[]>)
                    : undefined
        };
    }

    // Network errors
    if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
            message: 'Network error. Please check your connection and try again.',
            isNetworkError: true
        };
    }

    // Default error handling
    return {
        message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
}

/**
 * Log error to monitoring service
 */
export function logError(error: unknown, context?: Record<string, unknown>): void {
    const errorDetails = parseApiError(error);

    // Skip logging for certain errors in development
    if (process.env.NODE_ENV === 'development') {
        if (errorDetails.isAuthError || errorDetails.isValidationError) {
            return;
        }
    }

    console.error('[Error]', errorDetails, context);

    // TODO: Send to error monitoring service like Sentry
    // if (typeof window !== 'undefined' && window.Sentry) {
    //   window.Sentry.captureException(error, { extra: { ...context, ...errorDetails } });
    // }
}

/**
 * Handle API errors in a consistent way
 */
export async function handleApiError<T>(
    promise: Promise<T>,
    options: {
        onError?: (error: ErrorDetails) => void;
        fallbackValue?: T;
        rethrow?: boolean;
        context?: Record<string, unknown>;
    } = {}
): Promise<T | undefined> {
    const { onError, fallbackValue, rethrow = false, context } = options;

    try {
        return await promise;
    } catch (error) {
        const errorDetails = parseApiError(error);

        // Log the error
        logError(error, context);

        // Call error callback if provided
        if (onError) {
            onError(errorDetails);
        }

        // Re-throw or return fallback
        if (rethrow) {
            throw error;
        }

        return fallbackValue;
    }
}
