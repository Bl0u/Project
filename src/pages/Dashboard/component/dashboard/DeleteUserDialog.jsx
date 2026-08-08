import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
  } from "@mui/material";
  
  import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
  
  
  export default function DeleteUserDialog({
    open,
    onClose,
    user,
    setUsers,
    setError,
  }) {
    const [loading, setLoading] = useState(false);
    const {accessToken} = useContext(AuthContext)
    if (!user) return null;
  
    const handleDelete = async () => {
      try {
        setLoading(true);
        setError("");
  
        const response = await fetch(
          `http://localhost:3000/api/users/${user.id}`,
          {
            method: "DELETE",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${accessToken}`
            },
          }
        );
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.message);
        }
  
        setUsers((prev) =>
          prev.filter((u) => u.id !== user.id)
        );
  
        onClose();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Dialog
        open={open}
        onClose={loading ? undefined : onClose}
        maxWidth="xs"
        fullWidth
      >
        <DialogTitle>
          Delete User
        </DialogTitle>
  
        <DialogContent>
          <DialogContentText>
            Are you sure you want to permanently delete{" "}
            <strong>{user.name}</strong>?
            <br />
            <br />
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
  
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
  
          <Button
            color="error"
            variant="contained"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }