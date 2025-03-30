'use client';

import type { TodoFilterValue } from './TodoFilter';

export interface TodoEmptyProps {
    filter?: TodoFilterValue;
    onShowAll?: () => void;
    simple?: boolean;
}

/**
 * TodoEmpty component
 *
 * Empty state to display when there are no todos.
 */
export function TodoEmpty({ filter = 'all', onShowAll, simple = false }: TodoEmptyProps) {
    if (simple) {
        return <p className='text-muted-foreground mt-6 text-center text-sm'>No todos yet. Add some tasks above!</p>;
    }

    return (
        <div className='mt-6 flex flex-col items-center justify-center rounded-md border border-dashed p-8'>
            <p className='text-muted-foreground mb-2 text-center text-sm'>
                {filter === 'all'
                    ? 'No todos yet. Add some tasks above!'
                    : filter === 'active'
                      ? 'No active tasks. Great job!'
                      : 'No completed tasks yet.'}
            </p>
            {filter !== 'all' && onShowAll && (
                <button type='button' onClick={onShowAll} className='text-primary mt-2 text-xs hover:underline'>
                    Show all tasks
                </button>
            )}
        </div>
    );
}
