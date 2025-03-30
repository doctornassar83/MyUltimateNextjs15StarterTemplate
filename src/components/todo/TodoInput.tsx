'use client';

import { useState } from 'react';

import { PlusCircle } from 'lucide-react';

export interface TodoInputProps {
    onAddTodo: (text: string) => void;
    placeholder?: string;
}

/**
 * TodoInput component
 *
 * Input field with button for adding new todos.
 */
export function TodoInput({ onAddTodo, placeholder = 'Add a new task...' }: TodoInputProps) {
    const [newTodo, setNewTodo] = useState('');

    const handleAddTodo = () => {
        if (newTodo.trim() !== '') {
            onAddTodo(newTodo);
            setNewTodo('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleAddTodo();
        }
    };

    return (
        <div className='flex gap-2'>
            <input
                type='text'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className='border-input bg-background focus:border-primary focus:ring-primary/20 flex-1 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
            />
            <button
                type='button'
                onClick={handleAddTodo}
                className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-3 py-2'
                aria-label='Add todo'>
                <PlusCircle size={20} />
            </button>
        </div>
    );
}
