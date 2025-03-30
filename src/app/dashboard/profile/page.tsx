'use client';

import { UserProfile } from '@clerk/nextjs';

export const metadata = {
    title: 'Profile'
};

export default function ProfilePage() {
    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-3xl font-bold tracking-tight'>Profile</h2>
                <p className='text-muted-foreground'>Manage your profile information and account settings.</p>
            </div>

            <div className='flex justify-center'>
                <UserProfile
                    appearance={{
                        elements: {
                            rootBox: 'w-full max-w-2xl',
                            card: 'rounded-lg border shadow-sm p-6',
                            navbar: 'mb-6',
                            navbarButton: 'text-sm font-medium',
                            pageScrollBox: 'p-0'
                        }
                    }}
                    path='/dashboard/profile'
                />
            </div>
        </div>
    );
}
