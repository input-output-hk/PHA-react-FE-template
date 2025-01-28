//React Imports
import * as React from 'react';

//MUI Imports
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

//Local components
import useStore from '../store/store'; 

export default function ProfileSwitcher() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const { currentUser, changeActiveUser } = useStore();

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (user: string) => {
    changeActiveUser(user);
    handleClose();
  };

  return (
    <>
      <Chip
        label={currentUser}
        onClick={handleClick}
        color="primary"
        deleteIcon={<KeyboardArrowDownIcon />}
        onDelete={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={() => handleSelect('Astrid')} selected={currentUser === 'Astrid'}>Astrid</MenuItem>
        <MenuItem onClick={() => handleSelect('Bartholomew')}  selected={currentUser === 'Bartholomew'}>Bartholomew</MenuItem>
        <MenuItem onClick={() => handleSelect('Clementine')} selected={currentUser === 'Clementine'}>Clementine</MenuItem>
      </Menu>
    </>
  );
}