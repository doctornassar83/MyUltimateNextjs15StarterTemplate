import { type NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        return NextResponse.json(
            {
                message: 'Hello from the API!',
                timestamp: new Date().toISOString()
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error in hello API route:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
