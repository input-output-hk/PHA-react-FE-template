//React Imports
import * as React from 'react';

//MUI Imports
import Chip from '@mui/material/Chip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function ProfileSwitcher() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [currentUser, changeUserAccount] = React.useState('Astrid');

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget as HTMLElement);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (user: string) => {
    changeUserAccount(user);
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
        <MenuItem onClick={() => handleSelect('Astrid')}>Astrid</MenuItem>
        <MenuItem onClick={() => handleSelect('Bartholomew')}>Bartholomew</MenuItem>
        <MenuItem onClick={() => handleSelect('Clementine')}>Clementine</MenuItem>
      </Menu>
    </>
  );
}