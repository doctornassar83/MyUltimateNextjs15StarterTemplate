'use client';

import type { Todo } from '@/hooks/useTodos';

import { CheckSquare, Square, Trash2, X } from 'lucide-react';

export interface TodoItemProps {
    todo: Todo;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    useCheckbox?: boolean;
}

/**
 * TodoItem component
 *
 * Renders a single todo item with toggle and delete functionality.
 * Can use either checkbox or custom icons based on the useCheckbox prop.
 */
export function TodoItem({ todo, onToggle, onDelete, useCheckbox = false }: TodoItemProps) {
    return (
        <li className='hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-all'>
            <div className='flex items-center gap-3'>
                {useCheckbox ? (
                    <input
                        type='checkbox'
                        checked={todo.completed}
                        onChange={() => onToggle(todo.id)}
                        className='text-primary focus:ring-primary h-4 w-4 rounded border-gray-300'
                    />
                ) : (
                    <button
                        type='button'
                        onClick={() => onToggle(todo.id)}
                        className={`text-lg ${todo.completed ? 'text-primary' : 'text-muted-foreground'}`}
                        aria-label={todo.completed ? 'Mark as not completed' : 'Mark as completed'}>
                        {todo.completed ? <CheckSquare size={20} /> : <Square size={20} />}
                    </button>
                )}
                <span className={`transition-all ${todo.completed ? 'text-muted-foreground line-through' : ''}`}>
                    {todo.text}
                </span>
            </div>
            <button
                type='button'
                onClick={() => onDelete(todo.id)}
                className='text-destructive hover:text-destructive/80 opacity-30 transition-opacity hover:opacity-100'
                aria-label='Delete todo'>
                {useCheckbox ? <Trash2 size={18} /> : <X size={18} />}
            </button>
        </li>
    );
}
