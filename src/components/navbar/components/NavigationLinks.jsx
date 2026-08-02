import { Stack, Button, Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import { useContext } from "react";
export default function NavigationLinks() {
  const {isAuthenticated, logout} = useContext(AuthContext) ;

  return (
    <Stack direction="row" spacing={2}>
      <Button component={Link} to="/dashboard" color="inherit">
        Dashboard
      </Button>

      {isAuthenticated ? (
        <>
        <Button onClick={logout} component={Link} to="/login" color="inherit"> 
          log out
        </Button>
        <Avatar
          component={Link}
          to="/profile"
          sx={{ width: 32, height: 32, cursor: "pointer" }}
        />
        </>
      ) : (
        <Button component={Link} to="/login" color="inherit">
          Login
        </Button>
      )}
    </Stack>
  );
}