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
  onChange?: (selected: string[] | string | null) => void;
  position?: 'left' | 'right';
}

export default function Dropdown({
  options,
  type = "menuItem",
  btnLabel,
  startIcon,
  endIcon,
  position = 'left',
  onChange
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const openRef = useRef<boolean>(false);
  const [isCheckbox, setIsCheckbox] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  const handleSelect = (opt: Option) => {
    const value = opt.value;
    if (isCheckbox) {
      const newSelected = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
      setSelected(newSelected);
      onChange?.(newSelected);
    } else {
      setSelected([value]);
      onChange?.(value);
    }
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  // keep ref in sync with state
  useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      // !openRef.current - act if dropdown is currently open
      // ignore clicks inside the dropdown
      if (!openRef.current || dropdownRef.current?.contains(event.target as Node)) {
        return;
      }

      // clicked outside and dropdown open -> close it
      setOpen(false)
    };
    document.addEventListener("mousedown", listener, true);
    return () => {
      document.removeEventListener("mousedown", listener, true);
    };
  }, []); // attach exactly once

  useEffect(() => {
    setIsCheckbox(type === "checkbox")
  }, [type]);

  const handleClearAll = () => {
    setSelected([]);
    onChange?.([]);
  };

  const allSelected = isCheckbox && selected.length === options.length;
  const noneSelected = selected.length === 0;

  // --- Button Label Logic ---
  const selectedOptionLabel = options.find((o) => o.value === selected[0])?.label ?? btnLabel
  let selectionText: string;
  if (isCheckbox) {
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
    selectionText = selected[0] ? selectedOptionLabel : '';
  }

  const buttonLabel = selectionText.length
    ? `${btnLabel}: ${selectionText}`
    : btnLabel;
    
  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="primary"
        onClick={() => setOpen((prev) =>  !prev)}
        content={buttonLabel}
        startIcon={startIcon}
        endIcon={endIcon}
      />

      {open && (
        <div 
          className={`absolute mt-1 w-max bg-container text-onSurface rounded-md shadow-lg z-1 ${position === 'right' && 'right-0'}`}>
          
          <div className="max-h-60 overflow-y-auto p-2">
            <ul className="pl-[10px] pr-[10px] flex flex-col gap-2">
            {options.map((opt) =>
                <li key={opt.value} className="py-1 flex justify-between" onClick={() => (type === "menuItem") ? handleSelect(opt) : null}>
                  <span className="mr-4">
                    {isCheckbox ? (
                        <Checkbox
                          label={opt.label}
                          value={opt.value}
                          // checked={selected.includes(opt.value)}
                          disabled={opt.disabled}
                          defaultChecked={opt.defaultChecked}
                          onChange={() => handleSelect(opt)}
                          />
                    ) : ( 
                      type === "radio" ? (
                        <RadioButton
                          label={opt.label}
                          value={opt.value}
                          disabled={opt.disabled}
                          checked={selected.includes(opt.value)}
                          onChange={() => handleSelect(opt)}
                          />
                      ) : (<>
                        {opt.label}
                      </>)
                    )}
                  </span>
                  {opt.suffixText && <span className="text-outlineVariant">{opt.suffixText}</span>}
                </li>
            )}
            </ul>

            {(isCheckbox && (selected.length !== 0)) && (
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
