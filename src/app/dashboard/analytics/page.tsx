'use client';

import { useEffect, useState } from 'react';

import { Activity, ArrowDownRight, ArrowUpRight, CreditCard, DollarSign, Users } from 'lucide-react';
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

// Sample data - in a real app, this would come from an API
const pageViewData = [
    { name: 'Jan', views: 4000 },
    { name: 'Feb', views: 3000 },
    { name: 'Mar', views: 5000 },
    { name: 'Apr', views: 4500 },
    { name: 'May', views: 6000 },
    { name: 'Jun', views: 5500 },
    { name: 'Jul', views: 7000 }
];

const conversionData = [
    { name: 'Jan', rate: 1.8 },
    { name: 'Feb', rate: 2.3 },
    { name: 'Mar', rate: 2.5 },
    { name: 'Apr', rate: 2.7 },
    { name: 'May', rate: 3.1 },
    { name: 'Jun', rate: 3.2 },
    { name: 'Jul', rate: 3.5 }
];

const deviceData = [
    { name: 'Desktop', value: 45 },
    { name: 'Mobile', value: 40 },
    { name: 'Tablet', value: 15 }
];

export default function AnalyticsPage() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className='space-y-8'>
            <div className='flex items-center justify-between'>
                <div>
                    <h2 className='text-3xl font-bold tracking-tight'>Analytics Dashboard</h2>
                    <p className='text-muted-foreground'>Monitor your key metrics and performance insights.</p>
                </div>
                <div className='flex items-center gap-2'>
                    <select className='bg-background rounded-md border px-3 py-1 text-sm'>
                        <option>Last 7 days</option>
                        <option>Last 30 days</option>
                        <option>Last 3 months</option>
                        <option>Last year</option>
                    </select>
                </div>
            </div>

            {/* Key Metrics */}
            <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4'>
                <MetricCard
                    title='Total Users'
                    value='23.4k'
                    change={+12}
                    icon={<Users className='h-5 w-5' />}
                    description='Total registered users'
                />
                <MetricCard
                    title='Page Views'
                    value='48.2k'
                    change={+24}
                    icon={<Activity className='h-5 w-5' />}
                    description='Total page views'
                />
                <MetricCard
                    title='Conversion Rate'
                    value='3.2%'
                    change={-0.4}
                    icon={<CreditCard className='h-5 w-5' />}
                    description='From visitors to sign ups'
                />
                <MetricCard
                    title='Revenue'
                    value='$12.5k'
                    change={+18}
                    icon={<DollarSign className='h-5 w-5' />}
                    description='Total monthly revenue'
                />
            </div>

            {/* Charts */}
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
                {/* Page Views Chart */}
                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h3 className='mb-4 text-lg font-semibold'>Page Views</h3>
                    {isClient && (
                        <ResponsiveContainer width='100%' height={300}>
                            <AreaChart data={pageViewData}>
                                <defs>
                                    <linearGradient id='colorViews' x1='0' y1='0' x2='0' y2='1'>
                                        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                                        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Area
                                    type='monotone'
                                    dataKey='views'
                                    stroke='#8884d8'
                                    fillOpacity={1}
                                    fill='url(#colorViews)'
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Conversion Rate Chart */}
                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h3 className='mb-4 text-lg font-semibold'>Conversion Rate (%)</h3>
                    {isClient && (
                        <ResponsiveContainer width='100%' height={300}>
                            <LineChart data={conversionData}>
                                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Line type='monotone' dataKey='rate' stroke='#82ca9d' strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    )}
                </div>
            </div>

            {/* Additional Analytics */}
            <div className='grid grid-cols-1 gap-6 lg:grid-cols-3'>
                {/* Device Distribution */}
                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h3 className='mb-4 text-lg font-semibold'>Device Distribution</h3>
                    {isClient && (
                        <ResponsiveContainer width='100%' height={250}>
                            <BarChart data={deviceData}>
                                <CartesianGrid strokeDasharray='3 3' vertical={false} />
                                <XAxis dataKey='name' />
                                <YAxis />
                                <Tooltip />
                                <Bar dataKey='value' fill='#8884d8' radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    )}
                </div>

                {/* Top Pages */}
                <div className='bg-card col-span-1 rounded-lg border p-6 shadow-sm lg:col-span-2'>
                    <h3 className='mb-4 text-lg font-semibold'>Top Pages</h3>
                    <div className='space-y-4'>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-medium'>/dashboard</span>
                                <span className='text-muted-foreground text-xs'>8.2k views</span>
                            </div>
                            <span className='text-primary text-sm'>32%</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-medium'>/dashboard/analytics</span>
                                <span className='text-muted-foreground text-xs'>6.4k views</span>
                            </div>
                            <span className='text-primary text-sm'>24%</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-medium'>/dashboard/settings</span>
                                <span className='text-muted-foreground text-xs'>4.3k views</span>
                            </div>
                            <span className='text-primary text-sm'>18%</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-medium'>/dashboard/todos</span>
                                <span className='text-muted-foreground text-xs'>3.8k views</span>
                            </div>
                            <span className='text-primary text-sm'>14%</span>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex flex-col'>
                                <span className='font-medium'>/dashboard/advanced-todo</span>
                                <span className='text-muted-foreground text-xs'>2.9k views</span>
                            </div>
                            <span className='text-primary text-sm'>12%</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function MetricCard({ title, value, change, icon, description }) {
    const isPositive = change >= 0;

    return (
        <div className='bg-card rounded-lg border p-6 shadow-sm'>
            <div className='flex items-start justify-between'>
                <div>
                    <p className='text-muted-foreground text-sm'>{title}</p>
                    <h4 className='mt-1 text-2xl font-bold'>{value}</h4>
                </div>
                <div className='bg-primary/10 text-primary rounded-full p-2'>{icon}</div>
            </div>
            <div className='mt-4 flex items-center'>
                <div className={`flex items-center text-xs ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                    {isPositive ? (
                        <ArrowUpRight className='mr-1 h-3 w-3' />
                    ) : (
                        <ArrowDownRight className='mr-1 h-3 w-3' />
                    )}
                    <span>{Math.abs(change)}%</span>
                </div>
                <span className='text-muted-foreground ml-2 text-xs'>vs previous period</span>
            </div>
            <p className='text-muted-foreground mt-2 text-xs'>{description}</p>
        </div>
    );
}
