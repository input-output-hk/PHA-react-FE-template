//Mui imports
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface ButtonInfo {
    label: string;
    onClick: () => void;  
  }
  
  interface ButtonGroupProps {
    buttons: ButtonInfo[];  
  }

  export default function CustomButtonGroup({ buttons }: ButtonGroupProps) {
    return (
      <ButtonGroup variant="outlined" fullWidth disableRipple>
        {buttons.map((button, index) => (
          <Button key={index} onClick={button.onClick}>
            {button.label}
          </Button>
        ))}
      </ButtonGroup>
    );
  }