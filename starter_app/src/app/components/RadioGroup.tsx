'use client';
import React, { useState, ComponentProps } from 'react';
import cn from '../utils/styleUtil';

interface RadioButtonProps extends Omit<ComponentProps<'input'>, 'size'> {
    value: string;
    label?: string;
    size?: 'small' | 'medium';
}

interface RadioGroupProps {
    direction?: 'row' | 'column';
    name: string;
    radioButtons: RadioButtonProps[];
    defaultChecked?: string;
}

// When using this individual Radio Button Component you will need to manage the checked state and onChange handler in the parent component.
export function RadioButton({
    value,
    label,
    checked,
    size = 'small',
    ...RadioButtonProps
}: RadioButtonProps) {
    const radioSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <label className="flex items-center gap-2">
        <input
            type="radio"
            value={value}
            className="peer absolute opacity-0"
            checked={checked}
            {...RadioButtonProps}
        />
        <span
            className={cn(
                'relative flex items-center justify-center border-[1.75px] border-outline rounded-full peer-checked:border-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none',
                radioSize
            )}
        >
            {checked && (
                <span className="w-[60%] h-[60%] bg-primary rounded-full" />
            )}
        </span>
        {label && <span className={`text-onSurface mr-4 peer-disabled:opacity-50`}>{label}</span>}
    </label>
    );
}

export default function RadioGroup({
    direction = 'column',
    radioButtons,
    defaultChecked,
}: RadioGroupProps) {
    const [selectedValue, setSelectedValue] = useState(defaultChecked);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <fieldset>
            <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col gap-2'}`}>
                {radioButtons.map((button) => (
                    <RadioButton
                        key={button.value}
                        value={button.value}
                        label={button.label}
                        checked={selectedValue === button.value}
                        onChange={handleChange}
                    />
                ))}
            </div>
        </fieldset>
    );
}
