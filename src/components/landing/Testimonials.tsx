'use client';

import { Users } from 'lucide-react';

export interface TestimonialsProps {
    isVisible: boolean;
}

interface Testimonial {
    id: string;
    quote: string;
    author: string;
    role: string;
    avatar: string;
}

export function Testimonials({ isVisible }: TestimonialsProps) {
    const testimonials: Testimonial[] = [
        {
            id: 'testimonial-1',
            quote: "This template saved us weeks of setup and configuration time. The code quality is excellent and it's a joy to work with.",
            author: 'Sarah Johnson',
            role: 'CTO at TechStart',
            avatar: '/images/avatar-1.png'
        },
        {
            id: 'testimonial-2',
            quote: "The best Next.js starter I've used. The organization and component structure make it easy to build complex applications quickly.",
            author: 'Michael Chen',
            role: 'Lead Developer at WebFlow',
            avatar: '/images/avatar-2.png'
        },
        {
            id: 'testimonial-3',
            quote: 'Fantastic DX and very well documented. I was able to understand the codebase in just a few hours and start contributing.',
            author: 'Jessica Williams',
            role: 'Frontend Engineer',
            avatar: '/images/avatar-3.png'
        }
    ];

    return (
        <section className='relative overflow-hidden px-4 py-32'>
            <div className='absolute top-0 right-0 translate-x-1/4 -translate-y-1/4'>
                <div className='bg-primary/5 animate-spin-slow h-[600px] w-[600px] rounded-full opacity-70 blur-3xl' />
            </div>
            <div className='relative z-10 container mx-auto'>
                <div
                    className={`mb-16 text-center transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                    <h2 className='text-3xl font-bold md:text-4xl'>What People Say</h2>
                    <p className='text-muted-foreground mx-auto mt-4 max-w-2xl'>
                        Trusted by developers and companies worldwide
                    </p>
                </div>

                <div className='grid gap-8 md:grid-cols-3'>
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={testimonial.id}
                            className={`bg-background rounded-xl border p-6 shadow-sm transition-all duration-500 hover:shadow-md ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'}`}
                            style={{ transitionDelay: `${150 * index}ms` }}>
                            <div className='mb-4 flex items-center gap-4'>
                                <div className='bg-primary/10 flex h-12 w-12 items-center justify-center rounded-full'>
                                    <Users size={20} className='text-primary' />
                                </div>
                                <div>
                                    <h4 className='font-semibold'>{testimonial.author}</h4>
                                    <p className='text-muted-foreground text-sm'>{testimonial.role}</p>
                                </div>
                            </div>
                            <p className='italic'>{testimonial.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
