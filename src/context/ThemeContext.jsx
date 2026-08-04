import { createContext, useEffect, useMemo, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

export const ThemeContext = createContext();

export function AppThemeProvider({ children }) {
  const [mode, setMode] = useState("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    console.log("theme: ", mode) ;
  }, [mode]) ;

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,

          primary: {
            main: "#0E4A52",
            contrastText: "#D8F3F5",
          },

          secondary: {
            main: "#7A8B3A",
          },

          ...(mode === "light"
            ? {
                background: {
                  default: "#F7F8F7",
                  paper: "#FFFFFF",
                },

                text: {
                  primary: "#102A2E",
                  secondary: "#5F6B6E",
                },
              }
            : {
                background: {
                  default: "#101616",
                  paper: "#1A2424",
                },

                text: {
                  primary: "#F5F5F5",
                  secondary: "#B8C2C2",
                },
              }),
        },

        shape: {
          borderRadius: 12,
        },

        typography: {
          fontFamily: "Inter, Roboto, sans-serif",

          h4: {
            fontWeight: 700,
          },

          h5: {
            fontWeight: 600,
          },

          button: {
            textTransform: "none",
            fontWeight: 600,
          },
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}