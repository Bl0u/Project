import { Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";

import { ThemeContext } from "../../../context/ThemeContext";
// import { LanguageContext } from "../../../context/LanguageContext/LanguageContext";
import { AuthContext } from "../../../context/AuthContext/AuthContext";
import MessagesButton from "./MessagesButton";
import  NotificationsButton from "./NotificationsButton";

// import UserMenu from "./UserMenu";
import UserMenu from "./UserMenu";

export default function NavbarActions() {
  const { toggleTheme } = useContext(ThemeContext);

  // const { language, toggleLanguage } = useContext(LanguageContext);

  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {isAuthenticated ? (
        <>
          <MessagesButton />
          <NotificationsButton />
          <UserMenu />
        </>
      ) : (
        <>
          <Button
            sx={{
                color: "inherit",
            }}
            component={Link}
            to="/login"
          >
            Login
          </Button>

          <Button 
          sx={{
            color: "inherit",
        }}
          component={Link} to="/register">
            Register
          </Button>
        </>
      )}
    </Stack>
  );
}
