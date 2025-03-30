import { ThemeProvider } from '@/providers/theme-provider';
import type { Meta, StoryObj } from '@storybook/react';

import { ThemeSwitcher } from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'UI/ThemeSwitcher',
    component: ThemeSwitcher,
    parameters: {
        layout: 'centered'
    },
    decorators: [
        (Story) => (
            <ThemeProvider>
                <Story />
            </ThemeProvider>
        )
    ],
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
    args: {}
};

export const Dark: Story = {
    parameters: {
        backgrounds: {
            default: 'dark'
        },
        themes: {
            default: 'dark'
        }
    }
};
