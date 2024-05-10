import * as React from 'react';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface IconButtonsProps {
    icon: React.ReactNode;  
    color: 'default' | 'primary' | 'secondary';
    disabled?: boolean;
    size?: IconButtonProps['size'];
    onClick?: React.MouseEventHandler<HTMLButtonElement>; 
  }

export default function PHAIconButton({ icon, color, disabled, size='medium', onClick }: IconButtonsProps) {
  return (
      <IconButton color={color} disabled={disabled} size={size} onClick={onClick} disableFocusRipple disableRipple>
        {icon}
      </IconButton>
  );
}
