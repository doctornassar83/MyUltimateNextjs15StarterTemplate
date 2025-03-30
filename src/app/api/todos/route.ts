import { type NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

// In-memory store for todos (would be a database in a real app)
let todos: Todo[] = [
    { id: '1', text: 'Learn Next.js 15', completed: true },
    { id: '2', text: 'Build an API with TypeScript', completed: false },
    { id: '3', text: 'Deploy to production', completed: false }
];

// TypeScript interface for Todo
interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

// Zod schema for validating todo input
const TodoSchema = z.object({
    text: z.string().min(1, 'Todo text is required').max(100, 'Todo text is too long'),
    completed: z.boolean().optional().default(false)
});

export async function GET(request: NextRequest) {
    try {
        // Get filter from search params (if any)
        const { searchParams } = new URL(request.url);
        const completed = searchParams.get('completed');

        let filteredTodos = todos;

        // Filter todos if completed parameter is provided
        if (completed !== null) {
            const isCompleted = completed === 'true';
            filteredTodos = todos.filter((todo) => todo.completed === isCompleted);
        }

        return NextResponse.json(filteredTodos, { status: 200 });
    } catch (error) {
        console.error('Error in GET /api/todos:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate input with Zod
        const result = TodoSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
        }

        // Create new todo
        const newTodo: Todo = {
            id: Date.now().toString(),
            text: result.data.text,
            completed: result.data.completed
        };

        todos.push(newTodo);

        return NextResponse.json(newTodo, { status: 201 });
    } catch (error) {
        console.error('Error in POST /api/todos:', error);

        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.id) {
            return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
        }

        // Validate input with Zod (excluding id for update)
        const result = TodoSchema.safeParse({
            text: body.text,
            completed: body.completed
        });

        if (!result.success) {
            return NextResponse.json({ error: 'Validation failed', details: result.error.format() }, { status: 400 });
        }

        const todoIndex = todos.findIndex((todo) => todo.id === body.id);

        if (todoIndex === -1) {
            return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
        }

        // Update todo
        todos[todoIndex] = {
            ...todos[todoIndex],
            text: body.text ?? todos[todoIndex].text,
            completed: body.completed ?? todos[todoIndex].completed
        };

        return NextResponse.json(todos[todoIndex], { status: 200 });
    } catch (error) {
        console.error('Error in PUT /api/todos:', error);

        if (error instanceof SyntaxError) {
            return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
        }

        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Todo ID is required' }, { status: 400 });
        }

        const todoIndex = todos.findIndex((todo) => todo.id === id);

        if (todoIndex === -1) {
            return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
        }

        // Remove todo
        const deletedTodo = todos[todoIndex];
        todos = todos.filter((todo) => todo.id !== id);

        return NextResponse.json({ message: 'Todo deleted successfully', todo: deletedTodo }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE /api/todos:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
