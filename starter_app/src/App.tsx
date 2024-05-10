import React from 'react';
import './App.css';
import Button from './components/atoms/Button';
import UploadFileIcon from '@mui/icons-material/UploadFile';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button text="Upload local JSON file" fullWidth startIcon={<UploadFileIcon />} />
      </header>
    </div>
  );
}

export default App;
