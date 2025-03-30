'use client';

import { useState } from 'react';

import Link from 'next/link';

import {
    AlertTriangle,
    Check,
    ChevronDown,
    ChevronUp,
    ExternalLink,
    Eye,
    Info,
    RotateCw,
    Settings,
    X
} from 'lucide-react';

export interface AccessibilityInfoProps {
    /**
     * The component or page being checked for accessibility
     */
    componentName: string;
}

interface AccessibilityCheckItem {
    id: string;
    title: string;
    description: string;
    status: 'passed' | 'warning' | 'error' | 'info';
    details?: string;
}

export function AccessibilityInfo({ componentName }: AccessibilityInfoProps) {
    const [expanded, setExpanded] = useState(false);
    const [showPanel, setShowPanel] = useState(false);

    const checks: AccessibilityCheckItem[] = [
        {
            id: 'aria-labels',
            title: 'ARIA Attributes',
            description: 'Use appropriate ARIA attributes for interactive elements',
            status: 'info',
            details:
                'Ensure that interactive elements have proper ARIA labels, especially buttons that only contain icons.'
        },
        {
            id: 'keyboard-nav',
            title: 'Keyboard Navigation',
            description: 'Ensure all interactive elements are keyboard accessible',
            status: 'info',
            details: 'Test tab order and make sure focus indicators are visible. Use tabIndex appropriately.'
        },
        {
            id: 'color-contrast',
            title: 'Color Contrast',
            description: 'Text should have sufficient contrast with its background',
            status: 'warning',
            details: 'Aim for a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.'
        },
        {
            id: 'heading-structure',
            title: 'Heading Structure',
            description: 'Use proper heading hierarchy (h1-h6)',
            status: 'passed',
            details: "Start with h1, and don't skip heading levels. Each page should have exactly one h1."
        },
        {
            id: 'alt-text',
            title: 'Image Alt Text',
            description: 'Provide alt text for images',
            status: 'info',
            details:
                'All images should have alt text that describes the content and function of the image. Decorative images should use alt="".'
        },
        {
            id: 'semantic-html',
            title: 'Semantic HTML',
            description: 'Use appropriate HTML elements',
            status: 'info',
            details:
                'Use semantic elements like <button>, <a>, <nav>, <header>, <footer>, etc., instead of generic <div> elements.'
        }
    ];

    const getStatusIcon = (status: AccessibilityCheckItem['status']) => {
        switch (status) {
            case 'passed':
                return <Check size={16} className='text-green-500' />;
            case 'warning':
                return <AlertTriangle size={16} className='text-amber-500' />;
            case 'error':
                return <X size={16} className='text-red-500' />;
            case 'info':
                return <Info size={16} className='text-blue-500' />;
            default:
                return null;
        }
    };

    return (
        <>
            <button
                type='button'
                onClick={() => setShowPanel(!showPanel)}
                className='bg-primary/10 text-primary fixed right-4 bottom-4 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-sm shadow-lg'
                aria-label={showPanel ? 'Close accessibility info' : 'Show accessibility info'}>
                <Eye size={16} />
                <span className='hidden sm:inline'>Accessibility</span>
            </button>

            {showPanel && (
                <div className='bg-background border-border fixed right-4 bottom-16 z-50 w-full max-w-md rounded-lg border shadow-xl'>
                    <div className='flex items-center justify-between border-b p-4'>
                        <div className='flex items-center gap-2'>
                            <Settings size={18} className='text-primary' />
                            <h2 className='font-semibold'>Accessibility Panel</h2>
                        </div>
                        <button
                            type='button'
                            onClick={() => setShowPanel(false)}
                            className='text-muted-foreground hover:text-foreground rounded-full p-1'
                            aria-label='Close accessibility panel'>
                            <X size={18} />
                        </button>
                    </div>

                    <div className='p-4'>
                        <div className='mb-4'>
                            <p className='text-muted-foreground text-sm'>
                                Reviewing accessibility for{' '}
                                <span className='text-foreground font-medium'>{componentName}</span>
                            </p>
                        </div>

                        <ul className='space-y-3'>
                            {checks.map((check) => (
                                <li key={check.id} className='rounded-md border p-3'>
                                    <div className='flex items-start gap-3'>
                                        <div className='mt-0.5'>{getStatusIcon(check.status)}</div>
                                        <div className='flex-1'>
                                            <h3 className='font-medium'>{check.title}</h3>
                                            <p className='text-muted-foreground text-sm'>{check.description}</p>

                                            {check.details && (
                                                <div className='mt-2'>
                                                    <button
                                                        type='button'
                                                        onClick={() => setExpanded(!expanded)}
                                                        className='text-primary hover:text-primary/80 flex items-center gap-1 text-xs'
                                                        aria-expanded={expanded}
                                                        aria-controls={`details-${check.id}`}>
                                                        {expanded ? (
                                                            <>
                                                                <ChevronUp size={12} />
                                                                <span>Hide details</span>
                                                            </>
                                                        ) : (
                                                            <>
                                                                <ChevronDown size={12} />
                                                                <span>Show details</span>
                                                            </>
                                                        )}
                                                    </button>

                                                    {expanded && (
                                                        <div
                                                            id={`details-${check.id}`}
                                                            className='bg-muted/50 mt-2 rounded-md p-2 text-xs'>
                                                            {check.details}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className='mt-4 border-t pt-4'>
                            <div className='flex items-center justify-between'>
                                <button
                                    type='button'
                                    className='text-primary hover:text-primary/80 flex items-center gap-1 text-xs'
                                    aria-label='Run accessibility check again'>
                                    <RotateCw size={12} />
                                    <span>Run check again</span>
                                </button>
                                <Link
                                    href='https://www.w3.org/WAI/WCAG21/quickref/'
                                    target='_blank'
                                    rel='noopener noreferrer'
                                    className='text-primary hover:text-primary/80 flex items-center gap-1 text-xs'>
                                    <span>WCAG Guidelines</span>
                                    <ExternalLink size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
