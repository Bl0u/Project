import { Stack, Button } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
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

      <Button onClick={() => {
        console.log("test") ;
        toggleTheme() ;
      }} color="inherit" >
        Theme Toggle
      </Button>
    </Stack>
  );
}