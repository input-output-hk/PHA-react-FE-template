'use client';
import React, { useEffect, useRef, useState } from 'react';
import Button from './Button';
import Checkbox from './Checkbox';
import {RadioButton} from './RadioGroup';
import {IconProps} from './Icon';

interface ListItem {
  itemLabel: string;
  value: string;
  disabled?: boolean;
  suffixText?: string;
}

export interface DropdownProps {
  listItems: ListItem[];
  type?: 'checkbox' | 'radio' | 'menuItem';
  selected: string[] | string | null;
  onChange?: (selected: string[] | string | null) => void;
  btnLabel: string;
  btnIcon?: IconProps;
  size?: 'small' | 'medium';
  position?: 'left' | 'right';
}

export default function Dropdown({
  size = 'small',
  listItems,
  type = 'menuItem',
  selected,
  onChange,
  btnLabel,
  btnIcon,
  position,
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);

   useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
    console.log(selected, type);
    const listener = (event: MouseEvent) => {
        if (!openRef.current || dropdownRef.current?.contains(event.target as Node)) {
        return;
        }
        setOpen(false);
    };

    document.addEventListener("click", listener, true);
    return () => {
       document.removeEventListener("click", listener, true);
    };
  }, []);

  const handleSelect = (opt: ListItem) => {
    const value = opt.value;
    if (type === 'checkbox') {
      const current = Array.isArray(selected) ? selected : [];
      const newSelected = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      onChange?.(newSelected);
    } else {
      onChange?.(value);
    }
  };

  const handleClearAll = () => {
    onChange?.([]);
  };

  const allSelected =
    type === 'checkbox' &&
    Array.isArray(selected) &&
    selected.length === listItems.length;

  const noneSelected =
    !selected || (Array.isArray(selected) && selected.length === 0);

  const selectedOptionLabel = listItems.find((o) =>
    Array.isArray(selected)
      ? o.value === selected[0]
      : o.value === selected
  )?.itemLabel ?? btnLabel;

  let selectionText: string;
  if (type === 'checkbox') {
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
    selectionText = selected ? selectedOptionLabel : '';
  }

  const buttonLabel = selectionText.length
    ? `${btnLabel}: ${selectionText}`
    : btnLabel;

  return (
    <div ref={dropdownRef} className="relative">
        <Button
          variant="primary"
          size={size}
          onClick={() => setOpen((prev) =>  !prev)}
          content={buttonLabel}
          startIcon={btnIcon}
        />
      {open && (
        <div 
          className={`absolute ${position === 'right' && 'right-0'} ${position === 'left' && 'left-0'} mt-2 bg-containerHigh text-onSurface rounded-md shadow-lg z-1 w-max`}>
          <div className="max-h-60 overflow-y-auto p-2">
            <ul className="pl-[10px] pr-[10px] flex flex-col gap-2">
            {listItems.map((item) =>
                <li key={item.value} className="py-1 flex justify-between" onClick={() => type === 'menuItem' ?  handleSelect(item) : null}>
                  <span className="mr-4">
                    {type === 'checkbox' ? (
                        <Checkbox
                          label={item.itemLabel}
                          value={item.value}
                          disabled={item.disabled}
                          checked={(selected?.includes(item.value))}
                          onChange={() => handleSelect(item)}
                          />
                    ) : ( 
                      type === 'radio' ? (
                        <RadioButton
                          label={item.itemLabel}
                          value={item.value}
                          disabled={item.disabled}
                          checked={item.value === selected}
                          onChange={() => handleSelect(item)}
                          />
                      ) : item.itemLabel
                    )}
                  </span>
                  {item.suffixText && <span className="text-outlineVariant">{item.suffixText}</span>}
                </li>
              )}
            </ul>

            {(type === 'checkbox' && (Array.isArray(selected) && selected.length !== 0)) && (
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