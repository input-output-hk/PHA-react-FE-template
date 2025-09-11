'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFloating, offset, flip, shift, autoUpdate, useDismiss, useInteractions } from "@floating-ui/react";
import { cva, type VariantProps } from 'class-variance-authority';
import cn from '../utils/styleUtil';
import Button from './Button';
import Checkbox from './Checkbox';
import {RadioButton} from './RadioGroup';
import {IconProps} from './Icon';

const dropdownVariants = cva('relative inline-block text-left w-full', {
  variants: {
    size: {
      small: 'text-sm',
      medium: 'text-base',
    },
  },
  defaultVariants: {
    size: 'small',
  },
});

interface Option {
  label: string;
  value: string;
  disabled?: boolean;
  defaultChecked?: boolean;
  suffixText?: string;
}

export interface DropdownProps extends VariantProps<typeof dropdownVariants> {
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
  const size = "medium";
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
      setOpen(false);
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
    document.addEventListener("click", listener, true);
    return () => {
      document.removeEventListener("click", listener, true);
    };
  });

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
    <div className={cn(dropdownVariants({ size }))}>
      <span ref={refs.setReference}>
        <Button
          variant="primary"
          size={size}
          onClick={toggleOpen}
          content={buttonLabel}
          startIcon={startIcon}
          endIcon={endIcon}
        >
        </Button>
      </span>

      {open && (
        <div 
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className="absolute mt-1 w-fit border border-none bg-container text-onSurface rounded-md shadow-lg z-10">
          
          <div className="max-h-60 overflow-y-auto p-2">
            <ul className="pl-[10px] pr-[30px] flex flex-col gap-2">
            {options.map((opt, idx) =>
                <li key={idx} className="py-1 w-full flex justify-between" onClick={() => !multi && !radio ? handleSelect(opt) : null}>
                  <span className="flex items-center gap-2 mr-4">
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
                        <span>{opt.label}</span>
                      </>)
                    )}
                  </span>
                  {opt.suffixText && <span className="text-outlineVariant">{opt.suffixText}</span>}
                </li>
            )}
            </ul>

            {(multi && (selected.length !== 0)) && (
              <>
                <hr className="border-outline mt-[10px] mx-0 mb-[5px]" />
                <Button variant="inherit" content="Clear All" onClick={handleClearAll} fullWidth />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
