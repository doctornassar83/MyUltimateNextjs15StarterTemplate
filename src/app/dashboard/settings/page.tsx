'use client';

import { useEffect, useState } from 'react';

import { useTheme } from 'next-themes';

import { Bell, CreditCard, Laptop, Moon, Save, Sun, User } from 'lucide-react';

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className='space-y-6'>
            <div>
                <h2 className='text-3xl font-bold tracking-tight'>Settings</h2>
                <p className='text-muted-foreground'>Manage your account settings and preferences.</p>
            </div>

            <div className='flex flex-col space-y-8 lg:flex-row lg:space-y-0 lg:space-x-12'>
                <aside className='lg:w-1/5'>
                    <nav className='flex space-x-2 lg:flex-col lg:space-y-1 lg:space-x-0'>
                        <button
                            type='button'
                            onClick={() => setActiveTab('profile')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                                activeTab === 'profile'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground'
                            }`}>
                            <User className='h-4 w-4' />
                            <span>Profile</span>
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab('notifications')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                                activeTab === 'notifications'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground'
                            }`}>
                            <Bell className='h-4 w-4' />
                            <span>Notifications</span>
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab('account')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                                activeTab === 'account'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground'
                            }`}>
                            <CreditCard className='h-4 w-4' />
                            <span>Account</span>
                        </button>
                        <button
                            type='button'
                            onClick={() => setActiveTab('appearance')}
                            className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                                activeTab === 'appearance'
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted text-muted-foreground'
                            }`}>
                            <Sun className='h-4 w-4' />
                            <span>Appearance</span>
                        </button>
                    </nav>
                </aside>
                <div className='flex-1 lg:max-w-2xl'>
                    {activeTab === 'profile' && <ProfileSettings />}
                    {activeTab === 'notifications' && <NotificationsSettings />}
                    {activeTab === 'account' && <AccountSettings />}
                    {activeTab === 'appearance' && <AppearanceSettings />}
                </div>
            </div>
        </div>
    );
}

