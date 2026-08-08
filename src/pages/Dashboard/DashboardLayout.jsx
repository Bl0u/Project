import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

import { SideNavbar } from "./component/SideNavbar/SideNavbar";

export default function DashboardLayout() {
  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 64px)",
        overflow: "hidden",
      }}
    >
      <SideNavbar />

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          overflowY: "auto",
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}