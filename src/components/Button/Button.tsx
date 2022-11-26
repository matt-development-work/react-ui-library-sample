import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  ButtonHTMLAttributes,
  MouseEventHandler,
  ReactNode,
  RefAttributes,
} from 'react';

export interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLButtonElement>;
  round?: boolean;
  variant?: 'contained' | 'outlined' | 'text';
}

export const Button: ForwardRefExoticComponent<Props &
  RefAttributes<HTMLButtonElement>> = forwardRef<HTMLButtonElement, Props>(
  (
    { children, onClick, round, variant = 'contained', ...props },
    ref: ForwardedRef<HTMLButtonElement>
  ): JSX.Element => {
    const color: string = 'emerald';
    const classes: { [key: string]: string } = {
      contained: `bg-${color}-700 shadow-md hover:shadow-xl text-white`,
      outlined: `border border-${color}-500 hover:bg-${color}-100`,
      text: `hover:bg-${color}-100`,
    };
    return (
      <button
        className={`${classes[variant]}${
          round ? ' rounded-full h-8 w-8' : ''
        } p-2 transition ease-in-out duration-300 filter cursor-pointer flex justify-center items-center select-none focus:outline-none focus-visible`}
        onClick={onClick}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);
