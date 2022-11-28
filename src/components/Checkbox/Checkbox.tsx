import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  KeyboardEvent,
  RefAttributes,
} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faMinus } from '@fortawesome/free-solid-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Icon = {
  checked: IconProp;
  className: string | undefined;
  unChecked: IconProp;
};

interface BaseProps extends HTMLAttributes<HTMLSpanElement> {
  disabled?: boolean;
  error?: boolean;
  label: string;
  onChange: () => void;
}
type CheckedProps = { checked?: boolean; icon?: Icon; indeterminate?: false };
type IndeterminateProps = {
  checked?: false;
  icon?: undefined;
  indeterminate?: boolean;
};
type Props = BaseProps & (CheckedProps | IndeterminateProps);
export type CheckedVariant = BaseProps & CheckedProps;
export type IndeterminateVariant = BaseProps & IndeterminateProps;

export const Checkbox: ForwardRefExoticComponent<Props &
  RefAttributes<HTMLSpanElement>> = forwardRef<HTMLSpanElement, Props>(
  (
    {
      checked = false,
      disabled = false,
      error = false,
      icon = { checked: faCheck, unChecked: undefined },
      indeterminate = false,
      label,
      onChange,
      title,
      ...props
    },
    ref: ForwardedRef<HTMLSpanElement>
  ): JSX.Element => {
    const hasValue: boolean = checked || indeterminate;
    const ariaChecked: 'false' | 'true' | 'mixed' = !indeterminate
      ? checked
        ? 'true'
        : 'false'
      : 'mixed';
    const labelID: string = label.replace(/\s/g, '-');
    const color: string = !error ? 'emerald' : 'rose';

    const handleChange = (): void => {
      !disabled && onChange();
    };

    const handleKeyDown = (key: string): void => {
      if (!disabled && [' ', 'Enter'].includes(key)) {
        handleChange();
      }
    };

    return (
      <span className="flex" onClick={handleChange}>
        <span
          aria-checked={ariaChecked}
          aria-disabled={disabled}
          aria-invalid={error}
          aria-labelledby={labelID}
          className={`flex justify-center items-center h-4 w-4 m-1 rounded focus:outline-none focus-visible transition duration-100 ease-in-out filter${
            !icon.unChecked ? ' border border-gray-500 hover:shadow-sm' : ''
          }${
            !disabled
              ? ` ${!icon.unChecked &&
                  `border-${color}-600`} cursor-pointer hover:brightness-110`
              : ' cursor-default'
          }${hasValue ? ` ${!icon.unChecked ? `bg-${color}-600` : ''}` : ''}`}
          data-testid="checkbox"
          onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) =>
            handleKeyDown(e.key)
          }
          ref={ref}
          role="checkbox"
          tabIndex={0}
          {...props}
        >
          {icon.unChecked && !hasValue && (
            <FontAwesomeIcon
              className={`${icon.className ?? 'text-emerald-500'}`}
              icon={icon.unChecked}
              size="sm"
            />
          )}
          {hasValue && (
            <FontAwesomeIcon
              className={`${icon.className ?? 'text-white'}`}
              icon={(indeterminate ? faMinus : icon.checked) as IconProp}
              size={icon.unChecked ? 'sm' : 'xs'}
            />
          )}
        </span>
        <label className="select-none" id={labelID} onClick={handleChange}>
          <span>{label}</span>
        </label>
      </span>
    );
  }
);
