'use client';

import { useEffect, useState } from 'react';

import { AnimatedCounter } from '@/components/ui';

import { Code, Laptop, Star, Users } from 'lucide-react';

export interface StatsProps {
    isVisible: boolean;
}

interface Stat {
    id: string;
    label: string;
    value: string;
    numericValue: number;
    suffix: string;
    icon: React.ReactNode;
    decimals?: number;
    color?: string;
}

export function Stats({ isVisible }: StatsProps) {
    const stats: Stat[] = [
        {
            id: 'downloads',
            label: 'Downloads',
            value: '20K+',
            numericValue: 20000,
            suffix: 'K+',
            color: 'from-primary/20 to-primary/40',
            icon: <Laptop className='text-primary h-5 w-5' />
        },
        {
            id: 'stars',
            label: 'GitHub Stars',
            value: '2.5K+',
            numericValue: 2500,
            suffix: 'K+',
            decimals: 1,
            color: 'from-yellow-400/20 to-yellow-500/40',
            icon: <Star className='h-5 w-5 text-yellow-500' />
        },
        {
            id: 'projects',
            label: 'Projects Built',
            value: '1K+',
            numericValue: 1000,
            suffix: 'K+',
            color: 'from-blue-400/20 to-blue-500/40',
            icon: <Code className='h-5 w-5 text-blue-500' />
        },
        {
            id: 'companies',
            label: 'Companies Using',
            value: '500+',
            numericValue: 500,
            suffix: '+',
            color: 'from-green-400/20 to-green-500/40',
            icon: <Users className='h-5 w-5 text-green-500' />
        }
    ];

    return (
        <section className='bg-background/50 border-y px-4 py-24 backdrop-blur-sm'>
            <div className='container mx-auto'>
                <div
                    className={`grid grid-cols-2 gap-8 transition-all duration-1000 md:grid-cols-4 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    {stats.map((stat, index) => (
                        <div
                            key={stat.id}
                            className='flex flex-col items-center text-center'
                            style={{ transitionDelay: `${100 * index}ms` }}>
                            <div className='group relative mb-4'>
                                <div
                                    className={`animate-pulse-scale absolute inset-0 rounded-full bg-gradient-to-b blur-md ${stat.color || 'from-primary/20 to-primary/40'}`}
                                />
                                <div className='bg-background relative z-10 rounded-full border bg-gradient-to-br from-white/20 via-transparent to-black/10 p-4 transition-all duration-300 group-hover:scale-110 dark:from-white/10 dark:to-black/20'>
                                    {stat.icon}
                                </div>
                            </div>
                            <h3 className='text-foreground text-4xl font-bold transition-all duration-500'>
                                <AnimatedCounter
                                    end={stat.numericValue}
                                    suffix={stat.suffix}
                                    isVisible={isVisible}
                                    decimals={stat.decimals}
                                    duration={2000 + index * 200} // Stagger the animations
                                />
                            </h3>
                            <p className='text-muted-foreground mt-1'>{stat.label}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
