import { BasicTodo } from '@/components/todo';

export const metadata = {
    title: 'Todo List'
};

export default function TodoPage() {
    return (
        <div className='space-y-6'>
            <h2 className='text-3xl font-bold tracking-tight'>Todo List Example</h2>
            <p className='text-muted-foreground'>
                A simple todo list component demonstrating state management with React hooks, form handling, and
                Tailwind styling.
            </p>

            <div className='mx-auto max-w-md'>
                <BasicTodo />
            </div>
        </div>
    );
}
