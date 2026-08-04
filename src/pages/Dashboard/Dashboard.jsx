import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

import DashboardHeader from "./component/DashboardHeader";
import DashboardLoading from "./component/DashboardLoading";
import DashboardAccessDenied from "./component/DashboardAccessDenied";
import DashboardTable from "./component/DashboardTable";
import { Alert, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const { isAuthenticated, accessToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch("http://localhost:3000/api/users", {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

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
  useEffect(() => {
    console.log(users);
  }, [users]);
  if (!isAuthenticated) {
    return <DashboardAccessDenied />;
  }

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <Box p={4}>
      <Button
        component={Link}
        to="/home"
        variant="outlined"
        sx={{ mb: 3 }}
      >
        ← Back to Home
      </Button>
  
      <DashboardHeader
        usersCount={users.length}
        setUsers={setUsers}
        setError={setError}
      />
  
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
  
      <DashboardTable
        users={users}
        setUsers={setUsers}
        setError={setError}
      />
    </Box>
  );
}
