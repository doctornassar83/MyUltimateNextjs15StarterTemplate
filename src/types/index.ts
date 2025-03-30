/**
 * Common type definitions for the application
 */

/**
 * HTTP methods
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

/**
 * API response wrapper
 */
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    error?: string;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    meta: PaginationMeta;
}

/**
 * Base entity interface
 */
export interface BaseEntity {
    id: string;
    createdAt: string;
    updatedAt: string;
}

/**
 * User roles
 */
export type UserRole = 'admin' | 'user' | 'editor' | 'viewer';

/**
 * User entity
 */
export interface User extends BaseEntity {
    email: string;
    name: string;
    role: UserRole;
    avatarUrl?: string;
    isActive: boolean;
}

/**
 * Auth context state
 */
export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

/**
 * Theme options
 */
export type Theme = 'light' | 'dark' | 'system';

/**
 * Route with metadata for navigation
 */
export interface AppRoute {
    path: string;
    label: string;
    icon?: string;
    requiredRoles?: UserRole[];
    children?: AppRoute[];
}

/**
 * Feature flag configuration
 */
export interface FeatureFlags {
    [key: string]: boolean;
}
