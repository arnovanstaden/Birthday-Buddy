import Button from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Button> = {
  title: 'Display/Button',
  component: Button,
};

export default meta;

type ButtonStory = StoryObj<typeof Button>;

export const Default: ButtonStory = {
  render: (args) => <Button {...args} />,
  name: 'Default',
  args: {

  },
};
