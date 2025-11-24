'use client';
import { cloneElement, ComponentProps, ReactElement, SVGProps } from 'react';
import cn from '../utils/styleUtil';
import { cva, type VariantProps } from 'class-variance-authority';

export interface IconProps extends Omit<ComponentProps<'svg'>, 'color'>, VariantProps<typeof iconVariants> {
  svg: ReactElement<SVGProps<SVGSVGElement>>;
  mode?: 'fill' | 'stroke' | 'both';
  strokeWidth?: number;
}

export default function Icon({
  svg,
  size = 'small',
  mode = 'fill',
  color = 'onSurface',
  strokeWidth = 2,
}: IconProps) {
  const classes = cn(iconVariants({ color, size }));

  const fill = mode === 'fill' || mode === 'both' ? 'currentColor' : 'none';
  const stroke = mode === 'stroke' || mode === 'both' ? 'currentColor' : 'none';

  return cloneElement(svg, {
    className: classes,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
  });
}

const iconVariants = cva('inline-block overflow-visible', {
  variants: {
    color: {
      primary: 'text-primary',
      secondary: 'text-secondary',
      surface: 'text-surface',
      onSurface: 'text-onSurface',
      onVariant: 'text-onVariant',
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