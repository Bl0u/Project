import {
    Menu,
    MenuItem,
    Divider,
  } from "@mui/material";
  
  import { Link } from "react-router-dom";
  
  import { useContext } from "react";
  
  import { AuthContext } from "../../../context/AuthContext/AuthContext";
  
  export default function UserDropdown({
    anchorEl,
    handleClose,
  }) {
  
    const { logout } = useContext(AuthContext);
  
    const open = Boolean(anchorEl);
    return (
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          component={Link}
          to="/profile"
          onClick={handleClose}
        >
          Profile
        </MenuItem>
  
        <MenuItem
          component={Link}
          to="/dashboard"
          onClick={handleClose}
        >
          Dashboard
        </MenuItem>
  
        <Divider />
  
        <MenuItem
          onClick={() => {
            logout();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    );
  }