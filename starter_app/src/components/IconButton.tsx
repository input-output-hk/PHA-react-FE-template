//Mui imports
import IconButton, { IconButtonProps } from '@mui/material/IconButton';

interface IconButtonsProps {
    icon: React.ReactNode;  
    color?: 'default' | 'success' | 'primary' | 'secondary';
    disabled?: boolean;
    size?: IconButtonProps['size'];
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    onMouseDown?: React.MouseEventHandler<HTMLButtonElement>; 
  }

export default function CustomIconButton({ icon, color='primary', disabled, size='medium', onClick, onMouseDown }: IconButtonsProps) {
  return (
      <IconButton color={color} disabled={disabled} size={size} onClick={onClick} onMouseDown={onMouseDown} disableFocusRipple disableRipple>
        {icon}
      </IconButton>
  );
}