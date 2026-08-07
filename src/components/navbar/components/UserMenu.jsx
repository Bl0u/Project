import { Button, Avatar } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md";

import { useContext, useState } from "react";

import { AuthContext } from "../../../context/AuthContext/AuthContext";
import UserDropdown from "./UserDropdown";

export default function UserMenu() {
  const { user } = useContext(AuthContext);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleOpen}
        startIcon={
          <Avatar src="https://i.pravatar.cc/150">{user?.name}</Avatar>

        }
        endIcon={<MdKeyboardArrowDown />}
        sx={
          {
            textTransform: "capitalize"
          }
        }
      >
        {user?.name}
      </Button>

      <UserDropdown
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
    </>
  );
}