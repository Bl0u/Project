import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AppThemeProvider } from "./context/ThemeContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppThemeProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppThemeProvider>
);