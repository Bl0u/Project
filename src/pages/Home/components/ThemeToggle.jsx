import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext.jsx";

import { IconButton } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";

export function ThemeToggle() {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme}>
      {mode === "light" ? <DarkMode /> : <LightMode />}
    </IconButton>
  );
}