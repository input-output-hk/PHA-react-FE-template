'use client';
import React, { useEffect, useRef, useState, ComponentProps } from 'react';
import Button from './Button';
import Menu  from './Menu';
import {IconProps} from './Icon';

export interface DropdownProps extends ComponentProps<'div'> {
  btnLabel: string;
  btnIcon?: IconProps;
  size?: 'small' | 'medium';
  position?: 'left' | 'right';
}

export default function Dropdown({
  size = 'small',
  btnLabel,
  btnIcon,
  position,
  ...props
}: DropdownProps) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const openRef = useRef(open);

   useEffect(() => {
    openRef.current = open;
  }, [open]);

  useEffect(() => {
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


  return (
    <div ref={dropdownRef} className="relative">
        <Button
          variant="primary"
          size={size}
          onClick={() => setOpen((prev) =>  !prev)}
          content={btnLabel}
          startIcon={btnIcon}
        />
      {open && (
        <Menu scrollbar className={`mt-2 max-h-60 ${position === "left" ? 'left-0' : 'right-0'}`}>
          {props.children}
        </Menu>
      )}
    </div>
  );
}