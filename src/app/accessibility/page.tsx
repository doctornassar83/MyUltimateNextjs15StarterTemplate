'use client';

import Link from 'next/link';

import { AccessibilityInfo } from '@/components/ui';

import { ArrowLeft } from 'lucide-react';

export default function AccessibilityGuidePage() {
    return (
        <div className='container mx-auto max-w-4xl px-4 py-12'>
            <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <h1 className='text-3xl font-bold'>Accessibility Guide</h1>
                <Link href='/' className='text-primary hover:text-primary/80 mt-2 flex items-center gap-1 sm:mt-0'>
                    <ArrowLeft size={16} />
                    <span>Return to Home</span>
                </Link>
            </div>

            <div className='mb-8'>
                <p className='text-muted-foreground mb-4'>
                    This guide demonstrates accessibility features and best practices used in this starter template. The
                    floating accessibility button in the bottom right provides real-time accessibility checks.
                </p>
            </div>

            <div className='grid gap-8'>
                <section className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h2 className='mb-4 text-2xl font-semibold'>Why Accessibility Matters</h2>
                    <p className='mb-3'>
                        Accessibility ensures that people with disabilities can perceive, understand, navigate, and
                        interact with websites and applications. It's not just a nice-to-have feature; it's a
                        requirement for:
                    </p>
                    <ul className='mb-4 list-disc space-y-2 pl-6'>
                        <li>Reaching a wider audience and providing equal access to information</li>
                        <li>Meeting legal requirements (ADA, Section 508, EAA, etc.)</li>
                        <li>Improving usability for everyone</li>
                        <li>Achieving better SEO rankings</li>
                    </ul>

                    <h3 className='mt-6 mb-3 text-xl font-medium'>Core Principles (WCAG)</h3>
                    <div className='grid gap-4 md:grid-cols-2'>
                        <div className='rounded-md border p-4'>
                            <h4 className='mb-2 font-medium'>Perceivable</h4>
                            <p className='text-muted-foreground text-sm'>
                                Information and user interface components must be presentable to users in ways they can
                                perceive.
                            </p>
                        </div>
                        <div className='rounded-md border p-4'>
                            <h4 className='mb-2 font-medium'>Operable</h4>
                            <p className='text-muted-foreground text-sm'>
                                User interface components and navigation must be operable and not require interactions
                                that a user cannot perform.
                            </p>
                        </div>
                        <div className='rounded-md border p-4'>
                            <h4 className='mb-2 font-medium'>Understandable</h4>
                            <p className='text-muted-foreground text-sm'>
                                Information and the operation of user interface must be understandable to all users.
                            </p>
                        </div>
                        <div className='rounded-md border p-4'>
                            <h4 className='mb-2 font-medium'>Robust</h4>
                            <p className='text-muted-foreground text-sm'>
                                Content must be robust enough to be interpreted reliably by a wide variety of user
                                agents, including assistive technologies.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h2 className='mb-4 text-2xl font-semibold'>Features in this Template</h2>

                    <div className='space-y-4'>
                        <div className='border-primary border-l-4 pl-4'>
                            <h3 className='font-medium'>Semantic HTML</h3>
                            <p className='text-muted-foreground text-sm'>
                                All components use proper semantic elements like buttons, headings, and landmarks.
                            </p>
                        </div>

                        <div className='border-primary border-l-4 pl-4'>
                            <h3 className='font-medium'>Keyboard Navigation</h3>
                            <p className='text-muted-foreground text-sm'>
                                All interactive elements are accessible via keyboard with visible focus indicators.
                            </p>
                        </div>

                        <div className='border-primary border-l-4 pl-4'>
                            <h3 className='font-medium'>Color Contrast</h3>
                            <p className='text-muted-foreground text-sm'>
                                Text and interactive elements maintain sufficient contrast in both light and dark
                                themes.
                            </p>
                        </div>

                        <div className='border-primary border-l-4 pl-4'>
                            <h3 className='font-medium'>Screen Reader Support</h3>
                            <p className='text-muted-foreground text-sm'>
                                ARIA attributes and proper labeling ensure screen readers can interpret all content.
                            </p>
                        </div>

                        <div className='border-primary border-l-4 pl-4'>
                            <h3 className='font-medium'>Responsive Design</h3>
                            <p className='text-muted-foreground text-sm'>
                                Components adapt to different viewports and zoom levels without loss of functionality.
                            </p>
                        </div>

                        <div className='border-primary border-l-4 pl-4'>
                            <h3 className='font-medium'>Reduced Motion Support</h3>
                            <p className='text-muted-foreground text-sm'>
                                Animations respect the user's motion preference settings.
                            </p>
                        </div>
                    </div>
                </section>

                <section className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h2 className='mb-4 text-2xl font-semibold'>Testing Examples</h2>

                    <div className='mb-6'>
                        <h3 className='mb-3 text-xl font-medium'>Form Inputs</h3>
                        <div className='max-w-md space-y-4'>
                            <div>
                                <label htmlFor='name' className='mb-1 block text-sm font-medium'>
                                    Name
                                </label>
                                <input
                                    type='text'
                                    id='name'
                                    className='w-full rounded-md border px-3 py-2'
                                    aria-required='true'
                                />
                            </div>

                            <div>
                                <label htmlFor='email' className='mb-1 block text-sm font-medium'>
                                    Email
                                </label>
                                <input
                                    type='email'
                                    id='email'
                                    className='w-full rounded-md border px-3 py-2'
                                    aria-required='true'
                                    aria-describedby='email-hint'
                                />
                                <p id='email-hint' className='text-muted-foreground mt-1 text-xs'>
                                    We'll never share your email with anyone else.
                                </p>
                            </div>

                            <fieldset className='rounded-md border p-4'>
                                <legend className='px-2 text-sm font-medium'>Notification Preferences</legend>
                                <div className='space-y-2'>
                                    <div className='flex items-center gap-2'>
                                        <input type='checkbox' id='email-notifications' />
                                        <label htmlFor='email-notifications' className='text-sm'>
                                            Email notifications
                                        </label>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <input type='checkbox' id='sms-notifications' />
                                        <label htmlFor='sms-notifications' className='text-sm'>
                                            SMS notifications
                                        </label>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>

                    <div>
                        <h3 className='mb-3 text-xl font-medium'>Interactive Elements</h3>
                        <div className='flex flex-wrap gap-3'>
                            <button
                                type='button'
                                className='bg-primary text-primary-foreground rounded-md px-4 py-2 font-medium'>
                                Primary Button
                            </button>

                            <button
                                type='button'
                                className='bg-muted hover:bg-muted/80 rounded-md border px-4 py-2 font-medium'>
                                Secondary Button
                            </button>

                            <button type='button' aria-label='Menu' className='text-primary rounded-md border p-2'>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 24 24'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                    aria-hidden='true'>
                                    <path
                                        d='M4 6H20M4 12H20M4 18H20'
                                        stroke='currentColor'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </section>
            </div>

            {/* Floating accessibility info component */}
            <AccessibilityInfo componentName='Accessibility Guide' />
        </div>
    );
}
