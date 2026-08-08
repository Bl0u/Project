import { IconButton, Badge } from "@mui/material";
import { MdMail } from "react-icons/md";

export default function MessagesButton() {
  return (
    <IconButton color="inherit">
      <Badge badgeContent={3} color="error" >
        <MdMail size={22} style={{
          opacity: 0.5
        }} />
      </Badge>
    </IconButton>
  );
}