import { useEffect, useState } from "react";

import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  MenuItem,
  Divider,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",

  width: 500,
  maxWidth: "95%",

  bgcolor: "background.paper",

  borderRadius: 3,

  boxShadow: 24,

  p: 3,
};

export default function EditUserModal({
  open,
  onClose,
  user,
  setUsers,
  setError,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    });
  }, [user]);

  const handleChange = ({ target }) => {
    setFormData((prev) => ({
      ...prev,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `http://localhost:3000/api/users/${user.id}`,
        {
          method: "PUT",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message);
      }

      setUsers((prev) =>
        prev.map((u) =>
          u.id === user.id ? result.user : u
        )
      );

      onClose();

    } catch (err) {

      setError(err.message);

    } finally {

      setLoading(false);

    }
  };

  if (!user) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <Box sx={modalStyle}>

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            variant="h5"
            fontWeight={700}
          >
            Edit User
          </Typography>

          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <Stack spacing={3}>

            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <MenuItem value="user">
                User
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>
            </TextField>

            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                variant="outlined"
                onClick={onClose}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                type="submit"
                disabled={loading}
              >
                Save Changes
              </Button>

            </Stack>

          </Stack>

        </Box>

      </Box>
    </Modal>
  );
}