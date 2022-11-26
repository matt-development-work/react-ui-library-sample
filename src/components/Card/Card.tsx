import React, {
  ForwardedRef,
  forwardRef,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ReactNode,
  RefAttributes,
  useMemo,
} from 'react';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  elevation?: string;
  hoverElevation?: string;
  square?: boolean;
}

export const Card: ForwardRefExoticComponent<Props &
  RefAttributes<HTMLDivElement>> = forwardRef<HTMLDivElement, Props>(
  (
    { children, className, elevation = 'md', hoverElevation, square, ...props },
    ref: ForwardedRef<HTMLDivElement>
  ): JSX.Element => {
    const rounded = useMemo<string>(() => (!square ? ' rounded' : ''), [
      square,
    ]);

    const hoverStyle = useMemo<string>(
      () =>
        hoverElevation ? ` hover:shadow-${hoverElevation} cursor-pointer` : '',
      [hoverElevation]
    );

    className = useMemo<string>(() => (className ? ` ${className}` : ''), [
      className,
    ]);

    return (
      <div
        className={`transition-shadow ease-in-out duration-500 p-2 shadow-${elevation}${hoverStyle}${rounded}${className}`}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
