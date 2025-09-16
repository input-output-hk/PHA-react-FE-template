'use client';
import React from 'react';
import cn from '../utils/styleUtil';

interface RadioButtonProps {
    name?: string;
    value: string;
    label?: string;
    disabled?: boolean;
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    size?: 'small' | 'medium';
}

interface RadioGroupProps {
    direction?: 'row' | 'column';
    name: string;
    radioButtons: RadioButtonProps[];
}

export function RadioButton({
    name,
    value,
    label,
    checked,
    disabled,
    defaultChecked,
    onChange,
    size = 'small',
}: RadioButtonProps) {
    const radioSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <label className="flex items-center gap-2">
            <input
                type="radio"
                name={name}
                value={value}
                className="peer absolute opacity-0"
                checked={checked}
                defaultChecked={defaultChecked}
                onChange={onChange}
                disabled={disabled}
            />
            <span
                className={cn(
                    'relative flex items-center justify-center border-[1.75px] border-outline rounded-full peer-checked:border-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none',
                    radioSize
                )}
            >
                {(checked || defaultChecked) && (
                    <span className="w-[60%] h-[60%] bg-primary rounded-full" />
                )}
            </span>
            {label && <span className={`text-onSurface mr-4 peer-disabled:opacity-50`}>{label}</span>}
        </label>
    );
}

export default function RadioGroup({
    name,
    direction = 'column',
    radioButtons
}: RadioGroupProps) {
    const defaultSelected = radioButtons.find(btn => btn.defaultChecked)?.value ?? null;
    const [selectedValue, setSelectedValue] = React.useState<string | null>(defaultSelected);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <fieldset>
            <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col gap-2'}`}>
                {radioButtons.map((button) => (
                    <RadioButton
                        key={button.value}
                        name={name}
                        value={button.value}
                        label={button.label}
                        checked={selectedValue === button.value}
                        onChange={handleChange}
                        size={button.size}
                        disabled={button.disabled}
                    />
                ))}
            </div>
        </fieldset>
    );
}
