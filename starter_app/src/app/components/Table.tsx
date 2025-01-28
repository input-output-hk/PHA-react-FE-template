//Mui imports
import { Box } from "@mui/material";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Field = [
    {
        name: 'name',
        age: 32,
        action: 'button'
    },
    {
        name: 'name',
        age: 32,
        action: 'button'
    },
    {
        name: 'name',
        age: 32,
        action: 'button'
    },
    {
        name: 'name',
        age: 32,
        action: 'button'
    },
    {
        name: 'name',
        age: 32,
        action: 'button'
    }
]

export default function WSTTable() {

  return (
    <Box className="tableContainerBox">
    <TableContainer component={Paper}>
      <Table size="small" aria-label="simple table" stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell>Name</TableCell>
          <TableCell>Age</TableCell>
          <TableCell align="right">Action</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {
          Field.map((user, i) => (
            <TableRow key={i}>
              <TableCell>
                  {user.name}
              </TableCell>
              <TableCell>
                  {user.age}
              </TableCell>
              <TableCell align="right">
                  {user.action}
              </TableCell>
            </TableRow>
          ))
        }
      </TableBody>    
    </Table>
    </TableContainer>
    </Box>
  );
}
