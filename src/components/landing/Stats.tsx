'use client';

import { BarChart3, Code, Laptop, Star, Users } from 'lucide-react';

export interface StatsProps {
    isVisible: boolean;
}

interface Stat {
    id: string;
    label: string;
    value: string;
    icon: React.ReactNode;
}

export function Stats({ isVisible }: StatsProps) {
    const stats: Stat[] = [
        { id: 'downloads', label: 'Downloads', value: '20K+', icon: <Laptop className='text-primary h-5 w-5' /> },
        { id: 'stars', label: 'GitHub Stars', value: '2.5K+', icon: <Star className='h-5 w-5 text-yellow-500' /> },
        { id: 'projects', label: 'Projects Built', value: '1K+', icon: <Code className='h-5 w-5 text-blue-500' /> },
        { id: 'companies', label: 'Companies Using', value: '500+', icon: <Users className='h-5 w-5 text-green-500' /> }
    ];

    return (
        <section className='bg-primary/5 px-4 py-24'>
            <div className='container mx-auto'>
                <div
                    className={`grid grid-cols-2 gap-8 transition-all duration-1000 md:grid-cols-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className='flex flex-col items-center text-center'
                            style={{ transitionDelay: `${100 * index}ms` }}>
                            <div className='relative mb-4'>
                                <div className='bg-primary/10 animate-pulse-scale absolute inset-0 rounded-full blur-md' />
                                <div className='bg-background relative z-10 rounded-full border p-4'>{stat.icon}</div>
                            </div>
                            <h3 className='text-3xl font-bold'>{stat.value}</h3>
                            <p className='text-muted-foreground'>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
