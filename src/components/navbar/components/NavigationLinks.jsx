import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext/AuthContext";


export default function NavigationLinks() {
  const { isAuthenticated } = useContext(AuthContext);

  if (!isAuthenticated){
    return (
      <Stack direction="row" spacing={1} mr={2}>
        <Button component={Link} to="/" color="inherit">
          Home
        </Button>
  
        <Button component={Link} to="/dashboard" color="inherit">
          Dashboard
        </Button>
  
        <Button component={Link} to="/about" color="inherit">
          About
        </Button>
      </Stack>
    );
  } 

  return ;
}