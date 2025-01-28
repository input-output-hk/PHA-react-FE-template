//React imports
import React, {useState} from 'react';

//Mui imports
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface AlertProps {
    severity: 'success' | 'error' | 'info' | 'warning';
    message: string;
}

export default function AlertBar({severity, message}: AlertProps) {
const [open, setOpen] = useState(false);

const handleClose = () => { 
  setOpen(false);
};

  return (
      <Snackbar open={open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} >
        <Alert
          severity={severity}
          variant="filled"
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
         {message}
        </Alert>
      </Snackbar>
  );
}