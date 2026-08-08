import { Paper, Typography, Box, Button, TextField, InputAdornment } from "@mui/material";

import { FiArrowRight } from "react-icons/fi";
import { FiSearch } from "react-icons/fi";
import DashboardTable from "./UsersTable";
import DashboardEmptyState from "./DashboardEmptyState";

export default function UsersPreview({ users, setUsers, setError, onViewAll }) {
  const previewUsers = users.slice(0, 5);

  return (
    <Paper
      elevation={2}
      sx={{
        borderRadius: 3,
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flex: "row",
          mb: 3,
          alignItems: 'center'
        }}
      >
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{ marginRight: "10px" }}
        >
          Recent Users
        </Typography>

        <TextField
        type="search"
          sx={{marginRight: "10px" }}
          label="Search for user"
          variant="outlined"
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <FiSearch></FiSearch>
              </InputAdornment>
            )
          }}
        ></TextField>
      </Box>

      {users.length === 0 ? (
        <DashboardEmptyState />
      ) : (
        <>
          <DashboardTable
            users={previewUsers}
            setUsers={setUsers}
            setError={setError}
          />

          {users.length > 5 && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 3,
              }}
            >
              <Button endIcon={<FiArrowRight />} onClick={onViewAll}>
                View All Users
              </Button>
            </Box>
          )}
        </>
      )}
    </Paper>
  );
}
