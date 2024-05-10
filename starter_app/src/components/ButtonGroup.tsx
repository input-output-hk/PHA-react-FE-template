import * as React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface ButtonInfo {
    label: string;
    onClick: () => void;  
  }
  
  interface BasicButtonGroupProps {
    buttons: ButtonInfo[];  
  }

  export default function BasicButtonGroup({ buttons }: BasicButtonGroupProps) {
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
