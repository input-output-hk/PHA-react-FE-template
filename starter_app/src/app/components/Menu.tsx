'use client';
import React, { ComponentProps } from 'react';
import cn from '../utils/styleUtil';

export interface MenuProps extends ComponentProps<'div'> {
    scrollbar?: boolean;
    width?: 'fit-content' | 'fit-parent';
}

interface MenuItemProps extends ComponentProps<'li'> {
    selected?: boolean;
    condensed?: boolean;
}

interface MenuDividerProps extends ComponentProps<'hr'> {
    marginTop?: boolean;
    marginBottom?: boolean; 
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

function MenuItem ({condensed = false, selected, ...props}: MenuItemProps) {
    return (
        <li className={cn(`px-4 hover:bg-containerHigh ${condensed ? 'py-1' : 'py-3'} ${selected && 'bg-containerHighest'}`, props.className)}>
            {props.children}
        </li>
    )
}

function MenuDivider ({marginTop = true, marginBottom = true}: MenuDividerProps) {
    return (
        <hr className={cn(`border-outline mx-0 ${marginTop && 'mt-[8px]'} ${marginBottom && 'mb-[8px]'}`)} />
    )
}

Menu.Item = MenuItem;
Menu.Divider = MenuDivider;