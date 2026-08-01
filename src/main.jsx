import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AppThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </AppThemeProvider>,
);
