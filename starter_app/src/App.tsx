//Mui imports
import { Box } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

//Local components
import useStore from './store/store';
import './App.css';
import ProfileSwitcher from './components/ProfileSwitcher';
import CommonButton from './components/CommonButton';
import IconButton from './components/IconButton';
import ButtonGroup  from './components/ButtonGroup';
import TextField from './components/TextField'
import NavTabs from './components/NavTabs';
import SearchBar from './components/SearchBar';
import PerDrawer from './components/PerDrawer';
import AlertBar from './components/AlertBar';
import ThemeToggleButton from './components/themeToggleButton';

function App() {
  const { changeAlertInfo } = useStore();
  const buttons = [
    { label: 'Local File', onClick: () => console.log('Local File clicked') },
    { label: 'URL', onClick: () => console.log('URL clicked') },
    { label: 'Transaction ID', onClick: () => console.log('Transaction ID clicked') },
    { label: 'Cardano State', onClick: () => console.log('Cardano State clicked') },
  ];

  const error = true;

  const openAlertDemo = () => {
    changeAlertInfo({ open: true, message: 'Success Alert', severity: 'success' });
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
        sx={{ flexGrow: 1, bgcolor: 'background.default', padding: '100px 30px' }}>
           <Box sx={{marginBottom: '20px'}}>
            <ProfileSwitcher />
          </Box>
          <CommonButton onClick={openAlertDemo} text="Toggler success alert" startIcon={<AccessAlarmIcon />} />
          <IconButton icon={<UploadFileIcon />}/>
          <Box sx={{marginTop: '20px'}}>
            <ButtonGroup buttons={buttons} />
          </Box>
          <Box sx={{marginTop: '20px'}}>
            <TextField defaultValue="Input" label="Label" helperText="Supporting Text" error={error}  />
          </Box>
          <Box sx={{marginTop: '15px'}}>
            <SearchBar />
          </Box>
        </Box>
        <AlertBar/>
    </Box>
  );
}

export default App
