import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function DashboardAccessDenied() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h5" gutterBottom>
        Access Denied
      </Typography>

      <Typography
        variant="body1"
        color="text.secondary"
        mb={3}
      >
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