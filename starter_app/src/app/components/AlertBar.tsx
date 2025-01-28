//React imports
import * as React from 'react';

//Mui imports
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

//Local components
import useStore from '../store/store'; 

export default function AlertBar() {
  const { alertInfo, changeAlertInfo } = useStore();

  const handleClose = () => { 
    changeAlertInfo({ ...alertInfo, open: false });
  };

  return (
      <Snackbar open={alertInfo.open} anchorOrigin={{vertical: 'top', horizontal: 'center'}} >
        <Alert
          severity={alertInfo.severity}
          variant="filled"
          sx={{ width: '100%' }}
          onClose={handleClose}
        >
         {alertInfo.message}
        </Alert>
      </Snackbar>
  );
}