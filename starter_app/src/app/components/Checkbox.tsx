'use client';
import React from 'react';
import Icon from './Icon';
import cn from '../utils/styleUtil';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CheckboxProps {
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
    size?: 'small' | 'medium';
    variant?: 'primary' | 'primaryOutline' | 'none';
}

export default function Checkbox({
    label,
    checked,
    defaultChecked = false,
    onChange,
    disabled,
    size,
    variant = 'primary'
}: CheckboxProps) {
    const isControlled = checked !== undefined;
    const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
    const isChecked = isControlled ? checked : internalChecked;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
            setInternalChecked(event.target.checked);
        }
        onChange?.(event);
    };

    const checkboxSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <label className="flex items-center gap-2 cursor-pointer">
            <input 
                type="checkbox" 
                className="peer absolute opacity-0 " 
                {...(isControlled ? { checked: isChecked } : { defaultChecked })} 
                onChange={handleChange} 
                disabled={disabled} 
            />
            <span className={cn(
                    'relative flex items-center justify-center border-[1.75px] border-outline rounded-xs peer-checked:bg-primary peer-checked:border-none peer-disabled:opacity-50 peer-disabled:pointer-events-none',
                    checkboxSize,
                    variant === 'primary' && 'peer-checked:bg-primary peer-checked:border-none',
                    variant === 'primaryOutline' && 'peer-checked:bg-none peer-checked:border-primary'
                )}>
                {isChecked && (
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