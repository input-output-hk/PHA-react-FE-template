'use client';
import React, {useRef } from 'react';
import { MagnifyingGlassIcon, XCircleIcon } from '@heroicons/react/24/outline';
import Icon from './Icon';
import Button from './Button';

interface SearchBarProps {
    placeholder?: string;
    fullWidth?: boolean;
    inputRef?: React.RefObject<HTMLInputElement>;
}

export default function SearchBar({ placeholder = "Search…", fullWidth = false, inputRef }: SearchBarProps) {
    const internalRef = useRef<HTMLInputElement>(null);
    const finalRef = inputRef || internalRef;

const handleClear = () => {
    if (finalRef.current) {
      finalRef.current.value = '';
      finalRef.current.focus();
    }
  };

  return (
    <div className={`flex items-center max-w-[350px] rounded-full border border-outline w-full sm:w-auto focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${fullWidth ? 'w-full' : 'w-auto'}`}>
      <div className="flex items-center justify-center px-4 py-1 text-sm">
        <Icon svg={<MagnifyingGlassIcon />} size="xsmall" color="onSurface" mode='stroke' />
      </div>
      <input
        type="text"
        //The attribute value is either the keyword off or on, or an ordered list of space-separated tokens https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/autocomplete#value
        autoComplete='on'
        // list='search-suggestions' only works with <datalist>
        placeholder={placeholder}
        ref={finalRef}
        className='w-full bg-transparent text-onSurface placeholder:text-onSurface/50 outline-none transition-all p-1 text-sm'/>
      <Button 
        variant="embedded"
        onMouseDown={handleClear} 
        content={{ svg: <XCircleIcon />, mode: 'stroke', size: 'small', strokeWidth: 1.5, color: 'onVariant' }} 
      />
    </div>
  );
}
