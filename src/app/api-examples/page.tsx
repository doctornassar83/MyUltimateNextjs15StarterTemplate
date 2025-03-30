'use client';

import { useState } from 'react';

import Link from 'next/link';

import { AccessibilityInfo } from '@/components/ui';
import { useGet } from '@/hooks/useApi';
import { apiCall } from '@/hooks/useApi';

import { ArrowLeft } from 'lucide-react';

// TypeScript interface for Todo
interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export default function ApiExamplesPage() {
    const [filter, setFilter] = useState<string | null>(null);
    const [newTodoText, setNewTodoText] = useState('');
    const [apiResponse, setApiResponse] = useState<string | null>(null);

    // Get todos from the API
    const {
        data: todos,
        isLoading,
        error,
        refetch
    } = useGet<Todo[]>(filter !== null ? `/api/todos?completed=${filter}` : '/api/todos');

    // Function to add a new todo
    const handleAddTodo = async () => {
        if (!newTodoText.trim()) return;

        try {
            setApiResponse('Adding todo...');

            await apiCall<Todo, { text: string }>('/api/todos', {
                method: 'POST',
                body: { text: newTodoText }
            });

            setNewTodoText('');
            refetch();
            setApiResponse('Todo added successfully!');
        } catch (error) {
            setApiResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    // Function to toggle todo completion
    const handleToggleTodo = async (todo: Todo) => {
        try {
            setApiResponse('Updating todo...');

            await apiCall<Todo, { id: string; completed: boolean }>('/api/todos', {
                method: 'PUT',
                body: {
                    id: todo.id,
                    completed: !todo.completed,
                    text: todo.text
                }
            });

            refetch();
            setApiResponse('Todo updated successfully!');
        } catch (error) {
            setApiResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    // Function to delete a todo
    const handleDeleteTodo = async (id: string) => {
        try {
            setApiResponse('Deleting todo...');

            await apiCall<{ message: string; todo: Todo }>(`/api/todos?id=${id}`, {
                method: 'DELETE'
            });

            refetch();
            setApiResponse('Todo deleted successfully!');
        } catch (error) {
            setApiResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    return (
        <div className='container mx-auto max-w-4xl px-4 py-12'>
            <div className='mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between'>
                <h1 className='text-3xl font-bold'>API Examples</h1>
                <Link href='/' className='text-primary hover:text-primary/80 mt-2 flex items-center gap-1 sm:mt-0'>
                    <ArrowLeft size={16} />
                    <span>Return to Home</span>
                </Link>
            </div>

            <div className='mb-8'>
                <h2 className='mb-4 text-xl font-semibold'>About this page</h2>
                <p className='text-muted-foreground mb-4'>
                    This page demonstrates working with the example API routes in{' '}
                    <code className='bg-muted rounded px-1 py-0.5'>src/app/api/*</code>. It shows how to fetch data,
                    create, update, and delete resources using different HTTP methods.
                </p>
            </div>

            <div className='grid gap-8 md:grid-cols-2'>
                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h2 className='mb-6 text-xl font-semibold'>Todo API Example</h2>

                    {/* Filter controls */}
                    <div className='mb-6 flex items-center gap-4'>
                        <div className='text-sm font-medium'>Filter:</div>
                        <div className='flex space-x-1'>
                            <button
                                type='button'
                                onClick={() => setFilter(null)}
                                className={`rounded-md px-3 py-1 text-sm ${
                                    filter === null
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted/50 hover:bg-muted'
                                }`}>
                                All
                            </button>
                            <button
                                type='button'
                                onClick={() => setFilter('true')}
                                className={`rounded-md px-3 py-1 text-sm ${
                                    filter === 'true'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted/50 hover:bg-muted'
                                }`}>
                                Completed
                            </button>
                            <button
                                type='button'
                                onClick={() => setFilter('false')}
                                className={`rounded-md px-3 py-1 text-sm ${
                                    filter === 'false'
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-muted/50 hover:bg-muted'
                                }`}>
                                Active
                            </button>
                        </div>
                    </div>

                    {/* Add todo form */}
                    <div className='mb-6 flex items-center gap-2'>
                        <input
                            type='text'
                            placeholder='Add a new todo...'
                            value={newTodoText}
                            onChange={(e) => setNewTodoText(e.target.value)}
                            className='border-input bg-background focus:ring-primary/20 flex-1 rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleAddTodo();
                            }}
                        />
                        <button
                            type='button'
                            onClick={handleAddTodo}
                            className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium'>
                            Add
                        </button>
                    </div>

                    {/* Todos list */}
                    <div className='mb-4'>
                        {isLoading ? (
                            <div className='py-4 text-center'>Loading todos...</div>
                        ) : error ? (
                            <div className='text-destructive py-4 text-center'>
                                Error loading todos: {error.message}
                            </div>
                        ) : todos && todos.length > 0 ? (
                            <ul className='space-y-2'>
                                {todos.map((todo) => (
                                    <li
                                        key={todo.id}
                                        className='bg-background hover:bg-muted/50 flex items-center justify-between rounded-md border p-3 transition-colors'>
                                        <div className='flex items-center gap-3'>
                                            <button
                                                type='button'
                                                onClick={() => handleToggleTodo(todo)}
                                                className={`flex h-5 w-5 items-center justify-center rounded-md border ${
                                                    todo.completed ? 'bg-primary/20 border-primary/50' : 'bg-background'
                                                }`}>
                                                {todo.completed && (
                                                    <svg
                                                        width='12'
                                                        height='12'
                                                        viewBox='0 0 12 12'
                                                        fill='none'
                                                        xmlns='http://www.w3.org/2000/svg'
                                                        aria-hidden='true'>
                                                        <path
                                                            d='M2.5 6.5L4.5 8.5L9.5 3.5'
                                                            stroke='currentColor'
                                                            strokeWidth='1.5'
                                                            strokeLinecap='round'
                                                            strokeLinejoin='round'
                                                        />
                                                    </svg>
                                                )}
                                            </button>
                                            <span
                                                className={todo.completed ? 'text-muted-foreground line-through' : ''}>
                                                {todo.text}
                                            </span>
                                        </div>
                                        <button
                                            type='button'
                                            onClick={() => handleDeleteTodo(todo.id)}
                                            className='text-destructive opacity-30 transition-opacity hover:opacity-100 focus:opacity-100'
                                            aria-label='Delete todo'>
                                            <svg
                                                width='16'
                                                height='16'
                                                viewBox='0 0 24 24'
                                                fill='none'
                                                xmlns='http://www.w3.org/2000/svg'
                                                aria-hidden='true'>
                                                <path
                                                    d='M18 6L6 18'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                                <path
                                                    d='M6 6L18 18'
                                                    stroke='currentColor'
                                                    strokeWidth='2'
                                                    strokeLinecap='round'
                                                    strokeLinejoin='round'
                                                />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className='text-muted-foreground py-4 text-center'>
                                No todos found. Add one to get started!
                            </div>
                        )}
                    </div>
                </div>

                <div className='space-y-6'>
                    <div className='bg-card rounded-lg border p-6 shadow-sm'>
                        <h2 className='mb-4 text-xl font-semibold'>API Response</h2>
                        {apiResponse ? (
                            <div className='bg-muted rounded-md p-4'>
                                <pre className='text-sm whitespace-pre-wrap'>{apiResponse}</pre>
                            </div>
                        ) : (
                            <div className='text-muted-foreground py-4 text-center'>API responses will appear here</div>
                        )}
                    </div>

                    <div className='bg-card rounded-lg border p-6 shadow-sm'>
                        <h2 className='mb-4 text-xl font-semibold'>Available Endpoints</h2>
                        <ul className='space-y-3'>
                            <li>
                                <div className='bg-muted mr-2 inline-block rounded px-2 py-1 font-mono text-sm'>
                                    GET
                                </div>
                                <code className='text-sm'>/api/hello</code>
                                <p className='text-muted-foreground mt-1 text-sm'>Basic hello world endpoint</p>
                            </li>
                            <li>
                                <div className='bg-muted mr-2 inline-block rounded px-2 py-1 font-mono text-sm'>
                                    GET
                                </div>
                                <code className='text-sm'>/api/todos</code>
                                <p className='text-muted-foreground mt-1 text-sm'>
                                    Get all todos or filter by completed status
                                </p>
                            </li>
                            <li>
                                <div className='bg-muted mr-2 inline-block rounded px-2 py-1 font-mono text-sm'>
                                    POST
                                </div>
                                <code className='text-sm'>/api/todos</code>
                                <p className='text-muted-foreground mt-1 text-sm'>Create a new todo</p>
                            </li>
                            <li>
                                <div className='bg-muted mr-2 inline-block rounded px-2 py-1 font-mono text-sm'>
                                    PUT
                                </div>
                                <code className='text-sm'>/api/todos</code>
                                <p className='text-muted-foreground mt-1 text-sm'>Update an existing todo</p>
                            </li>
                            <li>
                                <div className='bg-muted mr-2 inline-block rounded px-2 py-1 font-mono text-sm'>
                                    DELETE
                                </div>
                                <code className='text-sm'>/api/todos?id=123</code>
                                <p className='text-muted-foreground mt-1 text-sm'>Delete a todo by ID</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <AccessibilityInfo componentName='API Examples Page' />
        </div>
    );
}
