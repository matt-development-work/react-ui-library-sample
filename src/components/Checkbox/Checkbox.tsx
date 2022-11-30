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
  className?: string;
  unChecked?: IconProp;
};

interface BaseProps extends HTMLAttributes<HTMLElement> {
  checked?: boolean;
  disabled?: boolean;
  error?: boolean;
  icon?: Icon;
  label: string;
  onChange: () => void;
}

type IndeterminateProps = Omit<BaseProps, 'checked' | 'icon'> & {
  indeterminate?: boolean;
};

export type Props = BaseProps | IndeterminateProps;

export const Checkbox: ForwardRefExoticComponent<Props &
  RefAttributes<HTMLElement>> = forwardRef<HTMLElement, Props>(
  (
    { disabled = false, error = false, label, onChange, title, ...props },
    ref: ForwardedRef<HTMLElement>
  ): JSX.Element => {
    let checked: boolean;
    if ('checked' in props && props.checked !== undefined) {
      checked = props.checked;
      delete props.checked;
    } else {
      checked = false;
    }

    let icon: Icon;
    if ('icon' in props && props.icon !== undefined) {
      icon = props.icon;
      delete props.icon;
    } else {
      icon = {
        checked: faCheck as IconProp,
        className: undefined,
        unChecked: undefined,
      };
    }

    let indeterminate: boolean;
    if ('indeterminate' in props && props.indeterminate !== undefined) {
      indeterminate = props.indeterminate;
      delete props.indeterminate;
    } else {
      indeterminate = false;
    }

    const hasValue: boolean = [checked, indeterminate].includes(true);
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
          onKeyDown={(e: KeyboardEvent<HTMLElement>) => handleKeyDown(e.key)}
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
