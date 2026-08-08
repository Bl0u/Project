import { useContext, useEffect, useState } from "react";
import { Box, Alert } from "@mui/material";

import { AuthContext } from "../../../../context/AuthContext/AuthContext";

import DashboardHeader from "./DashboardHeader" ;
import UsersPreview from "./UsersPreview" ;
import UsersModal from "./UsersModal"
import AddUserModal from "./AddUserModal" ;


import DashboardLoading from "./DashboardLoading";
import DashboardAccessDenied from "./DashboardAccessDenied";
export default function Dashboard() {
  const { isAuthenticated, accessToken } =
    useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [addUserOpen, setAddUserOpen] = useState(false);
  const [usersModalOpen, setUsersModalOpen] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "http://localhost:3000/api/users",
          {
            credentials: "include",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.message);
        }

        setUsers(result.users);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [isAuthenticated, accessToken]);

  if (!isAuthenticated) {
    return <DashboardAccessDenied />;
  }

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        overflow: "hidden",
      }}
    >
      {/* DASHBOARD CONTENT */}

      <Box
        sx={{
          flex: 1,
          minWidth: 0,

          overflowY: "auto",

          py: 5,
          px: 3,
        }}
      >
        <DashboardHeader
          usersCount={users.length}
          onAddUser={() => setAddUserOpen(true)}
        />

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        )}

        <UsersPreview
          users={users}
          setUsers={setUsers}
          setError={setError}
          onViewAll={() => setUsersModalOpen(true)}
        />

        <AddUserModal
          open={addUserOpen}
          onClose={() => setAddUserOpen(false)}
          setUsers={setUsers}
          setError={setError}
        />

        <UsersModal
          open={usersModalOpen}
          onClose={() => setUsersModalOpen(false)}
          users={users}
          setUsers={setUsers}
          setError={setError}
        />
      </Box>
    </Box>
  );
}