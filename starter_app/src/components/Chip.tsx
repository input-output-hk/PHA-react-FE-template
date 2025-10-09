'use client';
import React from 'react';
import cn from '../utils/styleUtil';
import { cva, type VariantProps } from 'class-variance-authority';
import Button from './Button';
import Icon from './Icon';
import type { IconProps } from './Icon';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface ChipProps extends VariantProps<typeof chipVariants> {
    label: string;
    startIcon?: IconProps;
    onDelete?: React.MouseEventHandler<HTMLButtonElement>;
    deleteIcon?: boolean;
}

export default function Chip({ 
    variant = 'outlined', 
    color, 
    size, 
    disabled = false, 
    label, 
    startIcon, 
    onDelete, 
    deleteIcon = false
}: ChipProps) {
    return (
        <div className={cn(chipVariants({variant, color, size, disabled}))}>
            {startIcon && <Icon {...startIcon} color='onVariant' size="xsmall" />}
            <span className={`overflow-hidden text-ellipsis ${startIcon ? 'pl-2' : ''} ${deleteIcon ? 'pr-2' : ''}`}>{label}</span>
            {deleteIcon && (
                <Button 
                    variant="embedded"
                    size="compact" 
                    onClick={onDelete}
                    content={{ 
                        svg: <XMarkIcon />, 
                        color: 'text', 
                        size: 'xsmall', 
                        mode: 'stroke' 
                    }}
                />
            )}
        </div>
    );
}

const chipVariants = cva('inline-flex items-center justify-center rounded-md text-xs font-medium whitespace-nowrap p-2 text-onVariant/90 hover:text-onSurface focus-within:ring-1 focus-within:ring-primary', {
    variants: {
        variant: {
            outlined: 'border border-outline-variant bg-containerLow hover:bg-container',
            filled: 'bg-containerHighest/90 hover:bg-containerHighest',
        },
        color: {
            default: 'bg-surface text-onSurface',
            primary: 'bg-primary text-onPrimary',
            success: 'bg-success text-on-success',
            warning: 'bg-warning text-on-warning',
            error: 'bg-error text-on-error',
        },
        size: {
            small: 'text-xs py-1 px-2',
            medium: 'text-sm py-2 px-3',
            large: 'text-md py-3 px-4',
        },
        disabled: {
            true: 'opacity-50 pointer-events-none',
            false: '',
        },
    },
})