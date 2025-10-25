'use client';
import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Checkbox from './Checkbox';
import {RadioButton} from './RadioGroup';
import {IconProps} from './Icon';


interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  suffixText?: string;
}

export interface DropdownProps {
  options: Option[];
  type?: "checkbox" | "radio" | "menuItem";
  btnLabel: string;
  startIcon?: IconProps;
  endIcon?: IconProps;
  position?: 'left' | 'right';
  size?: 'small' | 'medium';
  selected?: string[] | string | null;
  onChange?: (selected: string[] | string | null) => void;
}

const Dropdown = ({
  options,
  type = "menuItem",
  btnLabel,
  startIcon,
  endIcon,
  position = 'left',
  size = 'small',
  selected = null,
  onChange
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // keep ref in sync with state
  useEffect(() => {
    openRef.current = open;
  }, [open]);
  
  const handleSelect = (option: Option) => {
    const value = option.value;
    if (type === "checkbox") {
      // For checkbox, toggle the value in the array
      const newValues = Array.isArray(selected)
        ? selected.includes(value)
          ? selected.filter((v) => v !== value)
          : [...selected, value]
        : [value];
      onChange?.(newValues);
    } else {
      // For radio and menuItem, set the single selected value
      onChange?.(value);
    }
  };

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // !openRef.current - act if dropdown is currently open
      // ignore clicks inside the dropdown
      if (!openRef.current || dropdownRef.current?.contains(event.target as Node)) {
        return;
      }

      // clicked outside and dropdown open -> close it
      setOpen(false);
    };
    document.addEventListener("click", listener, true);
    return () => {
      document.removeEventListener("click", listener, true);
    };
  }, []); // attach exactly once

  const handleClearAll = () => {
    onChange?.([]);
  };

  const allSelected = type === "checkbox" && Array.isArray(selected) && selected.length === options.length;
  const noneSelected = !selected || (Array.isArray(selected) && selected.length === 0);

  // --- Button Label Logic ---
  const selectedOptionLabel = options.find((o) =>
    Array.isArray(selected)
      ? o.value === selected[0]
      : o.value === selected
  )?.label ?? btnLabel;
  
  let selectionText: string;
  if (type === "checkbox") {
    if (allSelected) {
      selectionText = 'All';
    } else if (noneSelected) {
      selectionText = '';
    } else if (selected.length == 1) {
        selectionText = selectedOptionLabel;
    } else {
      selectionText = `${selected.length} selected`;
    }
  } else {
    selectionText = ((Array.isArray(selected) && selected[0]) || selected) ? selectedOptionLabel : '';
  }

  const buttonLabel = selectionText.length
    ? `${btnLabel}: ${selectionText}`
    : btnLabel;

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="primary"
        size={size}
        onClick={() => setOpen((prev) =>  !prev)}
        content={buttonLabel}
        startIcon={startIcon}
        endIcon={endIcon}
      />

      {open && (
        <div 
          className={`absolute mt-2 w-max bg-containerHigh text-onSurface rounded-md shadow-lg z-1 ${position === 'right' && 'right-0'}`}>
          
          <div className="max-h-60 overflow-y-auto p-2">
            <ul className="pl-[10px] pr-[10px] flex flex-col gap-2">
            {options.map((option) =>
                <li key={option.value} className="py-1 flex justify-between" onClick={() => (type === "menuItem") ? handleSelect(option) : null}>
                  <span className="mr-4">
                    {type === 'checkbox' ? (
                        <Checkbox
                          label={option.label}
                          value={option.value}
                          checked={selected?.includes(option.value)}
                          disabled={option.disabled}
                          onChange={() => handleSelect(option)}
                          />
                    ) : ( 
                      type === "radio" ? (
                        <RadioButton
                          label={option.label}
                          value={option.value}
                          disabled={option.disabled}
                          checked={selected === option.value}
                          onChange={() => handleSelect(option)}
                          />
                      ) : option.label
                    )}
                  </span>
                  {option.suffixText && <span className="text-outlineVariant">{option.suffixText}</span>}
                </li>
            )}
            </ul>

            {((type === "checkbox") && (Array.isArray(selected) && selected.length !== 0)) && (
              <>
                <hr className="border-outline mt-[15px] mx-0 mb-[5px]" />
                <Button variant="inherit" content="Clear All" onClick={handleClearAll} fullWidth />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;