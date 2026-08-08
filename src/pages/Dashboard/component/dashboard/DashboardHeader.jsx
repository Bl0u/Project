import {
  Box,
  Typography,
  Button,
  Stack,
} from "@mui/material";

// import AddIcon from "@mui/icons-material/Add";
import { FiPlus } from "react-icons/fi";

export default function DashboardHeader({
  usersCount,
  onAddUser,
}) {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Page title */}
      <Typography
        variant="h4"
        fontWeight={700}
        gutterBottom
      >
        Dashboard
      </Typography>

      {/* Subtitle */}
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Manage users and permissions.
      </Typography>

      {/* Users title + action */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight={600}
          >
            Users
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >
            {usersCount} registered users
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<FiPlus />}
          onClick={onAddUser}
        >
          Add User
        </Button>
      </Stack>
    </Box>
  );
}