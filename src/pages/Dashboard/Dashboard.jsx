import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";
import Modal from "@mui/material/Modal";
import DashboardHeader from "./component/dashboard/DashboardHeader";
import DashboardLoading from "./component/dashboard/DashboardLoading";
import DashboardAccessDenied from "./component/dashboard/DashboardAccessDenied";
import DashboardTable from "./component/dashboard/DashboardTable";
import { Alert, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
export default function Dashboard() {
  const { isAuthenticated, accessToken } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((prev) => !prev);

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
  if (!isAuthenticated) {
    return <DashboardAccessDenied />;
  }

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <>
      <Button onClick={toggleOpen}>Inspect Users Data base</Button>
      <Modal
        open={open}
        onClose={toggleOpen}
                aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box p={4}>
          <Button component={Link} to="/home" variant="outlined" sx={{ mb: 3 }}>
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
      </Modal>
    </>
  );
}
