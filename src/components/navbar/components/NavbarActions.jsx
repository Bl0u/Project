import { Stack, Button } from "@mui/material";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { LanguageContext  } from "../../../context/LanguageContext/LanguageContext";

export default function NavbarActions() {

    const { mode, toggleTheme } = useContext(ThemeContext);
    const {language, toggleLanguage} = useContext(LanguageContext) ;

    const handleTranslate = () => {
        console.log("Open language menu");
      };
    
  return (
    <Stack direction="row" spacing={2}>
      {/* <Button onClick={toggleLanguage} color="inherit"> */}
        {/* Translate */}
      {/* </Button> */}

      <Button
      onClick={toggleLanguage}
      color="inherit"
    >
      {language === "en"
        ? "العربية"
        : "English"}
    </Button>

      <Button onClick={toggleTheme} color="inherit" >
        Theme Toggle
      </Button>
    </Stack>
  );
}