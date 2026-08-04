import { useContext, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Stack,
  TextField,
} from "@mui/material";
import { AuthContext } from "../../../context/AuthContext/AuthContext";

export default function AddUserForm({
  setUsers,
  setError,
  onCancel,
}) {
  const { accessToken } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUsers((prev) => [...prev, result.user]);

      setEmail("");
      setPassword("");

      onCancel();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Stack spacing={2}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          fullWidth
        />

        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          fullWidth
        />

        <Box display="flex" gap={2}>
          <Button
            variant="contained"
            onClick={createUser}
          >
            Create
          </Button>

          <Button
            variant="outlined"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Box>
      </Stack>
    </Paper>
  );
}