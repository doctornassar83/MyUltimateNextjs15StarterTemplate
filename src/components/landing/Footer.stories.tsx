import type { Meta, StoryObj } from '@storybook/react';

import { Footer } from './Footer';

const meta: Meta<typeof Footer> = {
    title: 'Landing/Footer',
    component: Footer,
    parameters: {
        layout: 'fullscreen'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof Footer>;

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
