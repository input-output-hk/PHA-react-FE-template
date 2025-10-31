'use client';
import type { ComponentProps } from 'react';
import Icon from './Icon';
import cn from '../utils/styleUtil';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size'> {
    label?: string;
    checked?: boolean;
    size?: 'small' | 'medium';
}

export default function Checkbox({
    label,
    checked,
    onChange,
    size,
    ...props
}: CheckboxProps) {

    const checkboxSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                className="peer absolute opacity-0 "
                checked={checked}
                onChange={onChange}
                {...props}
            />
            <span className={cn(
                    'relative flex items-center justify-center border-[1.75px] border-outline rounded-xs peer-checked:bg-primary peer-checked:border-none peer-disabled:opacity-50 peer-disabled:pointer-events-none',
                    checkboxSize
                )}>
                {checked && (
                    <Icon
                        svg={<CheckIcon />}
                        size='xsmall'
                        color="surface"
                        mode="both"
                        strokeWidth={1.5}
                    />
                )}
            </span>
            {label && <span className='text-onSurface mr-4 peer-disabled:opacity-50'>{label}</span>}
        </label>
    );
}