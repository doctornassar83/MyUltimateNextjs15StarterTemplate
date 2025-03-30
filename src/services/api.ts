import { config } from '@/config';
import type { ApiResponse, HttpMethod } from '@/types';

class ApiError extends Error {
    public status: number;
    public data: unknown;

    constructor(message: string, status: number, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.status = status;
        this.data = data;
    }
}

interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>;
    timeout?: number;
}

/**
 * API client for making HTTP requests
 */
class ApiClient {
    private baseUrl: string;
    private defaultTimeout: number;

    constructor(baseUrl: string, defaultTimeout = 10000) {
        this.baseUrl = baseUrl;
        this.defaultTimeout = defaultTimeout;
    }

    /**
     * Make a request to the API
     */
    public async request<T>(
        endpoint: string,
        method: HttpMethod,
        options: RequestOptions = {}
    ): Promise<ApiResponse<T>> {
        const { params, timeout = this.defaultTimeout, ...init } = options;
        const url = this.buildUrl(endpoint, params);

        // Abort controller for timeout handling
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    ...init.headers
                },
                credentials: 'include',
                signal: controller.signal,
                ...init
            });

            clearTimeout(timeoutId);

            // Parse response body
            const data = await this.parseResponseData(response);

            // Handle error responses
            if (!response.ok) {
                throw new ApiError(data?.message || response.statusText, response.status, data);
            }

            return data as ApiResponse<T>;
        } catch (error) {
            clearTimeout(timeoutId);

            if (error instanceof ApiError) {
                throw error;
            }

            if (error instanceof DOMException && error.name === 'AbortError') {
                throw new ApiError('Request timeout', 408);
            }

            throw new ApiError(error instanceof Error ? error.message : 'Unknown error', 500);
        }
    }

    /**
     * Parse response data based on content type
     */
    private async parseResponseData(response: Response): Promise<unknown> {
        const contentType = response.headers.get('Content-Type') || '';

        if (contentType.includes('application/json')) {
            return await response.json();
        }

        if (contentType.includes('text/')) {
            return await response.text();
        }

        return null;
    }

    /**
     * Build URL with query parameters
     */
    private buildUrl(endpoint: string, params?: Record<string, string | number | boolean | undefined>): string {
        const url = new URL(endpoint.startsWith('http') ? endpoint : `${this.baseUrl}${endpoint}`);

        if (params) {
            for (const [key, value] of Object.entries(params)) {
                if (value !== undefined) {
                    url.searchParams.append(key, String(value));
                }
            }
        }

        return url.toString();
    }

    /**
     * HTTP methods
     */
    public async get<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, 'GET', options);
    }

    public async post<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, 'POST', {
            ...options,
            body: data ? JSON.stringify(data) : undefined
        });
    }

    public async put<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, 'PUT', {
            ...options,
            body: data ? JSON.stringify(data) : undefined
        });
    }

    public async patch<T>(endpoint: string, data?: unknown, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, 'PATCH', {
            ...options,
            body: data ? JSON.stringify(data) : undefined
        });
    }

    public async delete<T>(endpoint: string, options?: RequestOptions): Promise<ApiResponse<T>> {
        return this.request<T>(endpoint, 'DELETE', options);
    }
}

/**
 * API client instance
 */
export const apiClient = new ApiClient(config.api.baseUrl, config.api.timeout);

export { ApiError };
