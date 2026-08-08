import { Box, Typography, Divider } from "@mui/material";
import { navigationMainMenu, other } from "./navigations.jsx";
import { SideNavItem } from "./SideNavItems";

export function SideNavbar() {
  return (
    <Box
      sx={{
        width: 260,
        height: "100%",
        flexShrink: 0,

        display: "flex",
        flexDirection: "column",

        p: 2,

        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      {/* MAIN MENU */}

      <Box>
        <Typography
          fontWeight={1000}
          sx={{
            mb: 1,
            opacity: 0.5,
            fontSize: 14,
          }}
        >
          MAIN MENU
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {navigationMainMenu.map((item) => (
          <SideNavItem
            key={item.id}
            {...item}
          />
        ))}
      </Box>

      {/* OTHER */}

      <Box sx={{ mt: "auto" }}>
        <Divider sx={{ mb: 2 }} />

        <Typography
          fontWeight={1000}
          sx={{
            mb: 1,
            opacity: 0.5,
            fontSize: 14,
          }}
        >
          OTHER
        </Typography>

        {other.map((item) => (
          <SideNavItem
            key={item.id}
            {...item}
          />
        ))}
      </Box>
    </Box>
  );
}

export default SideNavbar;