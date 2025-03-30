import { useCallback, useEffect, useRef, useState } from 'react';

type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ApiOptions<T> {
    method?: ApiMethod;
    body?: T;
    headers?: Record<string, string>;
}

interface ApiState<T> {
    data: T | null;
    isLoading: boolean;
    error: Error | null;
}

/**
 * Custom hook for API calls
 *
 * @param url The API endpoint to call
 * @param options API options including method, body, headers
 * @returns An object with data, isLoading, error, and refetch function
 */
export function useApi<T, U = unknown>(url: string, options?: ApiOptions<U>) {
    const [state, setState] = useState<ApiState<T>>({
        data: null,
        isLoading: true,
        error: null
    });

    // Use refs to prevent infinite re-renders with objects
    const urlRef = useRef(url);
    const optionsRef = useRef(options);

    // Update refs when props change
    useEffect(() => {
        urlRef.current = url;
        optionsRef.current = options;
    }, [url, options]);

    const fetchData = useCallback(async () => {
        setState((prev) => ({ ...prev, isLoading: true, error: null }));

        try {
            const currentUrl = urlRef.current;
            const currentOptions = optionsRef.current;

            const fetchOptions: RequestInit = {
                method: currentOptions?.method || 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...currentOptions?.headers
                },
                ...(currentOptions?.body ? { body: JSON.stringify(currentOptions.body) } : {})
            };

            const response = await fetch(currentUrl, fetchOptions);

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.error || `API call failed with status ${response.status}`);
            }

            const data = await response.json();
            setState({ data, isLoading: false, error: null });
            return data;
        } catch (error) {
            setState((prev) => ({
                ...prev,
                isLoading: false,
                error: error instanceof Error ? error : new Error('Unknown error occurred')
            }));
            throw error;
        }
    }, []); // No dependencies needed since we're using refs

    // Only run the effect once when the component mounts
    useEffect(() => {
        fetchData().catch((error) => {
            console.error('Error fetching data:', error);
        });
    }, [fetchData]);

    return {
        ...state,
        refetch: fetchData
    };
}

/**
 * Simple wrapper for GET requests
 */
export function useGet<T>(url: string, headers?: Record<string, string>) {
    return useApi<T>(url, { method: 'GET', headers });
}

/**
 * Simple wrapper for POST requests
 */
export function usePost<T, U>(url: string, body: U, headers?: Record<string, string>) {
    return useApi<T, U>(url, { method: 'POST', body, headers });
}

/**
 * Utility function for one-time API calls
 */
export async function apiCall<T, U = unknown>(url: string, options?: ApiOptions<U>): Promise<T> {
    const fetchOptions: RequestInit = {
        method: options?.method || 'GET',
        headers: {
            'Content-Type': 'application/json',
            ...options?.headers
        },
        ...(options?.body ? { body: JSON.stringify(options.body) } : {})
    };

    const response = await fetch(url, fetchOptions);

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.error || `API call failed with status ${response.status}`);
    }

    return response.json();
}
