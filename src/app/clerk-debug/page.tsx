'use client';

import { useUser } from '@clerk/nextjs';

export default function ClerkDebugPage() {
    const { isLoaded, isSignedIn, user } = useUser();

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className='container mx-auto p-8'>
            <h1 className='mb-4 text-2xl font-bold'>Clerk Debug Information</h1>

            <div className='mb-4 rounded border bg-gray-50 p-4 dark:bg-gray-800'>
                <h2 className='mb-2 font-semibold'>Environment Variables Check</h2>
                <p>
                    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:{' '}
                    {process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? '✅ Set' : '❌ Not set'}
                </p>
                <p className='mt-2 text-xs text-gray-500'>
                    Note: CLERK_SECRET_KEY is server-side only and won't be visible here
                </p>
            </div>

            <div className='mb-4 rounded border bg-gray-50 p-4 dark:bg-gray-800'>
                <h2 className='mb-2 font-semibold'>Authentication Status</h2>
                <p>Is user signed in: {isSignedIn ? '✅ Yes' : '❌ No'}</p>
            </div>

            {isSignedIn && user && (
                <div className='mb-4 rounded border bg-gray-50 p-4 dark:bg-gray-800'>
                    <h2 className='mb-2 font-semibold'>User Information</h2>
                    <pre className='overflow-auto rounded bg-gray-100 p-2 text-xs dark:bg-gray-900'>
                        {JSON.stringify(
                            {
                                id: user.id,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                emailAddresses: user.emailAddresses,
                                imageUrl: user.imageUrl
                            },
                            null,
                            2
                        )}
                    </pre>
                </div>
            )}

            <div className='flex space-x-4'>
                <a href='/' className='text-blue-500 hover:underline'>
                    Home
                </a>
                <a href='/login' className='text-blue-500 hover:underline'>
                    Login
                </a>
                <a href='/dashboard' className='text-blue-500 hover:underline'>
                    Dashboard
                </a>
            </div>
        </div>
    );
}
