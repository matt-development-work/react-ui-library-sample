import React from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Button, Props } from './Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const meta: Meta<Args> = {
  title: 'Button',
  component: Button,
  argTypes: {
    onClick: { action: 'click event' },
    id: { defaultValue: 'Button' },
    title: { defaultValue: 'Button' },
  },
};

export default meta;

const Template: Story<Props> = (args: Props) => {
  return <Button {...args} />;
};

export const Contained: Story<Props> = Template.bind({});

Contained.args = {
  children: 'Contained',
  variant: 'contained',
};

export const Outlined: Story<Props> = Template.bind({});

Outlined.args = {
  children: 'Outlined',
  variant: 'outlined',
};

const IconTemplate: Story<Props> = (args: Props) => {
  return <Button {...args}></Button>;
};

export const Icon: Story<Props> = IconTemplate.bind({});

Icon.args = {
  children: (
    <FontAwesomeIcon
      className="text-white"
      icon={faArrowDown as IconProp}
      size="sm"
    />
  ),
  round: true,
  variant: 'contained',
};
