import { useState } from "react";

import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";

// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

import DeleteUserDialog from "./DeleteUserDialog";

export default function UsersTable({
  users,
  setUsers,
  setError,
}) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setDeleteOpen(true);
  };

  const handleCloseDelete = () => {
    setDeleteOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <Table>

          <TableHead>
            <TableRow>

              <TableCell width={70}>
                <strong>ID</strong>
              </TableCell>

              <TableCell>
                <strong>Name</strong>
              </TableCell>

              <TableCell>
                <strong>Email</strong>
              </TableCell>

              <TableCell width={120}>
                <strong>Role</strong>
              </TableCell>

              <TableCell
                width={140}
                align="center"
              >
                <strong>Actions</strong>
              </TableCell>

            </TableRow>
          </TableHead>

          <TableBody>

            {users.map((user) => (
              <TableRow
                key={user.id}
                hover
              >
                <TableCell>
                  {user.id}
                </TableCell>

                <TableCell>
                  {user.name}
                </TableCell>

                <TableCell>
                  {user.email}
                </TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={user.role}
                    color={
                      user.role === "admin"
                        ? "primary"
                        : "default"
                    }
                  />
                </TableCell>

                <TableCell align="center">

                  <Tooltip title="Edit">
                    <IconButton
                      color="primary"
                    >
                      <FiEdit2 />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete">
                    <IconButton
                      color="error"
                      onClick={() =>
                        handleDeleteClick(user)
                      }
                    >
                      <FiTrash2 />
                    </IconButton>
                  </Tooltip>

                </TableCell>
              </TableRow>
            ))}

          </TableBody>

        </Table>
      </TableContainer>

      <DeleteUserDialog
        open={deleteOpen}
        onClose={handleCloseDelete}
        user={selectedUser}
        setUsers={setUsers}
        setError={setError}
      />
    </>
  );
}