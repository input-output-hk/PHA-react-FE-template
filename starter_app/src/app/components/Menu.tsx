'use client';
import React, { ComponentProps } from 'react';
import cn from '../utils/styleUtil';

export interface MenuProps extends ComponentProps<'div'> {
  scrollbar?: boolean;
  width?: 'fit-content' | 'fit-parent';
}

export interface MenuItemProps extends ComponentProps<'li'> {
  selected?: boolean;
  condensed?: boolean;
  value?: string;
  highlighted?: boolean;
}

export interface MenuDividerProps extends ComponentProps<'hr'> {
  marginTop?: boolean;
  marginBottom?: boolean;
}

export interface MenuGroupProps {
  label: string;
  children: React.ReactNode;
}

export interface MenuClearProps {
  onClear?: () => void;
  children?: React.ReactNode;
}

export default function Menu ({scrollbar, width = 'fit-content', ...props}: MenuProps) {
  return (
      <div className={cn(`absolute z-1 bg-container text-onSurface shadow-lg w-max rounded-md ${scrollbar && 'overflow-y-auto'} ${width === 'fit-content' ? 'w-max' : 'w-full'}`, props.className)}>
          <ul className='rounded-md overflow-hidden'>
              {props.children}
          </ul>
      </div>
  )
}

function MenuItem({ condensed = false, selected, highlighted, ...props }: MenuItemProps) {
  return (
    <li {...props}  
      className={cn(`px-4 hover:bg-containerHigh ${condensed ? 'py-1' : 'py-3'} ${(selected || highlighted) && 'bg-containerHighest'}`, props.className)}>
        {props.children}
    </li>
)
}

function MenuDivider ({marginTop = true, marginBottom = true}: MenuDividerProps) {
  return (
      <hr className={cn(`border-outline mx-0 ${marginTop && 'mt-[8px]'} ${marginBottom && 'mb-[8px]'}`)} />
  )
}

function MenuGroup({ label, children }: MenuGroupProps) {
  return (
    <li className="w-full">
      <div className="px-4 py-2 text-sm font-semibold bg-containerHigh text-onSurface">
        {label}
      </div>

      <ul>{children}</ul>
    </li>
  );
}

function MenuClear({ onClear, children }: MenuClearProps) {
  return (
    <div
      className="px-4 py-2 text-sm cursor-pointer hover:bg-containerHigh text-primary"
      onClick={onClear}
    >
      {children ?? 'Clear All'}
    </div>
  );
}

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;
Menu.Group = MenuGroup;
Menu.Clear = MenuClear;