import { useState, useContext } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

export default function DashboardHeader({
  usersCount,
  setUsers,
  setError,
}) {
  const { accessToken } = useContext(AuthContext);

  const [isAdding, setIsAdding] = useState(false);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const createUser = async () => {
    try {
      const response = await fetch(
        "http://localhost:3000/api/users",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(newUser),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUsers((prevUsers) => [...prevUsers, result.user]);

      setNewUser({
        email: "",
        password: "",
      });

      setIsAdding(false);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" gutterBottom>
            Users Dashboard
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
          >
            Total Users: {usersCount}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => setIsAdding((prev) => !prev)}
        >
          {isAdding ? "Cancel" : "Add User"}
        </Button>
      </Box>

      {isAdding && (
        <Paper sx={{ p: 3, mb: 3 }}>
          <Stack spacing={2}>
            <TextField
              label="Email"
              fullWidth
              value={newUser.email}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              value={newUser.password}
              onChange={(e) =>
                setNewUser((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />

            <Box display="flex" gap={2}>
              <Button
                variant="contained"
                onClick={createUser}
              >
                Create User
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  setIsAdding(false);

                  setNewUser({
                    email: "",
                    password: "",
                  });
                }}
              >
                Cancel
              </Button>
            </Box>
          </Stack>
        </Paper>
      )}
    </>
  );
}