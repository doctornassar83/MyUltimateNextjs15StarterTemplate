import { AdvancedTodo } from '@/components/todo';

export const metadata = {
    title: 'Advanced Todo List'
};

export default function AdvancedTodoPage() {
    return (
        <div className='space-y-6'>
            <h2 className='text-3xl font-bold tracking-tight'>Advanced Todo List</h2>
            <p className='text-muted-foreground'>
                This advanced todo app demonstrates global state management with Context API and localStorage
                persistence.
            </p>

            <div className='grid gap-6'>
                <div className='bg-card rounded-lg border p-6 shadow-sm'>
                    <h3 className='mb-4 text-xl font-bold'>Features</h3>
                    <ul className='space-y-2 text-sm'>
                        <li className='flex items-center gap-2'>
                            <span className='bg-primary/20 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                                ✓
                            </span>
                            <span>Persistent storage using localStorage</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='bg-primary/20 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                                ✓
                            </span>
                            <span>Global state management with Context API</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='bg-primary/20 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                                ✓
                            </span>
                            <span>Filtering by status (all, active, completed)</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='bg-primary/20 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                                ✓
                            </span>
                            <span>Batch actions (complete all, clear completed)</span>
                        </li>
                        <li className='flex items-center gap-2'>
                            <span className='bg-primary/20 text-primary flex h-5 w-5 items-center justify-center rounded-full text-xs'>
                                ✓
                            </span>
                            <span>Enhanced UI with status indicators</span>
                        </li>
                    </ul>
                </div>

                <div className='mx-auto max-w-md'>
                    <AdvancedTodo />
                </div>
            </div>
        </div>
    );
}
