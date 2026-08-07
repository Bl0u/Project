import { useContext, useState } from "react";
import {
  Button,
  TableCell,
  TableRow,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";

export default function DashboardTableRow({
  user,
  setUsers,
  setError,
}) {
  const { accessToken } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);

  const [editedUser, setEditedUser] = useState({
    email: user.email,
    password: "",
  });

  const deleteAccount = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/users/${id}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.id !== id)
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const updateUser = async () => {
    try {
      const body = {
        email: editedUser.email,
      };

      if (editedUser.password.trim() !== "") {
        body.password = editedUser.password;
      }

      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === user.id ? result.user : u
        )
      );

      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <TableRow hover>
      <TableCell>{user.id}</TableCell>

      <TableCell>
        {isEditing ? (
          <TextField
            size="small"
            fullWidth
            value={editedUser.email}
            onChange={(e) =>
              setEditedUser((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
        ) : (
          user.email
        )}
      </TableCell>

      <TableCell>
        {isEditing ? (
          <TextField
            size="small"
            fullWidth
            type="password"
            placeholder="New password"
            value={editedUser.password}
            onChange={(e) =>
              setEditedUser((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
          />
        ) : (
          user.role
        )}
      </TableCell>

      <TableCell align="center">
        {isEditing ? (
          <>
            <Button
              size="small"
              variant="contained"
              sx={{ mr: 1 }}
              onClick={updateUser}
            >
              Update
            </Button>

            <Button
              size="small"
              color="inherit"
              variant="outlined"
              onClick={() => {
                setEditedUser({
                  email: user.email,
                  password: "",
                });

                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              size="small"
              variant="outlined"
              sx={{ mr: 1 }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>

            <Button
              size="small"
              color="error"
              variant="contained"
              onClick={() => deleteAccount(user.id)}
            >
              Delete
            </Button>
          </>
        )}
      </TableCell>
    </TableRow>
  );
}