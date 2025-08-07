import React from 'react';
import type { TextAlign, FontWeight } from '@/types';
import { TEXT_VARIANTS, TEXT_COLORS } from '@/types';

export type TextVariant = (typeof TEXT_VARIANTS)[keyof typeof TEXT_VARIANTS];
export type TextColor = (typeof TEXT_COLORS)[keyof typeof TEXT_COLORS];

export interface TextProps {
  variant?: TextVariant;
  color?: TextColor;
  weight?: FontWeight;
  align?: TextAlign;
  truncate?: boolean;
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

const variantClasses: Record<TextVariant, string> = {
  [TEXT_VARIANTS.H1]: 'text-3xl font-bold',
  [TEXT_VARIANTS.H2]: 'text-xl font-semibold',
  [TEXT_VARIANTS.H3]: 'text-lg font-semibold',
  [TEXT_VARIANTS.H4]: 'text-base font-semibold',
  [TEXT_VARIANTS.BODY]: 'text-sm',
  [TEXT_VARIANTS.CAPTION]: 'text-xs',
  [TEXT_VARIANTS.LABEL]: 'text-sm font-medium',
  [TEXT_VARIANTS.MONO]: 'text-sm font-mono',
};

const colorClasses: Record<TextColor, string> = {
  [TEXT_COLORS.PRIMARY]: 'text-emerald-400',
  [TEXT_COLORS.SECONDARY]: 'text-gray-300',
  [TEXT_COLORS.MUTED]: 'text-gray-400',
  [TEXT_COLORS.SUCCESS]: 'text-emerald-400',
  [TEXT_COLORS.WARNING]: 'text-yellow-400',
  [TEXT_COLORS.ERROR]: 'text-red-400',
  [TEXT_COLORS.WHITE]: 'text-white',
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
  variant = TEXT_VARIANTS.BODY,
  color = TEXT_COLORS.SECONDARY,
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
