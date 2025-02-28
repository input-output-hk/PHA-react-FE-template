'use client';
//React imports
import { useRef, useState } from 'react';

//Mui imports
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import UploadFileIcon from '@mui/icons-material/UploadFile';

//Local components
import ThemeToggleButton from './components/ThemeToggleButton';
import NavTabs from './components/NavTabs';
import PerDrawer from './components/PerDrawer';
import CommonButton from './components/CommonButton';
import IconButton from './components/IconButton';
import ButtonGroup  from './components/ButtonGroup';
import ControlledTextField from './components/ControlledTextField';
import UncontrolledTextField from './components/UncontrolledTextField';
import SearchBar from './components/SearchBar';

const buttons = [
  { label: 'Local File', onClick: () => console.log('Local File clicked') },
  { label: 'URL', onClick: () => console.log('URL clicked') },
  { label: 'Transaction ID', onClick: () => console.log('Transaction ID clicked') },
  { label: 'Cardano State', onClick: () => console.log('Cardano State clicked') },
];

export default function Home() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState({ name: "", email: "" });
  const isFormValid = !errors.name && !errors.email;

  const validateField = (name: "name" | "email", value: string, pattern?: string, required = false) => {
    let errorMessage = "";

    if (required && !value.trim()) {
        errorMessage = "This field is required.";
    } else if (pattern && value.trim()) {
        const regex = new RegExp(pattern);
        if (!regex.test(value)) {
            errorMessage = name === "email" ? "Must be a valid email" : "Must only contain letters";
        }
    }

    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    validateField("name", nameRef.current?.value || "", "^[a-zA-Z]+$", true);
        validateField("email", emailRef.current?.value || "", "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$", true);

        if (!isFormValid) {
            console.error("Form contains errors.");
            return;
        }

        console.log("Form Submitted Successfully!");
  };

  return (
    <Box sx={{display: 'flex', height: '100vh'}}>
      <AppBar position="fixed" sx={{marginBottom: '20px', width: `calc(100% - 200px)`, ml: `200px`}}>
        <Toolbar>
          <NavTabs />
          <ThemeToggleButton />
        </Toolbar>
      </AppBar>
      <PerDrawer />
       <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', padding: '100px 30px', display: 'flex' }}>
           <Box sx={{marginRight: '75px'}}>
            <CommonButton text="Upload local JSON file" startIcon={<UploadFileIcon />} />
            <IconButton icon={<UploadFileIcon />}/>
            <Box sx={{marginTop: '20px', marginBottom: '20px'}}>
              <ButtonGroup buttons={buttons} />
            </Box>
            <SearchBar />
          </Box>
          <Box>
            <form onSubmit={handleSubmit}>
            <Box sx={{marginTop: '20px'}}>
              <ControlledTextField initialValue={100} label="Controlled" placeholder="number" type="number" helperText="Enter Number" />
            </Box>
            <Box sx={{marginTop: '20px'}}>
              <ControlledTextField initialValue="name" label="Controlled" type="text" placeholder='name'
              helperText="Enter Name" inputRef={nameRef} onParentBlur={(value) => validateField("name", value, "^[a-zA-Z]+$", true)} parentErrorMessage={errors.name} required />
            </Box>
            <Box sx={{marginTop: '20px'}}>
              <UncontrolledTextField defaultValue="example@email.com" label="Uncontrolled" type="text" placeholder='example@email.com'
              helperText="Enter Email" inputRef={emailRef} onParentBlur={(value) => validateField("email", value, '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', true)} parentErrorMessage={errors.email} required />
            </Box>
            <Box sx={{marginTop: '20px'}}>
              <UncontrolledTextField defaultValue="****" label="Uncontrolled" placeholder="****" type="password"
              helperText="Enter Password" />
            </Box>
            <Box sx={{marginTop: '20px'}}>
              <UncontrolledTextField defaultValue="2025-03-15" label="Uncontrolled" placeholder="mm/dd/yyyy" type="date"
              helperText="Enter Date" />
            </Box>
            <Box sx={{marginTop: '20px'}}>
              <CommonButton text="Submit form" type='submit' variant='outlined' disabled={!isFormValid} />
            </Box>
            </form>
          </Box>
        </Box>
    </Box>
  );
}