function ProfileSettings() {
    return (
        <div className='space-y-6'>
            <div>
                <h3 className='text-lg font-medium'>Profile</h3>
                <p className='text-muted-foreground text-sm'>Update your profile information and how others see you.</p>
            </div>
            <div className='space-y-4'>
                <div className='space-y-2'>
                    <div className='flex items-center gap-4'>
                        <div className='bg-secondary text-muted-foreground flex h-20 w-20 items-center justify-center overflow-hidden rounded-full text-2xl font-semibold'>
                            JD
                        </div>
                        <div>
                            <button
                                type='button'
                                className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm'>
                                Upload New Picture
                            </button>
                            <p className='text-muted-foreground mt-1 text-xs'>JPG, GIF or PNG. 1MB max.</p>
                        </div>
                    </div>
                </div>

                <div className='grid gap-4 py-4'>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label htmlFor='name' className='text-right text-sm font-medium'>
                            Name
                        </label>
                        <input
                            id='name'
                            type='text'
                            defaultValue='John Doe'
                            className='border-input bg-background focus:ring-primary/20 col-span-3 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label htmlFor='username' className='text-right text-sm font-medium'>
                            Username
                        </label>
                        <input
                            id='username'
                            type='text'
                            defaultValue='johndoe'
                            className='border-input bg-background focus:ring-primary/20 col-span-3 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label htmlFor='email' className='text-right text-sm font-medium'>
                            Email
                        </label>
                        <input
                            id='email'
                            type='email'
                            defaultValue='john.doe@example.com'
                            className='border-input bg-background focus:ring-primary/20 col-span-3 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                        />
                    </div>
                    <div className='grid grid-cols-4 items-center gap-4'>
                        <label htmlFor='bio' className='text-right text-sm font-medium'>
                            Bio
                        </label>
                        <textarea
                            id='bio'
                            defaultValue="I'm a software developer based in New York City."
                            className='border-input bg-background focus:ring-primary/20 col-span-3 flex w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                            rows={4}
                        />
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button
                        type='button'
                        className='bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium'>
                        <Save className='h-4 w-4' />
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
}

function NotificationsSettings() {
    return (
        <div className='space-y-6'>
            <div>
                <h3 className='text-lg font-medium'>Notifications</h3>
                <p className='text-muted-foreground text-sm'>Configure how you receive notifications and updates.</p>
            </div>
            <div className='space-y-6'>
                <div>
                    <h4 className='mb-3 text-sm font-medium'>Email Notifications</h4>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-0.5'>
                                <label htmlFor='marketing-emails' className='text-sm font-medium'>
                                    Marketing emails
                                </label>
                                <p className='text-muted-foreground text-xs'>
                                    Receive emails about new products, features, and more.
                                </p>
                            </div>
                            <label className='relative inline-flex cursor-pointer items-center'>
                                <input
                                    id='marketing-emails'
                                    type='checkbox'
                                    value=''
                                    className='peer sr-only'
                                    defaultChecked
                                />
                                <div className="peer bg-muted peer-checked:bg-primary h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-0.5'>
                                <label htmlFor='security-alerts' className='text-sm font-medium'>
                                    Security alerts
                                </label>
                                <p className='text-muted-foreground text-xs'>
                                    Receive emails for suspicious login attempts and security recommendations.
                                </p>
                            </div>
                            <label className='relative inline-flex cursor-pointer items-center'>
                                <input
                                    id='security-alerts'
                                    type='checkbox'
                                    value=''
                                    className='peer sr-only'
                                    defaultChecked
                                />
                                <div className="peer bg-muted peer-checked:bg-primary h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-0.5'>
                                <label htmlFor='account-activity' className='text-sm font-medium'>
                                    Account activity
                                </label>
                                <p className='text-muted-foreground text-xs'>
                                    Receive emails for account changes, updates and reminders.
                                </p>
                            </div>
                            <label className='relative inline-flex cursor-pointer items-center'>
                                <input id='account-activity' type='checkbox' value='' className='peer sr-only' />
                                <div className="peer bg-muted peer-checked:bg-primary h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className='mb-3 text-sm font-medium'>Push Notifications</h4>
                    <div className='space-y-3'>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-0.5'>
                                <label htmlFor='new-features' className='text-sm font-medium'>
                                    New features
                                </label>
                                <p className='text-muted-foreground text-xs'>
                                    Get notified when we release new features and updates.
                                </p>
                            </div>
                            <label className='relative inline-flex cursor-pointer items-center'>
                                <input
                                    id='new-features'
                                    type='checkbox'
                                    value=''
                                    className='peer sr-only'
                                    defaultChecked
                                />
                                <div className="peer bg-muted peer-checked:bg-primary h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='space-y-0.5'>
                                <label htmlFor='task-reminders' className='text-sm font-medium'>
                                    Task reminders
                                </label>
                                <p className='text-muted-foreground text-xs'>
                                    Receive reminders about upcoming and overdue tasks.
                                </p>
                            </div>
                            <label className='relative inline-flex cursor-pointer items-center'>
                                <input id='task-reminders' type='checkbox' value='' className='peer sr-only' />
                                <div className="peer bg-muted peer-checked:bg-primary h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                            </label>
                        </div>
                    </div>
                </div>

                <div className='flex justify-end'>
                    <button
                        type='button'
                        className='bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium'>
                        <Save className='h-4 w-4' />
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
}

function AccountSettings() {
    return (
        <div className='space-y-6'>
            <div>
                <h3 className='text-lg font-medium'>Account Settings</h3>
                <p className='text-muted-foreground text-sm'>Manage your account preferences and security settings.</p>
            </div>
            <div className='space-y-6'>
                <div>
                    <h4 className='mb-3 text-sm font-medium'>Change Password</h4>
                    <div className='space-y-4'>
                        <div className='grid gap-2'>
                            <label htmlFor='current-password' className='text-sm font-medium'>
                                Current Password
                            </label>
                            <input
                                id='current-password'
                                type='password'
                                className='border-input bg-background focus:ring-primary/20 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='new-password' className='text-sm font-medium'>
                                New Password
                            </label>
                            <input
                                id='new-password'
                                type='password'
                                className='border-input bg-background focus:ring-primary/20 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                            />
                        </div>
                        <div className='grid gap-2'>
                            <label htmlFor='confirm-password' className='text-sm font-medium'>
                                Confirm Password
                            </label>
                            <input
                                id='confirm-password'
                                type='password'
                                className='border-input bg-background focus:ring-primary/20 flex h-10 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
                            />
                        </div>
                        <div className='flex justify-end'>
                            <button
                                type='button'
                                className='bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium'>
                                Update Password
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className='mb-3 text-sm font-medium'>Account Management</h4>
                    <div className='border-muted rounded-md border p-4'>
                        <div className='space-y-4'>
                            <div className='space-y-1'>
                                <h5 className='text-sm font-medium'>Export Account Data</h5>
                                <p className='text-muted-foreground text-xs'>
                                    Download a copy of your data including profile information, todos, and settings.
                                </p>
                            </div>
                            <button
                                type='button'
                                className='bg-secondary text-secondary-foreground hover:bg-secondary/80 rounded-md px-4 py-2 text-sm font-medium'>
                                Export Data
                            </button>
                        </div>

                        <div className='mt-4 space-y-4 border-t pt-4'>
                            <div className='space-y-1'>
                                <h5 className='text-destructive text-sm font-medium'>Delete Account</h5>
                                <p className='text-muted-foreground text-xs'>
                                    Permanently delete your account and all associated data. This action cannot be
                                    undone.
                                </p>
                            </div>
                            <button
                                type='button'
                                className='bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-md px-4 py-2 text-sm font-medium'>
                                Delete Account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function AppearanceSettings() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [fontSize, setFontSize] = useState('2');
    const [animations, setAnimations] = useState(true);
    const [savedMessage, setSavedMessage] = useState('');

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    const handleSavePreferences = () => {
        // Save font size and animations preference (could be stored in localStorage or a backend in a real app)
        localStorage.setItem('fontSize', fontSize);
        localStorage.setItem('animations', animations.toString());

        // Show saved message
        setSavedMessage('Preferences saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    const handleThemeChange = (newTheme: string) => {
        setTheme(newTheme);
    };

    // Apply fontSize to the document root based on the slider value
    useEffect(() => {
        if (mounted) {
            const rootElement = document.documentElement;
            const sizeMap = {
                '1': '0.9',
                '2': '1',
                '3': '1.1',
                '4': '1.2',
                '5': '1.3'
            };

            rootElement.style.fontSize = `${sizeMap[fontSize]}rem`;
        }
    }, [fontSize, mounted]);

    if (!mounted) {
        return <div className='flex justify-center py-8'>Loading appearance settings...</div>;
    }

    return (
        <div className='space-y-6'>
            <div>
                <h3 className='text-lg font-medium'>Appearance</h3>
                <p className='text-muted-foreground text-sm'>Customize how the application looks and feels.</p>
            </div>

            <div className='space-y-4'>
                <div>
                    <h4 className='mb-3 text-sm font-medium'>Theme</h4>
                    <div className='grid grid-cols-3 gap-4'>
                        <button
                            type='button'
                            className={`flex cursor-pointer flex-col items-center justify-between rounded-md border p-4 ${theme === 'light' ? 'border-primary border-2' : ''}`}
                            onClick={() => handleThemeChange('light')}
                            aria-pressed={theme === 'light'}>
                            <div className='bg-background mb-3 flex h-10 w-10 items-center justify-center rounded-full'>
                                <Sun className='h-5 w-5' />
                            </div>
                            <span className='text-xs font-medium'>Light</span>
                        </button>
                        <button
                            type='button'
                            className={`flex cursor-pointer flex-col items-center justify-between rounded-md border p-4 ${theme === 'dark' ? 'border-primary border-2' : ''}`}
                            onClick={() => handleThemeChange('dark')}
                            aria-pressed={theme === 'dark'}>
                            <div className='bg-background mb-3 flex h-10 w-10 items-center justify-center rounded-full'>
                                <Moon className='h-5 w-5' />
                            </div>
                            <span className='text-xs font-medium'>Dark</span>
                        </button>
                        <button
                            type='button'
                            className={`flex cursor-pointer flex-col items-center justify-between rounded-md border p-4 ${theme === 'system' ? 'border-primary border-2' : ''}`}
                            onClick={() => handleThemeChange('system')}
                            aria-pressed={theme === 'system'}>
                            <div className='bg-background mb-3 flex h-10 w-10 items-center justify-center rounded-full'>
                                <Laptop className='h-5 w-5' />
                            </div>
                            <span className='text-xs font-medium'>System</span>
                        </button>
                    </div>
                </div>

                <div>
                    <h4 className='mb-3 text-sm font-medium'>Font Size</h4>
                    <div className='space-y-2'>
                        <div className='flex justify-between'>
                            <span className='text-sm'>A</span>
                            <span className='text-lg'>A</span>
                        </div>
                        <input
                            type='range'
                            min='1'
                            max='5'
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                            className='bg-muted h-2 w-full cursor-pointer appearance-none rounded-lg'
                        />
                    </div>
                </div>

                <div>
                    <h4 className='mb-3 text-sm font-medium'>Animation</h4>
                    <div className='flex items-center justify-between'>
                        <div className='space-y-0.5'>
                            <label htmlFor='enable-animations' className='text-sm font-medium'>
                                Enable animations
                            </label>
                            <p className='text-muted-foreground text-xs'>Show animations throughout the interface.</p>
                        </div>
                        <label className='relative inline-flex cursor-pointer items-center'>
                            <input
                                id='enable-animations'
                                type='checkbox'
                                checked={animations}
                                onChange={(e) => setAnimations(e.target.checked)}
                                className='peer sr-only'
                            />
                            <div className="peer bg-muted peer-checked:bg-primary h-6 w-11 rounded-full after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full" />
                        </label>
                    </div>
                </div>

                {savedMessage && (
                    <div className='rounded-md bg-green-100 p-3 text-sm text-green-800 dark:bg-green-800/20 dark:text-green-400'>
                        {savedMessage}
                    </div>
                )}

                <div className='flex justify-end'>
                    <button
                        type='button'
                        onClick={handleSavePreferences}
                        className='bg-primary text-primary-foreground hover:bg-primary/90 flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium'>
                        <Save className='h-4 w-4' />
                        Save Preferences
                    </button>
                </div>
            </div>
        </div>
    );
}
