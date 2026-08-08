import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

import { NavLink } from "react-router-dom";

export function SideNavItem({
  label,
  path,
  icon: Icon,
}) {
  return (
    <ListItemButton
      end
      component={NavLink}
      to={path}
      sx={{
        borderRadius: 2,
        mb: 1,

        color: "text.secondary",

        "& .MuiListItemIcon-root": {
          color: "text.secondary",
        },

        "&.active": {
          bgcolor: "primary.main",
          color: "white",

          "& .MuiListItemIcon-root": {
            color: "white",
          },

          "&:hover": {
            bgcolor: "primary.dark",
          },
        },
      }}
    >
      <ListItemIcon sx={{ minWidth: 40 }}>
        {Icon && <Icon size={18} />}
      </ListItemIcon>

      <ListItemText primary={label} />
    </ListItemButton>
  );
}

export default SideNavItem;