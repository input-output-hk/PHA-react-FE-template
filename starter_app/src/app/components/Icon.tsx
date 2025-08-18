'use client';
import React from 'react';
import cn from '../utils/styleUtil';
import { cva, type VariantProps } from 'class-variance-authority';

export interface IconProps extends VariantProps<typeof iconVariants> {
  svg: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  mode?: 'fill' | 'stroke';
}

export default function Icon({
  svg,
  size = 'small',
  mode = 'fill',
  color = 'onSurface',
}: IconProps) {
  const classes = cn(iconVariants({ color, size }));

  const fill = mode === 'fill' ? 'currentColor' : 'none';
  const stroke = mode === 'stroke' ? 'currentColor' : 'none';

  return React.cloneElement(svg, {
    className: classes,
    fill: fill,
    stroke: stroke,
  });
}

const iconVariants = cva('inline-block', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      surface: 'text-surface',
      onSurface: 'text-onSurface',
      error: 'text-error',
      success: 'text-success',
      tertiary: 'text-tertiary',
      text: 'text-current',
    },
    size: {
      xsmall: 'w-[16px] h-[16px]',
      small: 'w-[24px] h-[24px]',
      medium: 'w-[32px] h-[32px]',
      large: 'w-[40px] h-[40px]',
    }
  },
});