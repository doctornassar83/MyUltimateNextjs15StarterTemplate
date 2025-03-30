'use client';

import type React from 'react';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

import type { Todo } from '@/hooks/useTodos';

interface TodoContextType {
    todos: Todo[];
    addTodo: (text: string) => void;
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
    clearCompleted: () => void;
    markAllCompleted: (completed?: boolean) => void;
    completedCount: number;
    activeCount: number;
    totalCount: number;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

const STORAGE_KEY = 'next-15-todos';

export function TodoProvider({ children }: { children: React.ReactNode }) {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Load todos from localStorage on mount
    useEffect(() => {
        try {
            const storedTodos = localStorage.getItem(STORAGE_KEY);
            if (storedTodos) {
                setTodos(JSON.parse(storedTodos));
            }
        } catch (error) {
            console.error('Failed to load todos from localStorage:', error);
        }
    }, []);

    // Save todos to localStorage when they change
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
        } catch (error) {
            console.error('Failed to save todos to localStorage:', error);
        }
    }, [todos]);

    const addTodo = useCallback((text: string) => {
        if (text.trim() === '') return;

        setTodos((prevTodos) => [
            ...prevTodos,
            {
                id: Date.now().toString(),
                text: text.trim(),
                completed: false
            }
        ]);
    }, []);

    const toggleTodo = useCallback((id: string) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
        );
    }, []);

    const deleteTodo = useCallback((id: string) => {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    }, []);

    const clearCompleted = useCallback(() => {
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
    }, []);

    const markAllCompleted = useCallback((completed = true) => {
        setTodos((prevTodos) => prevTodos.map((todo) => ({ ...todo, completed })));
    }, []);

    const completedCount = todos.filter((t) => t.completed).length;
    const activeCount = todos.filter((t) => !t.completed).length;
    const totalCount = todos.length;

    const value = {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        markAllCompleted,
        completedCount,
        activeCount,
        totalCount
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}

export function useTodoContext(): TodoContextType {
    const context = useContext(TodoContext);

    if (context === undefined) {
        throw new Error('useTodoContext must be used within a TodoProvider');
    }

    return context;
}
