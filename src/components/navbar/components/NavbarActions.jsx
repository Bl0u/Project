import { ThemeContext } from "@emotion/react";
import { Stack, Button } from "@mui/material";
import { useContext } from "react";

export default function NavbarActions() {

    const { mode, toggleTheme } = useContext(ThemeContext);


    const handleTranslate = () => {
        console.log("Open language menu");
      };
    
  return (
    <Stack direction="row" spacing={2}>
      <Button onClick={handleTranslate} color="inherit">
        Translate
      </Button>

      <Button onClick={toggleTheme} color="inherit" >
        Theme Toggle
      </Button>
    </Stack>
  );
}