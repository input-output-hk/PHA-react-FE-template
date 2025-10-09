'use client';
import React from 'react';
import type { ComponentProps } from 'react';
import cn from '../utils/styleUtil';
import {cva, type VariantProps} from 'class-variance-authority';
import Icon from './Icon';
import type {IconProps} from './Icon';

interface ButtonProps extends Omit<ComponentProps<'button'>, 'content'>, VariantProps<typeof buttonVariants> {
    content: string | IconProps;
    startIcon?: IconProps;
    endIcon?: IconProps;
}

export default function Button({
    content,
    startIcon,
    endIcon,
    variant = 'primary',
    shape = 'rounded',
    size = 'medium',
    fullWidth = false,
    ...ButtonProps
}: ButtonProps) {

    return <button className={cn(buttonVariants({ variant, shape, size, fullWidth }))} {...ButtonProps}>{startIcon && <Icon size='xsmall' color='text' {...startIcon} />}{typeof content === 'string' ? content : <Icon size='xsmall' color="primary" {...content} />}{endIcon && <Icon size='xsmall' color='text' {...endIcon} />}</button>;
}

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors delay-100 duration-200 ease-in-out disabled:opacity-50 disabled:pointer-events-none', {
    variants: {
        variant: {
            primary: 'bg-primary text-surface inset-shadow-sm hover:shadow-contained-btn hover:bg-primary/80 active:bg-primary/70',
            secondary: 'bg-secondary text-surface hover:bg-secondary/80 active:bg-secondary/70',
            outlined: 'bg-transparent border border-primary text-primary hover:bg-primary/10 active:bg-primary/15',
            text: 'bg-transparent text-primary hover:bg-primary/10 active:bg-primary/15',
            icon: 'text-sm bg-primary/10 hover:bg-primary/15 active:bg-primary/20',
            embedded: 'text-sm',
            inherit: 'bg-inherit text-inherit',
        },
        shape: {
            pill: 'rounded-full',
            rounded: 'rounded-md',
            square: 'rounded-none',
        },
        size: {
            compact: 'px-0 py-0',
            small: 'px-2 py-1 text-sm',
            medium: 'px-4 py-2 text-md',
            large: 'px-6 py-3 text-lg',
        },
        fullWidth: {
            true: 'w-full',
        },
    },
});