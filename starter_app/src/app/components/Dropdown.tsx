'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFloating, offset, flip, shift, autoUpdate, useDismiss, useInteractions } from "@floating-ui/react";
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
  multi?: boolean;
  radio?: boolean;
  label: string;
  startIcon?: IconProps;
  endIcon?: IconProps;
  onChange?: (selected: string[] | string | null) => void;
}

export default function Dropdown({
  options,
  multi = false,
  radio = false,
  label,
  startIcon,
  endIcon,
  onChange
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>([]);

  // Floating UI
  const { refs, floatingStyles, context } = useFloating({
    placement: "bottom-start",
    middleware: [offset(6), flip(), shift()],
    open,
    onOpenChange: setOpen,   // Floating UI will control open state
    whileElementsMounted: autoUpdate, // auto reposition on resize/scroll
    strategy: "fixed"
  });

  const toggleOpen = () => setOpen((prev) => !prev);

  // Attach dismiss (outside click + escape)
  const dismiss = useDismiss(context);
  const { getFloatingProps } = useInteractions([dismiss]);

  const handleSelect = (opt: Option) => {
    const value = opt.value
    if (multi) {
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

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!dropdownRef.current || dropdownRef.current.contains(event.target as Node)) {
        return;
      }
      setOpen(false)
    };
    document.addEventListener("mousedown", listener, true);
    return () => {
      document.removeEventListener("mousedown", listener, true);
    };
  }, []);

  const handleClearAll = () => {
    setSelected([]);
    onChange?.([]);
  };

  const allSelected = multi && selected.length === options.length;
  const noneSelected = selected.length === 0;

  // --- Button Label Logic ---
  const selectedOptionLabel = options.find((o) => o.value === selected[0])?.label ?? label
  let selectionText: string;
  if (multi) {
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
    ? `${label}: ${selectionText}`
    : label;
    
  return (
    <div className="relative" ref={dropdownRef}>
      <span ref={refs.setReference}>
        <Button
          variant="primary"
          size="medium"
          onClick={toggleOpen}
          content={buttonLabel}
          startIcon={startIcon}
          endIcon={endIcon}
        />
      </span>

      {open && (
        <div 
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="absolute mt-1 w-max bg-container text-onSurface rounded-md shadow-lg z-10">
          
          <div className="max-h-60 overflow-y-auto p-2">
            <ul className="pl-[10px] pr-[10px] flex flex-col gap-2">
            {options.map((opt) =>
                <li key={opt.value} className="py-1 flex justify-between" onClick={() => !multi && !radio ? handleSelect(opt) : null}>
                  <span className="mr-4">
                    {multi ? (
                        <Checkbox
                          label={opt.label}
                          disabled={opt.disabled}
                          checked={selected.includes(opt.value)}
                          defaultChecked={opt.defaultChecked}
                          onChange={() => handleSelect(opt)}
                          />
                    ) : ( 
                      radio ? (
                        <>
                          <RadioButton
                            label={opt.label}
                            value={opt.value}
                            disabled={opt.disabled}
                            checked={selected.includes(opt.value)}
                            defaultChecked={opt.defaultChecked}
                            onChange={() => handleSelect(opt)}
                            />
                        </>
                      ) : (<>
                        {opt.label}
                      </>)
                    )}
                  </span>
                  {opt.suffixText && <span className="text-outlineVariant">{opt.suffixText}</span>}
                </li>
            )}
            </ul>

            {(multi && (selected.length !== 0)) && (
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
