import React, { useState } from 'react';
import { Args, Meta, Story } from '@storybook/react';
import { Checkbox, CheckedVariant, IndeterminateVariant } from './Checkbox';
import { faHeart as faSolidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faRegularHeart } from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const meta: Meta<Args> = {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {},
};

export default meta;

const DefaultTemplate: Story<CheckedVariant> = (args: CheckedVariant) => {
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

export const Default: Story<CheckedVariant> = DefaultTemplate.bind({});

Default.args = {
  label: 'Default',
};

const Template: Story<CheckedVariant> = (args: CheckedVariant) => (
  <Checkbox {...args} />
);

export const Checked: Story<CheckedVariant> = Template.bind({});

Checked.args = {
  checked: true,
  label: 'Checked',
};

export const Disabled: Story<CheckedVariant> = Template.bind({});

Disabled.args = {
  disabled: true,
  label: 'Disabled',
};

const IndeterminateTemplate: Story<IndeterminateVariant | CheckedVariant> = (
  args: IndeterminateVariant | CheckedVariant
) => <Checkbox {...args} />;

export const Indeterminate: Story<
  IndeterminateVariant | CheckedVariant
> = IndeterminateTemplate.bind({});

Indeterminate.args = {
  indeterminate: true,
  label: 'Indeterminate',
};

export const Error: Story<CheckedVariant> = Template.bind({});

Error.args = {
  checked: true,
  error: true,
  label: 'Error',
};

const CustomTemplate: Story<CheckedVariant> = (args: CheckedVariant) => {
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

export const Custom: Story<CheckedVariant> = CustomTemplate.bind({});

Custom.args = {
  icon: {
    checked: faSolidHeart as IconProp,
    className: 'text-pink-400',
    unChecked: faRegularHeart as IconProp,
  },
  label: 'Love',
};
