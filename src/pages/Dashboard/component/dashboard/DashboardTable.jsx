import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
  } from "@mui/material";
  
  // import DashboardTableRow from "./DashboardTableRow";
  // import DashboardEmptyState from "./DashboardEmptyState";
  import DashboardTableRow from "./DashboardTableRow" ;
  // import DashboardEmptyState from "./DashboardEmptyState" ;
  import DashboardEmptyState from "./DashboardEmptyState" ;

  
  export default function DashboardTable({ users, setUsers, setError }) {
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <strong>ID</strong>
              </TableCell>
  
              <TableCell>
                <strong>Email</strong>
              </TableCell>
  
              <TableCell>
                <strong>Role</strong>
              </TableCell>
  
              <TableCell align="center">
                <strong>Actions</strong>
              </TableCell>
            </TableRow>
          </TableHead>
  
          <TableBody>
            {users.length === 0 ? (
              <DashboardEmptyState />
            ) : (
              users.map((user) => (
                <DashboardTableRow
                  key={user.id}
                  user={user}
                  setUsers={setUsers}
                  setError={setError}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }