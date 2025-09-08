'use client';
import React, { useState, useRef } from 'react';
import cn from '../utils/styleUtil';
import Button from './Button';
import { XCircleIcon, ExclamationCircleIcon } from '@heroicons/react/24/outline';

interface ControlledTextFieldProps {
  initialValue?: string | number;
  placeholder?: string;
  fullWidth?: boolean;
  helperText?: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  type: 'text' | 'email' | 'number' | 'password' | 'date';
  pattern?: string;
  title?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
  parentErrorMessage?: string;
  onParentBlur?: (value: string) => void;
}

export default function ControlledTextField({
  initialValue = '',
  placeholder,
  fullWidth = false,
  helperText,
  label,
  required = false,
  disabled = false,
  type,
  pattern,
  title = '',
  inputRef,
  parentErrorMessage,
  onParentBlur,
}: ControlledTextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [value, setValue] = useState(initialValue);
  const internalRef = useRef<HTMLInputElement>(null);
  const finalRef = inputRef || internalRef;

  const hasError = !!errorMessage || !!parentErrorMessage;

  const handleFocus = () => setIsFocused(true);

  const handleSelfBlur = () => {
    setIsFocused(false);
    const val = finalRef.current?.value.trim() || '';

    if (required && !val) {
      setErrorMessage('This field is required.');
      return;
    }

    if (pattern && val) {
      const regex = new RegExp(pattern);
      if (!regex.test(val)) {
        setErrorMessage(title || 'Invalid input');
        return;
      }
    }

    setErrorMessage('');
  };

  const handleBlur = () => {
    if (onParentBlur && finalRef.current) {
      onParentBlur(finalRef.current.value);
    } else {
      handleSelfBlur();
    }
  };

  const handleClear = () => {
    setValue('');
    setTimeout(() => finalRef.current?.focus(), 0);
  };

  return (
    <div className={`mt-4 ${disabled && 'pointer-events-none opacity-50'} ${fullWidth && 'w-full'}`}>
      <div className='relative inline-flex flex-col m-0 p-0 align-top w-full'>
        <label className={cn(`absolute left-0 top-0 p-1 block truncate z-1 text-[12px] font-medium translate-x-[8px] translate-y-[-14px] bg-surface max-w-[calc(133% - 32px)] text-primary ${hasError && 'text-error'} ${disabled && 'text-onSurface'}`)}>{label}{required && ' *'}</label>
        <div className={cn(`w-full box-border flex border rounded-sm transition-colors border-outline focus-within:border-primary focus-within:ring-1 focus-within:ring-primary ${hasError && 'border-error focus-within:border-error focus-within:ring-1 focus-within:ring-error'}`)}>
          <input
            ref={finalRef}
            value={value}
            type={type}
            onChange={(e) => setValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            className='w-full border-0 bg-transparent block outline-none text-sm text-onSurface pr-0 pl-[14px] pb-[8.5px] pt-[8.5px] placeholder:text-onSurface/50 dark:scheme-dark'
            disabled={disabled}
          />
          <div className="flex align-middle">
            <Button 
              variant="embedded" 
              onMouseDown={handleClear} 
              content={hasError && !isFocused ? {svg: <ExclamationCircleIcon />, mode: 'stroke', size: 'small', strokeWidth: 1.5, color: 'error'} : { svg: <XCircleIcon />, mode: 'stroke', size: 'small', strokeWidth: 1.5, color: 'onVariant' }} />
          </div>
        </div>
        <p className={cn('text-xs mt-1', hasError ? 'text-error' : 'text-onSurface/60')}>
          {parentErrorMessage || errorMessage || helperText}
        </p>
      </div>
    </div>
  );
}