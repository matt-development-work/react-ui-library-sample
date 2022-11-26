import React, { useState } from 'react';
import { fireEvent, render } from '@testing-library/react';
import { composeStories } from '@storybook/testing-react';
import * as stories from './Checkbox.stories';
import { Checkbox } from './Checkbox';

const { Default } = composeStories(stories);

test('The Checkbox HTMLSpanElement input alias has role="checkbox".', () => {
  const component = render(<Default {...Default.args} />);
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('role')).toEqual('checkbox');
});

test("The Checkbox HTMLSpanElement input alias has an aria-labelledby attribute equal to its sibling HTMLLabelElement's id attribute.", () => {
  const component = render(<Default {...Default.args} />);
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  const label: HTMLLabelElement =
    checkbox.nextElementSibling as HTMLLabelElement;
  expect(checkbox.getAttribute('aria-labelledby')).toEqual(
    label.getAttribute('id')
  );
});

test('When checked, the Checkbox HTMLSpanElement input alias has state aria-checked="true".', () => {
  const component = render(
    <Checkbox
      checked
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-checked')).toEqual('true');
});

test('When not checked, the Checkbox HTMLSpanElement input alias has state aria-checked="false".', () => {
  const component = render(
    <Checkbox
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-checked')).toEqual('false');
});

test('When partially checked, the Checkbox HTMLSpanElement input alias has state aria-checked="mixed".', () => {
  const component = render(
    <Checkbox
      indeterminate
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-checked')).toEqual('mixed');
});

test('A click event on the Checkbox component changes the checked state.', () => {
  const Wrapper = (): JSX.Element => {
    const [checked, setChecked] = useState<boolean>(false);
    Default.args = {
      ...Default.args,
      checked: checked,
      onChange: (): void => {
        setChecked(!checked);
      },
    };
    return <Default {...Default.args} />;
  };
  const component = render(<Wrapper />);
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  fireEvent.click(checkbox);
  expect(checkbox.getAttribute('aria-checked')).toEqual('true');
});

test("The Checkbox HTMLSpanElement input alias's aria-invalid attribute equals the value of a truthy error prop.", () => {
  const component = render(
    <Checkbox
      error
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-invalid')).toEqual('true');
});

test("The Checkbox HTMLSpanElement input alias element's aria-invalid attribute equals the value of a falsy error prop.", () => {
  const component = render(
    <Checkbox
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-invalid')).toEqual('false');
});

test("The Checkbox HTMLSpanElement input alias's aria-disabled attribute equals the value of a truthy disabled prop.", () => {
  const component = render(
    <Checkbox
      disabled
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-disabled')).toEqual('true');
});

test("The Checkbox HTMLSpanElement input alias element's aria-disabled attribute equals the value of a falsy disabled prop.", () => {
  const component = render(
    <Checkbox
      label=""
      onChange={() => {
        return;
      }}
    />
  );
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox.getAttribute('aria-disabled')).toEqual('false');
});

test('When the Checkbox component has a truthy disabled prop, the component has the default cursor.', () => {
  const Wrapper = () => {
    Default.args = {
      ...Default.args,
      disabled: true,
    };
    return <Default {...Default.args} />;
  };
  const component = render(<Wrapper />);
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  expect(checkbox).toHaveClass('cursor-default');
});

test('When the Checkbox component has a truthy disabled prop, a click event does not change the checked state.', () => {
  const Wrapper = () => {
    const [checked, setChecked] = useState<boolean>(false);
    Default.args = {
      ...Default.args,
      checked: checked,
      disabled: true,
      onChange: (): void => {
        setChecked(!checked);
      },
    };
    return <Default {...Default.args} />;
  };
  const component = render(<Wrapper />);
  const checkbox: HTMLSpanElement = component.getByTestId(
    'checkbox'
  ) as HTMLSpanElement;
  fireEvent.click(checkbox);
  expect(checkbox.getAttribute('aria-checked')).toEqual('false');
});
