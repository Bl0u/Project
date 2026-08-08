import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";

export  function SideNavItem({
  label,
  path,
  icon: Icon,
}) {
  return (
    <ListItemButton
      component={NavLink}
      to={path}
      sx={{
        borderRadius: 2,
        maxHeight: 40,
        mb: 1,

        "&.active": {
          bgcolor: "primary.main",
          color: "white",

          "& .MuiListItemIcon-root": {
            color: "white",
          },
        },
      }}
    >
      <ListItemIcon>
        <Icon size={18} />
      </ListItemIcon>

      <ListItemText primary={label} />
    </ListItemButton>
    // <Button>test</Button>
  );
}

export default SideNavItem