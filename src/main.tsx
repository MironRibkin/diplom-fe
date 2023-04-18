import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Login } from "./features/Auth/components/Login";
import { Registration } from "./features/Auth/components/Registration";
import { Toaster } from "react-hot-toast";
import { AdminPage } from "./features/Admin/components/AdminPage";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import "./common/i18n";
import { Home } from "./features/home/Home";
import { UserProfile } from "./features/Profile/components/UserProfile";
import { ProtectedRoute } from "./common/components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssVarsProvider>
        <CssBaseline />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<Registration />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myProfile"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={<Home />} />
          </Routes>
          <Toaster />
        </Provider>
      </CssVarsProvider>
    </ThemeProvider>
  </BrowserRouter>
);
