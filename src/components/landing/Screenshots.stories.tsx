import type { Meta, StoryObj } from '@storybook/react';

import { Screenshots } from './Screenshots';

const meta: Meta<typeof Screenshots> = {
    title: 'Landing/Screenshots',
    component: Screenshots,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Screenshots>;

export const Default: Story = {
    args: {}
};

export const Dark: Story = {
    parameters: {
        themes: {
            default: 'dark'
        }
    }
};
