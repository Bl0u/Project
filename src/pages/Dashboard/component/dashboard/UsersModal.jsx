import {
    Modal,
    Box,
    Typography,
    IconButton,
    Divider,
  } from "@mui/material";
  
  import { FiX } from "react-icons/fi";  
  import DashboardTable from "./UsersTable";
  import DashboardEmptyState from "./DashboardEmptyState";
  
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  
    width: "90%",
    maxWidth: 1200,
    maxHeight: "85vh",
  
    bgcolor: "background.paper",
  
    borderRadius: 3,
  
    boxShadow: 24,
  
    display: "flex",
    flexDirection: "column",
  };
  
  export default function UsersModal({
    open,
    onClose,
    users,
    setUsers,
    setError,
  }) {
    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <Box sx={modalStyle}>
  
          {/* Header */}
  
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
            >
              All Users
            </Typography>
  
            <IconButton onClick={onClose}>
              <FiX/>
            </IconButton>
          </Box>
  
          <Divider />
  
          {/* Scrollable Content */}
  
          <Box
            sx={{
              flex: 1,
              overflow: "auto",
              p: 3,
            }}
          >
            {users.length === 0 ? (
              <DashboardEmptyState />
            ) : (
              <DashboardTable
                users={users}
                setUsers={setUsers}
                setError={setError}
              />
            )}
          </Box>
  
        </Box>
      </Modal>
    );
  }