'use client';

import Link from 'next/link';

import { SignIn } from '@clerk/nextjs';

export default function LoginPage() {
    return (
        <div className='flex min-h-screen flex-col items-center justify-center px-4 py-12'>
            <div className='w-full max-w-md space-y-8'>
                <div className='text-center'>
                    <h1 className='text-3xl font-extrabold'>Welcome back</h1>
                    <p className='text-muted-foreground mt-2 text-sm'>Sign in to your account</p>
                </div>

                <div className='flex justify-center'>
                    <SignIn
                        appearance={{
                            elements: {
                                formButtonPrimary:
                                    'bg-primary text-primary-foreground hover:bg-primary/90 focus:ring-primary/20 flex w-full justify-center rounded-md px-4 py-2 text-sm font-semibold shadow-sm focus:ring-2 focus:outline-none',
                                card: 'bg-transparent border-0 shadow-none',
                                header: 'hidden',
                                footer: 'hidden'
                            }
                        }}
                        routing='path'
                        path='/login'
                        signUpUrl='/register'
                    />
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
