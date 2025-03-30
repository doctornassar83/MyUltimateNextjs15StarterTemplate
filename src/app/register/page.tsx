'use client';

import type React from 'react';
import { useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/context/auth-context';

export default function RegisterPage() {
    const router = useRouter();
    const { register, isDemoMode, enableDemoMode } = useAuth();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        // Form validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters');
            return;
        }

        setLoading(true);

        try {
            const success = await register({
                name,
                email,
                password
            });

            if (success) {
                router.push('/dashboard');
            } else {
                setError('Registration failed. Please try again.');
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
                        <p className='mt-1'>You can proceed to the dashboard or continue registration.</p>
                    </div>
                )}

                <div className='text-center'>
                    <h1 className='text-3xl font-extrabold'>Create an account</h1>
                    <p className='text-muted-foreground mt-2 text-sm'>Sign up to get started</p>
                </div>

                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    {error && (
                        <div className='rounded-md bg-red-50 p-4 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400'>
                            {error}
                        </div>
                    )}

                    <div className='space-y-4'>
                        <div>
                            <label htmlFor='name' className='block text-sm font-medium'>
                                Full Name
                            </label>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                autoComplete='name'
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='border-input bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none'
                                placeholder='John Doe'
                            />
                        </div>

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
                            <label htmlFor='password' className='block text-sm font-medium'>
                                Password
                            </label>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                autoComplete='new-password'
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className='border-input bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none'
                                placeholder='••••••••'
                            />
                            <p className='text-muted-foreground mt-1 text-xs'>Must be at least 8 characters</p>
                        </div>

                        <div>
                            <label htmlFor='confirmPassword' className='block text-sm font-medium'>
                                Confirm Password
                            </label>
                            <input
                                id='confirmPassword'
                                name='confirmPassword'
                                type='password'
                                autoComplete='new-password'
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className='border-input bg-background focus:border-primary focus:ring-primary/20 mt-1 block w-full rounded-md border px-4 py-2 text-sm focus:ring-2 focus:outline-none'
                                placeholder='••••••••'
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type='submit'
                            disabled={loading}
                            className='bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70'>
                            {loading ? 'Creating account...' : 'Create account'}
                        </button>
                    </div>
                </form>

                <div className='relative flex items-center justify-center'>
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
                        {isDemoMode ? '✓ Demo Mode Active' : 'Enter Demo Mode (No Sign-up Required)'}
                    </button>

                    {isDemoMode && (
                        <div className='mt-4 flex justify-center'>
                            <Link
                                href='/dashboard'
                                className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-6 py-2 text-sm font-medium'>
                                Go to Dashboard
                            </Link>
                        </div>
                    )}
                </div>

                <div className='mt-6 text-center text-sm'>
                    <p>
                        Already have an account?{' '}
                        <Link href='/login' className='text-primary hover:underline'>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
