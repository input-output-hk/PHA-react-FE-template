import * as React from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

interface CommonButtonProps {
    disabled?: boolean;
    size?: ButtonProps['size'];
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    variant?: ButtonProps['variant']; 
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; 
  }

  export default function PHACommonButton({ disabled, size='medium', fullWidth, startIcon, variant='contained', text, onClick }: CommonButtonProps) {
    return (
      <Button disabled={disabled} size={size} fullWidth={fullWidth} startIcon={startIcon} variant={variant} disableFocusRipple disableRipple onClick={onClick}>{text}</Button>
    );
  }