import React from 'react';

import Link from 'next/link';

export const metadata = {
    title: 'Dashboard'
};

export default function DashboardPage() {
    return (
        <div className='space-y-6'>
            {/* Todo banner removed to avoid duplication with the one in layout */}

            <h2 className='text-3xl font-bold tracking-tight'>Dashboard</h2>

            <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
                {/* Stats Cards */}
                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-semibold'>Total Users</h3>
                        <p className='text-3xl font-bold'>12,345</p>
                        <p className='text-muted-foreground text-sm'>
                            <span className='text-green-500'>↑ 14%</span> from last month
                        </p>
                    </div>
                </div>

                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-semibold'>Revenue</h3>
                        <p className='text-3xl font-bold'>$56,789</p>
                        <p className='text-muted-foreground text-sm'>
                            <span className='text-green-500'>↑ 8%</span> from last month
                        </p>
                    </div>
                </div>

                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-semibold'>Active Users</h3>
                        <p className='text-3xl font-bold'>3,456</p>
                        <p className='text-muted-foreground text-sm'>
                            <span className='text-green-500'>↑ 12%</span> from last month
                        </p>
                    </div>
                </div>

                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <div className='flex flex-col gap-2'>
                        <h3 className='text-xl font-semibold'>Conversion Rate</h3>
                        <p className='text-3xl font-bold'>23.5%</p>
                        <p className='text-muted-foreground text-sm'>
                            <span className='text-red-500'>↓ 3%</span> from last month
                        </p>
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className='rounded-lg border shadow-sm'>
                <div className='p-6'>
                    <h3 className='text-xl font-bold'>Recent Activity</h3>
                    <p className='text-muted-foreground text-sm'>Latest user actions and system events</p>
                </div>
                <div className='border-t'>
                    <div className='divide-y'>
                        {[
                            { id: 'act-1', time: '2 minutes ago', user: 'John Doe' },
                            { id: 'act-2', time: '1 hour ago', user: 'Jane Smith' },
                            { id: 'act-3', time: '3 hours ago', user: 'Robert Johnson' },
                            { id: 'act-4', time: '5 hours ago', user: 'Emily Davis' },
                            { id: 'act-5', time: '8 hours ago', user: 'Michael Wilson' }
                        ].map((activity) => (
                            <div key={activity.id} className='flex items-center p-4'>
                                <div className='flex-1'>
                                    <p className='text-sm font-medium'>New user registered</p>
                                    <p className='text-muted-foreground text-xs'>
                                        {activity.user} created a new account
                                    </p>
                                </div>
                                <div className='text-muted-foreground text-xs'>{activity.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
