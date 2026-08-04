import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AppThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { LanguageProvider } from "./context/LanguageContext/LanguageContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppThemeProvider>
    <AuthProvider>
      <LanguageProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LanguageProvider>
    </AuthProvider>
  </AppThemeProvider>,
);
