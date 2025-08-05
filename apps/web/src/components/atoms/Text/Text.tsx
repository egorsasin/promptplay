import React from 'react';

export type TextVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body'
  | 'caption'
  | 'label'
  | 'mono';

export type TextColor =
  | 'primary'
  | 'secondary'
  | 'muted'
  | 'success'
  | 'warning'
  | 'error'
  | 'white';

export interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const variantClasses: Record<TextVariant, string> = {
  h1: 'text-3xl font-bold',
  h2: 'text-xl font-semibold',
  h3: 'text-lg font-semibold',
  h4: 'text-base font-semibold',
  body: 'text-sm',
  caption: 'text-xs',
  label: 'text-sm font-medium',
  mono: 'text-sm font-mono',
};

const colorClasses: Record<TextColor, string> = {
  primary: 'text-emerald-400',
  secondary: 'text-gray-300',
  muted: 'text-gray-400',
  success: 'text-emerald-400',
  warning: 'text-yellow-400',
  error: 'text-red-400',
  white: 'text-white',
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
};

const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'secondary',
  weight,
  align = 'left',
  truncate = false,
  className = '',
  children,
  as,
}) => {
  const Component = as || (variant.startsWith('h') ? variant : 'span');

  const classes = [
    variantClasses[variant],
    colorClasses[color],
    weight && weightClasses[weight],
    alignClasses[align],
    truncate && 'truncate',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return React.createElement(Component, { className: classes }, children);
};

export default Text;
