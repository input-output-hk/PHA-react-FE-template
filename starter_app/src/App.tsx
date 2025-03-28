//React Hook Form imports
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

//Mui imports
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import UploadFileIcon from '@mui/icons-material/UploadFile';

//Local imports
import {createZodSchemaFromFields} from './types/zodFormSchemaBuilder';
import './App.css';
import CommonButton from './components/CommonButton';
import IconButton from './components/IconButton';
import ButtonGroup  from './components/ButtonGroup';
import RHFTextFieldForm from './components/RHFTextFieldForm';
import NavTabs from './components/NavTabs';
import SearchBar from './components/SearchBar';
import PerDrawer from './components/PerDrawer';
import ThemeToggleButton from './components/themeToggleButton';

const buttons = [
  { label: 'Local File', onClick: () => console.log('Local File clicked') },
  { label: 'URL', onClick: () => console.log('URL clicked') },
  { label: 'Transaction ID', onClick: () => console.log('Transaction ID clicked') },
  { label: 'Cardano State', onClick: () => console.log('Cardano State clicked') },
];

const fields = [
  { 
    defaultValue: 100,
    name: 'number', 
    label: 'RHF',
    type: 'number',
    placeholder: '0',
    helperText: 'Enter Number',
  },
  { 
    defaultValue: 'name',
    name: 'name', 
    label: 'RHF',
    type: 'string',
    placeholder: 'name',
    helperText: 'Enter Name',
    required: true 
  },
  { 
    defaultValue: 'example@email.com',
    name: 'email',
    label: 'RHF', 
    type: 'email',
    placeholder: 'example@email.com',
    helperText: 'Enter Email',
    required: true
  },
  { 
    defaultValue: '******',
    name: 'password', 
    label: 'RHF',
    type: 'password',
    placeholder: '******',
    helperText: 'Enter Password',
  },
  { 
    defaultValue: '2025-03-15',
    name: 'date', 
    label: 'RHF',
    type: 'date',
    placeholder: 'mm/dd/yyyy',
    helperText: 'Enter Date',
    required: true 
  },
];

const formSchema = createZodSchemaFromFields(fields);

const defaultValues = fields.reduce((acc, field) => {
  acc[field.name] = field.defaultValue ?? '';
  return acc;
}, {} as Record<string, any>);

function App() {
  const {
    register,
    handleSubmit,
    trigger,
    getValues,
    setError,
    setValue,
    setFocus,
    formState,
  } = useForm({
    resolver: zodResolver(formSchema), // Connect Zod schema to react-hook-form
    defaultValues, //Set default values in RHF, not in the component props when using RHFTextFieldForm component, to ensure default values sync between RHF and the UI which enables better RHF form validation support.
    mode: 'onTouched', 
  });

  const onSubmit = (data: any) => {
    console.log("Form Submitted Successfully!", data);
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
            <Box sx={{marginTop: '20px'}}>
              <ButtonGroup buttons={buttons} />
            </Box>
            <Box sx={{marginTop: '15px'}}>
            <SearchBar />
          </Box>
          </Box>
          
          <Box>
          <RHFTextFieldForm 
              fields={fields} 
              register={register} 
              handleSubmit={handleSubmit} 
              onSubmit={onSubmit} 
              trigger={trigger}
              getValues={getValues}
              setValue={setValue}
              setError={setError}
              setFocus={setFocus}
              errors={formState.errors}
              formState={formState}
              button={{text: 'Submit form'}}/>
          </Box>
        </Box>
    </Box>
  );
}

export default App
