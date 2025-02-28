//Mui imports
import Button, { ButtonProps } from '@mui/material/Button';

interface CommonButtonProps {
    disabled?: boolean;
    size?: ButtonProps['size'];
    fullWidth?: boolean;
    startIcon?: React.ReactNode;
    variant?: ButtonProps['variant']; 
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>; 
    type?: "button" | "submit" | "reset";
  }

  export default function CommonButton({ disabled, size='medium', fullWidth, startIcon, variant='contained', text, type="button", onClick }: CommonButtonProps) {
    return (
      <Button disabled={disabled} size={size} fullWidth={fullWidth} startIcon={startIcon} variant={variant} disableFocusRipple disableRipple onClick={onClick} type={type}>{text}</Button>
    );
  }