import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface PHAButtonProps {
    disabled?: boolean;
    size?: ButtonProps['size'];
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    variant?: ButtonProps['variant']; 
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; 
    type?: "button" | "submit" | "reset";
  }

  export default function PHACommonButton({ disabled, size='medium', fullWidth, startIcon, variant='contained', text, type="button", onClick }: PHAButtonProps) {
    return (
      <Button disabled={disabled} size={size} fullWidth={fullWidth} startIcon={startIcon} variant={variant} disableFocusRipple disableRipple onClick={onClick} type={type}>{text}</Button>
    );
  }