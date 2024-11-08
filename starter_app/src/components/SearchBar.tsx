//Mui imports
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

const Search = styled("div", {
  name: "MuiSearch",
  slot: 'Root',
})``;

const SearchIconWrapper = styled("div", {
  name: "MuiSearchIcon",
  slot: 'Root',
})``;

const StyledInputBase = styled(InputBase, {
  name: "MuiSearchInput",
  slot: 'Root',
})``;

export default function SearchBar() {
  return (
    <Search>
    <SearchIconWrapper>
        <SearchIcon color='action' />
    </SearchIconWrapper>
    <StyledInputBase
        placeholder="Search…"
    />
    </Search>
  );
}
