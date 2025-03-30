export function Screenshots() {
    // Add a timestamp to force browser to reload images
    const timestamp = new Date().getTime();

    return (
        <section className='from-background to-muted/20 bg-gradient-to-b px-4 py-16'>
            <div className='container mx-auto'>
                <h2 className='mb-6 text-center text-3xl font-bold md:text-4xl'>Project Screenshots</h2>
                <p className='text-muted-foreground mx-auto mb-12 max-w-2xl text-center'>
                    Get a glimpse of the features and interface of our Next.js 15 Enterprise Starter Template
                </p>

                <div className='grid gap-8 md:grid-cols-2'>
                    <div className='bg-card relative overflow-hidden rounded-xl border shadow-lg transition-transform duration-300 hover:scale-[1.02]'>
                        <img
                            src={`/images/screenshot1.png?v=${timestamp}`}
                            alt='Next.js 15 Starter Template - Shadcn UI Components'
                            className='h-auto w-full'
                        />
                        <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
                            <h3 className='font-medium text-white'>Modern UI Components</h3>
                            <p className='text-sm text-white/80'>
                                Beautiful Shadcn UI components with consistent design language
                            </p>
                        </div>
                    </div>

                    <div className='bg-card relative overflow-hidden rounded-xl border shadow-lg transition-transform duration-300 hover:scale-[1.02]'>
                        <img
                            src={`/images/screenshot2.png?v=${timestamp}`}
                            alt='Next.js 15 Starter Template - Dashboard Layout'
                            className='h-auto w-full'
                        />
                        <div className='absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4'>
                            <h3 className='font-medium text-white'>Dashboard Layout</h3>
                            <p className='text-sm text-white/80'>
                                Professional dashboard with dark mode support and data visualization
                            </p>
                        </div>
                    </div>
                </div>

                <div className='mt-10 text-center'>
                    <p className='text-muted-foreground text-sm'>Images optimized for better performance and SEO</p>
                    <p className='text-muted-foreground mt-2 text-sm'>
                        <strong>Note:</strong> Actual application appearance may vary as the template is continuously
                        updated
                    </p>
                </div>
            </div>
        </section>
    );
}
