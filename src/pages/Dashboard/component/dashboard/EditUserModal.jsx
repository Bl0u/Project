import { useContext, useEffect, useState } from "react";

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

import { FiX } from "react-icons/fi";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
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
  const {accessToken} = useContext(AuthContext) ;

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name,
      email: user.email,
      password: user.password,
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
    console.log(formData) ;
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
            Authorization: `Bearer ${accessToken}`,
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
      aria-labelledby="edit-user-modal"
    >
      <Box sx={modalStyle}>
        {/* Header */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            id="edit-user-modal"
            variant="h5"
            fontWeight={700}
          >
            Edit User
          </Typography>

          <IconButton
            type="button"
            onClick={onClose}
          >
            <FiX />
          </IconButton>
        </Stack>

        <Divider sx={{ my: 2 }} />

        {/* Form */}
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
              fullWidth
            />

            <TextField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />

            <TextField
              select
              label="Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="user">
                User
              </MenuItem>

              <MenuItem value="admin">
                Admin
              </MenuItem>
            </TextField>

            {/* Actions */}
            <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
            >
              <Button
                type="button"
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
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}