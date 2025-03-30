'use client';

import type React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/auth-context';
import { validateRedirect } from '@/utils/security';

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { login, enableDemoMode, isDemoMode } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const callbackUrl = validateRedirect(searchParams.get('callbackUrl') || '/dashboard');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const success = await login(email, password);

            if (success) {
                router.push(callbackUrl);
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='flex min-h-screen flex-col items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md space-y-8'>
                {isDemoMode && (
                    <div className='rounded-md bg-green-50 p-4 text-sm text-green-700 dark:bg-green-900/30 dark:text-green-400'>
                        <div className='font-bold'>🔓 Demo Mode Active</div>
                        <p>You are currently in demo mode with simulated authentication.</p>
                    </div>
                )}

                <div className='text-center'>
                    <h1 className='text-3xl font-extrabold'>Welcome back</h1>
                    <p className='text-muted-foreground mt-2 text-sm'>Sign in to your account</p>
                </div>

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {error && (
                        <div className='rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400'>
                            {error}
                        </div>
                    )}

                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='email' className='block text-sm font-medium'>
                                Email address
                            </label>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='border-input bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none'
                                placeholder='name@example.com'
                            />
                        </div>

                        <div>
                            <div className='flex items-center justify-between'>
                                <label htmlFor='password' className='block text-sm font-medium'>
                                    Password
                                </label>
                                <Link href='/forgot-password' className='text-primary text-xs hover:underline'>
                                    Forgot password?
                                </Link>
                            </div>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-input bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            disabled={loading || isDemoMode}
                            className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70'>
                            {isDemoMode ? 'Demo Mode Active' : loading ? 'Signing in...' : 'Sign in'}
                        </button>
                    </div>
                </form>

                <div className='relative mt-6 flex items-center justify-center'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='border-muted w-full border-t' />
                    </div>
                    <div className='bg-background text-muted-foreground relative px-4 text-sm'>Or</div>
                </div>

                <div>
                    <button
                        type='button'
                        disabled={isDemoMode}
                        onClick={enableDemoMode}
                        className={`focus:ring-primary/20 flex w-full justify-center rounded-md border px-4 py-2 text-sm font-semibold focus:ring-2 focus:outline-none ${
                            isDemoMode
                                ? 'cursor-not-allowed bg-green-50 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                                : 'bg-orange-50 text-orange-600 hover:bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:hover:bg-orange-900/30'
                        }`}>
                        {isDemoMode ? '✓ Demo Mode Active' : 'Enter Demo Mode (No Sign-in Required)'}
                    </button>

                    {isDemoMode && (
                        <p className='text-muted-foreground mt-2 text-center text-xs'>
                            Using simulated authentication for demonstration purposes.
                            <br />
                            No real API calls will be made in demo mode.
                        </p>
                    )}
                </div>

                <div className='mt-6 text-center text-sm'>
                    <p>
                        Don&apos;t have an account?{' '}
                        <Link href='/register' className='text-primary hover:underline'>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
