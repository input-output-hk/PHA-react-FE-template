import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeModeProvider  } from './styles/themeContext.tsx';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeModeProvider>
    <CssBaseline />
    <App />
    </ThemeModeProvider>
  </StrictMode>,
)
