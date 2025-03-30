import type { Meta, StoryObj } from '@storybook/react';

import { AccessibilityInfo } from './AccessibilityInfo';

const meta: Meta<typeof AccessibilityInfo> = {
    title: 'UI/AccessibilityInfo',
    component: AccessibilityInfo,
    parameters: {
        layout: 'centered'
    },
    tags: ['autodocs']
};

export default meta;
type Story = StoryObj<typeof AccessibilityInfo>;

export const Default: Story = {
    args: {
        componentName: 'Landing Page'
    }
};

export const ForDashboard: Story = {
    args: {
        componentName: 'Dashboard'
    }
};

export const ForForm: Story = {
    args: {
        componentName: 'Registration Form'
    }
};
