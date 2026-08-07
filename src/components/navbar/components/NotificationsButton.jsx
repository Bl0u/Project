// import { Opacity } from "@mui/icons-material";
import { IconButton, Badge } from "@mui/material";
import { MdNotifications } from "react-icons/md";

export default function NotificationsButton() {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={7} color="error">
        <MdNotifications size={22} style={{
          opacity: 0.5
        }} />
      </Badge>
    </IconButton>
  );
}