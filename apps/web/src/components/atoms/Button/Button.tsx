import React from 'react';
import Spinner from '../Spinner';
import type { StandardSize } from '@/types';
import { BUTTON_VARIANTS } from '@/types';

export type ButtonVariant = typeof BUTTON_VARIANTS[keyof typeof BUTTON_VARIANTS];

export interface ButtonProps {
  variant?: ButtonVariant;
  size?: StandardSize;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  variant = BUTTON_VARIANTS.PRIMARY,
  size = 'md',
  loading = false,
  disabled,
  children,
  className = '',
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-emerald disabled:opacity-50 disabled:cursor-not-allowed';

  const variantClasses = {
    [BUTTON_VARIANTS.PRIMARY]:
      'bg-gradient-green text-white hover:shadow-emerald',
    [BUTTON_VARIANTS.SECONDARY]:
      'bg-dark-700 text-gray-300 border border-dark-600 hover:bg-dark-600 hover:text-white',
    [BUTTON_VARIANTS.GHOST]:
      'text-gray-400 hover:bg-dark-700 hover:text-emerald-400',
    [BUTTON_VARIANTS.DANGER]:
      'bg-red-600 text-white hover:bg-red-700 hover:shadow-lg',
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {loading && <Spinner size="sm" color="white" className="-ml-1 mr-2" />}
      {children}
    </button>
  );
};

export default Button;
