'use client';
import React, {ComponentProps } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Icon from './Icon';
import Button from './Button';

interface SearchBarProps extends ComponentProps<'input'> {
    fullWidth?: boolean;
    handleClear: () => void;
}

export default function SearchBar({ fullWidth = false, placeholder = "Search…", handleClear, ...props }: SearchBarProps) {

  return (
    <div className={`flex items-center max-w-[350px] rounded-full border border-outline w-full sm:w-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <div className="flex items-center justify-center px-4 py-1 text-sm">
        <Icon svg={<MagnifyingGlassIcon />} size="xsmall" color="onSurface" mode='stroke' />
      </div>
      <input
        type="text"
        placeholder={placeholder}
        className='w-full bg-transparent text-onSurface placeholder:text-onSurface/50 outline-none transition-all p-1 text-sm'
        {...props}
        />
      <Button 
        variant="embedded"
        size='small'
        onClick={handleClear} 
        content={{ svg: <XCircleIcon />, mode: 'stroke', size: 'small', strokeWidth: 1.5, color: 'onVariant' }} 
      />
    </div>
  );
}
