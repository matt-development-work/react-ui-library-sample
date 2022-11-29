import React, { useState } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Checkbox, CheckedProps, IndeterminateProps } from './Checkbox';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const meta: Meta<Args> = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {},
};

export default meta;

const DefaultTemplate: Story<CheckedProps> = (args: CheckedProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  args = {
    ...args,
    checked: checked,
    onChange: (): void => {
      setChecked(!checked);
    },
  };
  return <Checkbox {...args} />;
};

export const Default: Story<CheckedProps> = DefaultTemplate.bind({});

Default.args = {
  label: 'Default',
};

const Template: Story<CheckedProps> = (args: CheckedProps) => (
  <Checkbox {...args} />
);

export const Checked: Story<CheckedProps> = Template.bind({});

Checked.args = {
  checked: true,
  label: 'Checked',
};

export const Disabled: Story<CheckedProps> = Template.bind({});

Disabled.args = {
  disabled: true,
  label: 'Disabled',
};

const IndeterminateTemplate: Story<IndeterminateProps> = (
  args: IndeterminateProps
) => <Checkbox {...args} />;

export const Indeterminate: Story<IndeterminateProps> = IndeterminateTemplate.bind(
  {}
);

Indeterminate.args = {
  indeterminate: true,
  label: 'Indeterminate',
};

export const Error: Story<CheckedProps> = Template.bind({});

Error.args = {
  checked: true,
  error: true,
  label: 'Error',
};

const CustomTemplate: Story<CheckedProps> = (args: CheckedProps) => {
  const [checked, setChecked] = useState<boolean>(false);
  args = {
    ...args,
    checked: checked,
    onChange: (): void => {
      setChecked(!checked);
    },
  };
  return <Checkbox {...args} />;
};

export const Custom: Story<CheckedProps> = CustomTemplate.bind({});

Custom.args = {
  icon: {
    checked: faSolidHeart as IconProp,
    className: 'text-pink-400',
    unChecked: faRegularHeart as IconProp,
  },
  label: 'Love',
};
