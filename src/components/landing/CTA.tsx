import Link from 'next/link';

import { ArrowRight, Github } from 'lucide-react';

export function CTA() {
    return (
        <section className='from-primary/10 bg-gradient-to-r to-purple-600/10 px-4 py-20'>
            <div className='container mx-auto text-center'>
                <h2 className='mb-6 text-3xl font-bold md:text-4xl'>Ready to Start Building?</h2>
                <p className='text-muted-foreground mx-auto mb-10 max-w-xl'>
                    Join thousands of developers who are building amazing applications with our Next.js 15 Enterprise
                    Starter Template
                </p>
                <div className='flex flex-col justify-center gap-4 sm:flex-row'>
                    <Link
                        href='/register'
                        className='group relative inline-flex min-w-[160px] items-center justify-center overflow-visible rounded-md bg-gradient-to-r from-blue-500 to-purple-500 px-8 py-3 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl'>
                        <span className='relative z-10 flex items-center whitespace-nowrap'>
                            Get Started
                            <ArrowRight size={16} className='ml-2 transition-transform group-hover:translate-x-1' />
                        </span>
                        <span className='absolute inset-0 rounded-md bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 transition-opacity group-hover:opacity-100' />
                    </Link>
                    <Link
                        href='https://github.com/doctornassar83/MyUltimateNextjs15StarterTemplate'
                        target='_blank'
                        className='bg-background/90 hover:bg-background flex items-center justify-center gap-2 rounded-md border px-8 py-3 text-sm font-medium backdrop-blur-sm transition-all hover:shadow-md'>
                        <Github size={16} />
                        <span>View on GitHub</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
