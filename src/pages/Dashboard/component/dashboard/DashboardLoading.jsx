import { Box, CircularProgress } from "@mui/material";

export default function DashboardLoading() {
  return (
    <Box mt={8} textAlign="center">
      <CircularProgress />
    </Box>
  );
}