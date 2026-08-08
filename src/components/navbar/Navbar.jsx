import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import {Logo} from "../Logo" ;
import { Logo } from "../Logo";
import NavigationLinks from "./components/NavigationLinks";
import NavbarActions from "./components/NavbarActions";

import { Box } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext/AuthContext";

export default function Navbar() {
  const {isAuthenticated} = useContext(AuthContext)

  if (!isAuthenticated){
    return <></>
  }
  return (
    <AppBar
      position="static"
      sx={
        {
          // color: "#00000"
        }
      }
    >
      <Toolbar
        sx={
          {
            // color: "#00000"
          }
        }
      >
        <Logo />

        <Box
          sx={{ flexGrow: 1,
           }}
          sx={
            {
              // color: "#00000"
            }
          }
        />

        <NavigationLinks />

        <NavbarActions />
      </Toolbar>
    </AppBar>
  );
}
