'use client';

import { CheckCircle, RotateCcw } from 'lucide-react';

export interface TodoActionsProps {
    completedCount: number;
    activeCount: number;
    totalCount: number;
    onMarkAllCompleted: () => void;
    onClearCompleted: () => void;
    showActiveCount?: boolean;
}

/**
 * TodoActions component
 *
 * Footer section with todo counts and action buttons.
 */
export function TodoActions({
    completedCount,
    activeCount,
    totalCount,
    onMarkAllCompleted,
    onClearCompleted,
    showActiveCount = false
}: TodoActionsProps) {
    if (totalCount === 0) return null;

    return (
        <div className='mt-6 flex items-center justify-between border-t pt-4'>
            <div className='text-muted-foreground text-xs'>
                {showActiveCount ? (
                    <>
                        {activeCount} {activeCount === 1 ? 'item' : 'items'} left
                    </>
                ) : (
                    <>
                        {completedCount} of {totalCount} tasks completed
                    </>
                )}
            </div>

            <div className='flex gap-3'>
                <button
                    type='button'
                    onClick={onMarkAllCompleted}
                    className='text-primary hover:text-primary/80 flex items-center gap-1 text-xs'
                    aria-label='Mark all as done'
                    disabled={activeCount === 0}>
                    <CheckCircle size={14} />
                    <span>Complete all</span>
                </button>

                {completedCount > 0 && (
                    <button
                        type='button'
                        onClick={onClearCompleted}
                        className='text-destructive hover:text-destructive/80 flex items-center gap-1 text-xs'
                        aria-label='Clear completed'>
                        <RotateCcw size={14} />
                        <span>Clear completed</span>
                    </button>
                )}
            </div>
        </div>
    );
}
