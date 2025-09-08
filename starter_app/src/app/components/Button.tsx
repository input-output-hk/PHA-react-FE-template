'use client';
import React from 'react';
import cn from '../utils/styleUtil';
import {cva, type VariantProps} from 'class-variance-authority';
import Icon, {IconProps} from './Icon';

interface ButtonProps extends VariantProps<typeof buttonVariants> {
    content: string | IconProps;
    startIcon?: IconProps;
    endIcon?: IconProps;
    type?: 'button' | 'submit' | 'reset';
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button({
    content,
    startIcon,
    endIcon,
    variant = 'primary',
    shape = 'rounded',
    size = 'medium',
    fullWidth = false,
    disabled = false,
    type = 'button',
    onClick,
}: ButtonProps) {

    return <button className={cn(buttonVariants({ variant, shape, size, fullWidth, disabled }))} type={type} onClick={onClick}>{startIcon && <Icon size='xsmall' color='text' {...startIcon} />}{typeof content === 'string' ? content : <Icon size='xsmall' color='primary' {...content} />}{endIcon && <Icon size='xsmall' color='text' {...endIcon} />}</button>;
}

const buttonVariants = cva('inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors delay-100 duration-200 ease-in-out cursor-pointer', {
    variants: {
        variant: {
            primary: 'bg-primary text-primary-on-container inset-shadow-sm',
            secondary: 'bg-secondary text-secondary-on-container',
            outlined: 'bg-transparent border border-primary text-primary',
            text: 'bg-transparent text-primary',
            icon: 'p-2 text-sm bg-primary/10',
            black: 'bg-jaguar-black text-white',
            none: ''
        },
        shape: {
            pill: 'rounded-full',
            rounded: 'rounded-md',
            square: 'rounded-none',
        },
        size: {
            small: 'px-2 py-1 text-sm',
            medium: 'px-4 py-2 text-md',
            large: 'px-6 py-3 text-lg',
        },
        fullWidth: {
            true: 'w-full',
            false: null,
        },
        disabled: {
            true: ['opacity-50', 'cursor-not-allowed'],
            false: null,
        },
    },
    compoundVariants: [
        {
            variant: 'primary',
            disabled: false,
            className: 'hover:shadow-contained-btn hover:bg-primary/80 active:bg-primary/70',
        },
        {
            variant: 'secondary',
            disabled: false,
            className: 'hover:bg-secondary/80 active:bg-secondary/70',
        },
        {
            variant: 'outlined',
            disabled: false,
            className: 'hover:bg-primary/10 active:bg-primary/15',
        },
        {
            variant: 'text',
            disabled: false,
            className: 'hover:bg-primary/10 active:bg-primary/15',
        },
        {
            variant: 'icon',
            disabled: false,
            className: 'hover:bg-primary/15 active:bg-primary/20',
        },
        {
            variant: 'black',
            disabled: false,
            className: 'bg-black text-white hover:bg-granite-gray active:bg-granite-gray',
        },
        {
            variant: 'none',
            disabled: false,
            className: ''
        }
    ]
});