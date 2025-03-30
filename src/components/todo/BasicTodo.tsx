'use client';

import { useTodos } from '@/hooks/useTodos';

import { TodoActions, TodoEmpty, TodoInput, TodoItem } from './index';

/**
 * BasicTodo component
 *
 * A simple todo list implementation using the useTodos hook for local state.
 * Demonstrates basic state management with React hooks.
 */
export function BasicTodo() {
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
    } = useTodos([
        { id: '1', text: 'Learn Next.js 15', completed: true },
        { id: '2', text: 'Build an application with TypeScript', completed: false },
        { id: '3', text: 'Implement Tailwind CSS styling', completed: false }
    ]);

    return (
        <div className='bg-card w-full max-w-md rounded-lg border p-6 shadow-sm'>
            <h2 className='text-2xl font-bold'>Todo List</h2>
            <p className='text-muted-foreground text-sm'>A simple todo list component</p>

            <div className='mt-4'>
                <TodoInput onAddTodo={addTodo} />
            </div>

            {todos.length > 0 ? (
                <ul className='mt-6 space-y-2'>
                    {todos.map((todo) => (
                        <TodoItem key={todo.id} todo={todo} onToggle={toggleTodo} onDelete={deleteTodo} useCheckbox />
                    ))}
                </ul>
            ) : (
                <TodoEmpty simple />
            )}

            <TodoActions
                completedCount={completedCount}
                activeCount={activeCount}
                totalCount={totalCount}
                onMarkAllCompleted={markAllCompleted}
                onClearCompleted={clearCompleted}
            />
        </div>
    );
}
