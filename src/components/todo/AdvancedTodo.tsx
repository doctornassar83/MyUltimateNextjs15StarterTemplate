'use client';

import { useState } from 'react';

import { useTodoContext } from '@/context/todo-context';

import type { TodoFilterValue } from './TodoFilter';
import { TodoActions, TodoEmpty, TodoFilter, TodoInput, TodoItem } from './index';

/**
 * AdvancedTodo component
 *
 * A more advanced todo implementation using Context API for global state.
 * Demonstrates filtering, persistent storage, and more complex UI.
 */
export function AdvancedTodo() {
    const {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        markAllCompleted,
        completedCount,
        activeCount,
        totalCount
    } = useTodoContext();

    const [filter, setFilter] = useState<TodoFilterValue>('all');

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    return (
        <div className='bg-card w-full max-w-md rounded-lg border p-6 shadow-sm'>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Todo App</h2>
                <TodoFilter currentFilter={filter} onFilterChange={setFilter} />
            </div>
            <p className='text-muted-foreground text-sm'>A more advanced todo app with filtering</p>

            <div className='mt-4'>
                <TodoInput onAddTodo={addTodo} placeholder='What needs to be done?' />
            </div>

            {filteredTodos.length > 0 ? (
                <ul className='mt-6 space-y-2'>
                    {filteredTodos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} />
                    ))}
                </ul>
            ) : (
                <TodoEmpty filter={filter} onShowAll={() => setFilter('all')} />
            )}

            <TodoActions
                completedCount={completedCount}
                activeCount={activeCount}
                totalCount={totalCount}
                onMarkAllCompleted={markAllCompleted}
                onClearCompleted={clearCompleted}
                showActiveCount
            />
        </div>
    );
}
