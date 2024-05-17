import IconButton from '@mui/material/IconButton';
import { useThemeMode } from '../styles/themeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggleButton = () => {
  const { toggleTheme, mode } = useThemeMode();

  return (
    <>
    <IconButton onClick={toggleTheme} color="inherit">
        {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
    </>
  );
};

export default ThemeToggleButton;
