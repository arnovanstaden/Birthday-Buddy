import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Display/Button',
  component: Button,
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Primary: ButtonStory = {
  render: (args) => <Button {...args} />,
  name: 'Primary',
  args: {
    children: 'Primary Button'
  },
};

export const Secondary: ButtonStory = {
  render: (args) => <Button {...args} />,
  name: 'Secondary',
  args: {
    children: 'Secondary Button',
    colour: 'secondary'
  },
};