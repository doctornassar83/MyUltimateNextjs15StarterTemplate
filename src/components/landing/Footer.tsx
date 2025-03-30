'use client';

import Link from 'next/link';

import { Code, Github, Rocket, Terminal, Zap } from 'lucide-react';

export function Footer() {
    return (
        <footer className='bg-background/50 border-t px-8 py-16 backdrop-blur-sm'>
            <div className='container mx-auto'>
                <div className='grid gap-12 md:grid-cols-4'>
                    <div className='space-y-4'>
                        <div className='flex items-center gap-2'>
                            <div className='from-primary/90 relative h-8 w-8 rounded-full bg-gradient-to-br to-purple-600 p-[2px]'>
                                <div className='bg-background flex h-full w-full items-center justify-center rounded-full'>
                                    <Zap size={16} className='text-primary' />
                                </div>
                            </div>
                            <span className='text-xl font-bold'>Next.js 15 Enterprise</span>
                        </div>
                        <p className='text-muted-foreground max-w-xs text-sm'>
                            A production-ready starter template for building robust Next.js applications with modern
                            tooling and best practices.
                        </p>
                        <div className='flex space-x-4'>
                            <a
                                href='https://github.com/siddharthamaity/nextjs-15-starter-shadcn'
                                className='text-muted-foreground hover:text-primary transition-colors'>
                                <Github size={20} />
                            </a>
                            <a
                                href='https://nextjs.org/docs'
                                className='text-muted-foreground hover:text-primary transition-colors'>
                                <Terminal size={20} />
                            </a>
                            <a
                                href='https://nextjs.org'
                                className='text-muted-foreground hover:text-primary transition-colors'>
                                <Code size={20} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 className='mb-4 font-semibold'>Product</h4>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Documentation
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Changelog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Roadmap
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='mb-4 font-semibold'>Resources</h4>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Community
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    GitHub Repo
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Support
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className='mb-4 font-semibold'>Legal</h4>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    Cookie Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#'
                                    className='text-muted-foreground hover:text-primary text-sm transition-colors'>
                                    License
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='mt-12 flex flex-col items-center justify-between border-t pt-8 md:flex-row'>
                    <p className='text-muted-foreground text-sm'>
                        © {new Date().getFullYear()} Next.js 15 Enterprise. All rights reserved.
                    </p>
                    <div className='mt-4 md:mt-0'>
                        <div className='group relative inline-block'>
                            <span className='text-muted-foreground inline-flex items-center gap-1.5 text-sm'>
                                <Rocket size={16} className='text-primary' />
                                Powered by Next.js 15
                            </span>
                            <div className='bg-popover invisible absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg p-2 opacity-0 shadow-lg transition-all group-hover:visible group-hover:opacity-100'>
                                <p className='text-muted-foreground text-xs'>
                                    Built with Next.js 15, React 19, and Tailwind CSS 4
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
