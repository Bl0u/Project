import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { AppThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext/AuthContext";
import { LanguageProvider } from "./context/LanguageContext/LanguageContext";
import { Provider } from "react-redux";
import store from "./store" ;
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <AppThemeProvider>
        <AuthProvider>
          <LanguageProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </LanguageProvider>
        </AuthProvider>
      </AppThemeProvider>
      ,
    </Provider>
  </>,
);
