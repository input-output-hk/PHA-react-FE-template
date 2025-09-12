'use client';
import React from 'react';
import Icon from './Icon';
import cn from '../utils/styleUtil';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CheckboxProps {
    label?: string;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    size?: 'small' | 'medium';
    value?: string;
    name?: string;
}

export default function Checkbox({
    label,
    defaultChecked = false,
    onChange,
    disabled,
    size,
    value,
    name,
}: CheckboxProps) {
    const [checked, setInternalChecked] = React.useState(defaultChecked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInternalChecked(event.target.checked);
        onChange?.(event);
    };

    const checkboxSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                className="peer absolute opacity-0 "
                checked={checked}
                onChange={handleChange}
                disabled={disabled}
                value={value}
                name={name}
            />
            <span className={cn(
                    'relative flex items-center justify-center border-[1.75px] border-outline rounded-xs peer-checked:bg-primary peer-checked:border-none peer-disabled:opacity-50 peer-disabled:pointer-events-none',
                    checkboxSize
                )}>
                {checked && (
                    <Icon
                        svg={<CheckIcon />}
                        size={size === 'small' ? 'xsmall' : 'small'}
                        color="surface"
                        mode="both"
                        strokeWidth={1.5}
                    />
                )}
            </span>
            {label && <span className='text-onSurface peer-disabled:opacity-50'>{label}</span>}
        </label>
    );
}