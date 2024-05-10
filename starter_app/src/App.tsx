import React from 'react';
import './App.css';
import CommonButton from './components/CommonButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import IconButton from './components/IconButton';
import ButtonGroup  from './components/ButtonGroup';

function App() {
  const buttons = [
    { label: 'Local File', onClick: () => console.log('Local File clicked') },
    { label: 'URL', onClick: () => console.log('URL clicked') },
    { label: 'Transaction ID', onClick: () => console.log('Transaction ID clicked') },
    { label: 'Cardano State', onClick: () => console.log('Cardano State clicked') },
  ];

  return (
    <div className="App">
        <CommonButton text="Upload local JSON file" startIcon={<UploadFileIcon />} />
        <IconButton color='primary' icon={<UploadFileIcon />}/>
        <ButtonGroup buttons={buttons} />
    </div>
  );
}

export default App;
