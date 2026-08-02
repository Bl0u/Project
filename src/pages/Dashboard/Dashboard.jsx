import { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export function Dashboard() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated) {
    return (
      <Box textAlign="center" mt={8}>
        <Typography variant="h5" gutterBottom>
          Access Denied
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={3}>
          You must be logged in to view the dashboard.
        </Typography>

        <Button
          component={Link}
          to="/login"
          variant="contained"
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h4" gutterBottom>
        Welcome to the Dashboard! 🎉
      </Typography>

      <Typography variant="body1" color="text.secondary">
        You are successfully authenticated.
      </Typography>
    </Box>
  );
}