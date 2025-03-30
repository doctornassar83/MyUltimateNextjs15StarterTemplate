import { useCallback, useState } from 'react';

export interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

export function useTodos(initialTodos: Todo[] = []) {
    const [todos, setTodos] = useState<Todo[]>(initialTodos);

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

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        clearCompleted,
        markAllCompleted,
        completedCount: todos.filter((t) => t.completed).length,
        activeCount: todos.filter((t) => !t.completed).length,
        totalCount: todos.length
    };
}
