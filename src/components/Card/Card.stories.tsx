import React from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Card, Props } from './Card';

const meta: Meta<Args> = {
  title: 'Card',
  component: Card,
  argTypes: {
    className: { defaultValue: 'h-40 w-40 flex items-center justify-center' },
    id: { defaultValue: 'Card' },
    title: { defaultValue: 'Card' },
  },
};

export default meta;

const Template: Story<Props> = (args: Props) => {
  return <Card {...args} />;
};

export const Default: Story<Props> = Template.bind({});

export const Hover: Story<Props> = Template.bind({});

Hover.args = {
  elevation: 'md',
  hoverElevation: 'lg',
};
