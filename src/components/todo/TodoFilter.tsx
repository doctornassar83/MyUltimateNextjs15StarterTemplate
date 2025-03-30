'use client';

import { useState } from 'react';

import { Filter } from 'lucide-react';

export type TodoFilterValue = 'all' | 'active' | 'completed';

export interface TodoFilterProps {
    currentFilter: TodoFilterValue;
    onFilterChange: (filter: TodoFilterValue) => void;
}

/**
 * TodoFilter component
 *
 * Dropdown filter for filtering todos by status.
 */
export function TodoFilter({ currentFilter, onFilterChange }: TodoFilterProps) {
    const [showFilterMenu, setShowFilterMenu] = useState(false);

    const toggleFilterMenu = () => {
        setShowFilterMenu(!showFilterMenu);
    };

    const selectFilter = (filter: TodoFilterValue) => {
        onFilterChange(filter);
        setShowFilterMenu(false);
    };

    return (
        <div className='relative'>
            <button
                type='button'
                onClick={toggleFilterMenu}
                className='text-muted-foreground hover:bg-muted flex items-center gap-1 rounded-md p-1 text-xs'
                aria-label='Filter todos'>
                <Filter size={16} />
                <span>{currentFilter.charAt(0).toUpperCase() + currentFilter.slice(1)}</span>
            </button>

            {showFilterMenu && (
                <div className='bg-card absolute top-8 right-0 z-10 w-32 rounded-md border p-2 shadow-md'>
                    <button
                        type='button'
                        onClick={() => selectFilter('all')}
                        className={`block w-full rounded-sm px-2 py-1 text-left text-sm ${
                            currentFilter === 'all' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
                        }`}>
                        All
                    </button>
                    <button
                        type='button'
                        onClick={() => selectFilter('active')}
                        className={`block w-full rounded-sm px-2 py-1 text-left text-sm ${
                            currentFilter === 'active' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
                        }`}>
                        Active
                    </button>
                    <button
                        type='button'
                        onClick={() => selectFilter('completed')}
                        className={`block w-full rounded-sm px-2 py-1 text-left text-sm ${
                            currentFilter === 'completed' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'
                        }`}>
                        Completed
                    </button>
                </div>
            )}
        </div>
    );
}
