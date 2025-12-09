'use client';
import { cloneElement, ComponentProps, ReactElement, SVGProps } from 'react';
import cn from '../utils/styleUtil';
import { cva, type VariantProps } from 'class-variance-authority';

export interface IconProps extends Omit<ComponentProps<'svg'>, 'color'>, VariantProps<typeof iconVariants> {
  svg: ReactElement<SVGProps<SVGSVGElement>>;
  mode?: 'fill' | 'stroke' | 'both';
  strokeWidth?: number;
  label?: string; // a11y label
  decorative?: boolean; // When true, icon is hidden from screen readers
  title?: string; // Optional title for tooltip
}

export default function Icon({
  svg,
  size = 'small',
  mode = 'fill',
  color = 'onSurface',
  strokeWidth = 2,
  label,
  decorative = false,
  title,
  ...props
}: IconProps) {
  const classes = cn(iconVariants({ color, size }));

  const fill = mode === 'fill' || mode === 'both' ? 'currentColor' : 'none';
  const stroke = mode === 'stroke' || mode === 'both' ? 'currentColor' : 'none';

  // Build accessibility props
  const a11yProps: SVGProps<SVGSVGElement> = {};

  if (decorative) {
    // Hide from screen readers when decorative
    a11yProps['aria-hidden'] = 'true';
    a11yProps['focusable'] = 'false';
  } else {
    // Meaningful icon - needs accessible name
    a11yProps['role'] = 'img';
    
    if (label) {
      a11yProps['aria-label'] = label;
    }
    
    // Allow keyboard focus if interactive (will inherit from parent)
    a11yProps['focusable'] = 'false'; // Icon itself shouldn't be focusable
  }

  return cloneElement(svg, {
    className: classes,
    fill: fill,
    stroke: stroke,
    strokeWidth: strokeWidth,
    ...a11yProps,
    ...props,
    // If title is provided, add it as a child
    children: title ? (
      <>
        <title>{title}</title>
        {svg.props.children}
      </>
    ) : svg.props.children,
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