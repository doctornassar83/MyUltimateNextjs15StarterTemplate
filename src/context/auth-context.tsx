import type React from 'react';
import { createContext, useContext, useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { apiClient } from '@/services/api';
import type { AuthState, User } from '@/types';
import { handleApiError } from '@/utils/error-handler';

// -------------------------------------------------------------
// DEMO AUTHENTICATION CONSTANTS & TYPES
// -------------------------------------------------------------
const DEMO_AUTH_STORAGE_KEY = 'demo_auth_enabled';
const DEMO_USER_ID = 'demo-user-123';

// Demo user that will be used when in demo mode
const DEMO_USER: User = {
    id: DEMO_USER_ID,
    email: 'demo@example.com',
    name: 'Demo User',
    role: 'user',
    isActive: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};

// Demo mode indicator in UI
interface DemoModeState {
    isDemoMode: boolean;
    enableDemoMode: () => void;
    disableDemoMode: () => void;
}

// -------------------------------------------------------------
// AUTHENTICATION CONTEXT TYPES
// -------------------------------------------------------------
interface AuthContextType extends AuthState, DemoModeState {
    login: (email: string, password: string) => Promise<boolean>;
    register: (userData: RegisterData) => Promise<boolean>;
    logout: () => Promise<void>;
    refreshUser: () => Promise<void>;
}

interface RegisterData {
    email: string;
    password: string;
    name: string;
}

// Default context state
const defaultState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Auth Provider component
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [state, setState] = useState<AuthState>(defaultState);
    const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
    const router = useRouter();

    // Check authentication status on mount
    useEffect(() => {
        const checkAuth = async () => {
            // First check if demo mode is enabled
            const demoAuth = localStorage.getItem(DEMO_AUTH_STORAGE_KEY);
            if (demoAuth === 'true') {
                setIsDemoMode(true);
                setState({
                    user: DEMO_USER,
                    isAuthenticated: true,
                    isLoading: false
                });
                return;
            }

            // Otherwise, try normal authentication
            await refreshUser();
        };

        checkAuth();
    }, []);

    /**
     * Fetch current user data
     */
    const refreshUser = async (): Promise<void> => {
        // Skip API call if in demo mode
        if (isDemoMode) {
            setState({
                user: DEMO_USER,
                isAuthenticated: true,
                isLoading: false
            });
            return;
        }

        setState((prev) => ({ ...prev, isLoading: true }));

        try {
            const response = await apiClient.get<User>('/auth/me');

            if (response.success && response.data) {
                setState({
                    user: response.data,
                    isAuthenticated: true,
                    isLoading: false
                });
            } else {
                // Not authenticated
                setState({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false
                });
            }
        } catch (error) {
            // Error handling
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
        }
    };

    /**
     * User login
     */
    const login = async (email: string, password: string): Promise<boolean> => {
        // If in demo mode, simulate successful login
        if (isDemoMode) {
            setState({
                user: DEMO_USER,
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        }

        setState((prev) => ({ ...prev, isLoading: true }));

        const result = await handleApiError(
            apiClient.post<{ user: User; token: string }>('/auth/login', {
                email,
                password
            }),
            {
                rethrow: false,
                context: { email }
            }
        );

        if (result?.success && result.data) {
            setState({
                user: result.data.user,
                isAuthenticated: true,
                isLoading: false
            });

            return true;
        }

        setState((prev) => ({ ...prev, isLoading: false }));
        return false;
    };

    /**
     * User registration
     */
    const register = async (userData: RegisterData): Promise<boolean> => {
        // If in demo mode, simulate successful registration
        if (isDemoMode) {
            setState({
                user: {
                    ...DEMO_USER,
                    email: userData.email,
                    name: userData.name
                },
                isAuthenticated: true,
                isLoading: false
            });
            return true;
        }

        setState((prev) => ({ ...prev, isLoading: true }));

        const result = await handleApiError(apiClient.post<{ user: User; token: string }>('/auth/register', userData), {
            rethrow: false,
            context: { email: userData.email }
        });

        if (result?.success && result.data) {
            setState({
                user: result.data.user,
                isAuthenticated: true,
                isLoading: false
            });

            return true;
        }

        setState((prev) => ({ ...prev, isLoading: false }));
        return false;
    };

    /**
     * User logout
     */
    const logout = async (): Promise<void> => {
        // If in demo mode, just clear demo state
        if (isDemoMode) {
            disableDemoMode();
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });
            router.push('/login');
            return;
        }

        try {
            await apiClient.post('/auth/logout');
        } finally {
            setState({
                user: null,
                isAuthenticated: false,
                isLoading: false
            });

            router.push('/login');
        }
    };

    /**
     * Enable demo mode
     */
    const enableDemoMode = (): void => {
        setIsDemoMode(true);

        setState({
            user: DEMO_USER,
            isAuthenticated: true,
            isLoading: false
        });

        // Save demo auth status to localStorage
        localStorage.setItem(DEMO_AUTH_STORAGE_KEY, 'true');

        // Redirect to dashboard
        router.push('/dashboard');
    };

    /**
     * Disable demo mode
     */
    const disableDemoMode = (): void => {
        setIsDemoMode(false);
        localStorage.removeItem(DEMO_AUTH_STORAGE_KEY);
    };

    const value = {
        ...state,
        isDemoMode,
        enableDemoMode,
        disableDemoMode,
        login,
        register,
        logout,
        refreshUser
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Auth context hook
 */
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

/**
 * Auth protection hook for routes
 */
export function useAuthProtection(redirectTo = '/login'): void {
    const { isAuthenticated, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push(redirectTo);
        }
    }, [isAuthenticated, isLoading, redirectTo, router]);
}
