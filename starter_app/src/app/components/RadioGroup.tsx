'use client';
import React from 'react';
import cn from '../utils/styleUtil';

interface RadioButtonProps {
    name: string;
    value: string;
    label?: string;
    checked?: boolean;
    defaultChecked?: boolean;
}

interface RadioGroupProps {
    direction?: 'row' | 'column';
    size?: 'small' | 'medium';
    radioButtons: RadioButtonProps[];
}

export default function RadioGroup({
    direction = 'column',
    size = 'small',
    radioButtons
}: RadioGroupProps) {
    const defaultSelected = radioButtons.find(btn => btn.defaultChecked)?.value ?? null;
    const [selectedValue, setSelectedValue] = React.useState<string | null>(defaultSelected);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const radioSize = size === 'small' ? 'w-[15px] h-[15px]' : 'w-[18px] h-[18px]';

    return (
        <fieldset>
            <div className={`flex ${direction === 'row' ? 'flex-row' : 'flex-col gap-2'}`}>
                {radioButtons.map((button) => (
                    <label className="flex items-center gap-2" key={button.value}>
                        <input
                            type="radio"
                            name={button.name}
                            value={button.value}
                            className="peer absolute opacity-0"
                            onChange={handleChange}
                            checked={selectedValue === button.value}
                        />
                        <span
                            className={cn(
                                'relative flex items-center justify-center border-[1.75px] border-outline rounded-full peer-checked:border-primary',
                                radioSize
                            )}
                        >
                            {selectedValue === button.value && (
                                <span className="w-[60%] h-[60%] bg-primary rounded-full" />
                            )}
                        </span>
                        {button.label && <span className={`text-onSurface ${direction === 'row' && 'mr-4'}`}>{button.label}</span>}
                    </label>
                ))}
            </div>
        </fieldset>
    );
}
