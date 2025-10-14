'use client';
import React, { useState, useEffect, ComponentProps, ChangeEvent } from 'react';
import Icon from './Icon';
import cn from '../utils/styleUtil';
import { CheckIcon } from '@heroicons/react/24/solid';

interface CheckboxProps extends Omit<ComponentProps<'input'>, 'size'> {
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
    size?: 'small' | 'medium';
}

export default function Checkbox({
    label,
    checked,
    defaultChecked = false,
    onChange,
    size,
    ...props
}: CheckboxProps) {
    const isControlledByParent = checked !== undefined;
    const [internalChecked, setInternalChecked] = useState(defaultChecked);

    useEffect(() => {
        if (isControlledByParent) {
            setInternalChecked(checked);
        }
    }, [checked, isControlledByParent]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!isControlledByParent) {
            setInternalChecked(event.target.checked);
        }
        onChange?.(event);
    };

    const checkboxSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <label className="flex items-center gap-2">
            <input
                type="checkbox"
                className="peer absolute opacity-0 "
                checked={internalChecked}
                onChange={handleChange}
                {...props}
            />
            <span className={cn(
                    'relative flex items-center justify-center border-[1.75px] border-outline rounded-xs peer-checked:bg-primary peer-checked:border-none peer-disabled:opacity-50 peer-disabled:pointer-events-none',
                    checkboxSize
                )}>
                {internalChecked && (
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