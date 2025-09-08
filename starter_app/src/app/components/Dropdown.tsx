'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useFloating, offset, flip, shift, autoUpdate, useDismiss, useInteractions } from "@floating-ui/react";
import { cva, type VariantProps } from 'class-variance-authority';
import cn from '../utils/styleUtil';
import Button from './Button';
import Checkbox from './Checkbox';
// import Radio from './Radio';
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
}

export interface DropdownProps extends VariantProps<typeof dropdownVariants> {
  options: Option[];
  multi?: boolean;
  label: string;
  startIcon?: IconProps;
  endIcon?: IconProps;
  onChange?: (selected: string[] | string | null) => void;
}

export default function Dropdown({
  options,
  multi = false,
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

  const handleSelect = (value: string) => {
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
    selectionText = selected[0] ? selectedOptionLabel : label;
  }

  const buttonLabel = selectionText
    ? `${label}: ${selectionText}`
    : label;
    
  return (
    <div className={cn(dropdownVariants({ size }))}>
      <span ref={refs.setReference}>
        <Button
          variant="black"
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
          className="absolute mt-1 w-fit border border-none rounded-md shadow-lg z-10 bg-jaguar-black text-white">
          <div className="max-h-60 overflow-y-auto p-2 flex flex-col gap-2">
            <ul className="pl-[10px] pr-[30px]">
            {options.map((opt, idx) =>
                <li key={idx} className="py-1">
                    {multi ? (
                        <Checkbox
                        label={opt.label}
                        checked={selected.includes(opt.value)}
                        onChange={() => handleSelect(opt.value)}
                        />
                    ) : ( 
                        // <Radio />
                        <></>
                    )}
                </li>
            )}
            </ul>

            {(multi && (selected.length !== 0)) && (
              <>
                {/* <div className="border-t border-outline my-2" /> */}
                <hr />
                <Button variant="none" content="Clear All" onClick={handleClearAll} fullWidth />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
