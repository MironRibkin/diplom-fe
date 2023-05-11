import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { LoginPage } from "./features/Auth/components/LoginPage";
import { RegistrationPage } from "./features/Auth/components/RegistrationPage";
import { Toaster } from "react-hot-toast";
import { AdminPage } from "./features/Admin/components/AdminPage";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import "./common/i18n";
import { HomePage } from "./features/Home/components/HomePage";
import { UserProfilePage } from "./features/Profile/components/UserProfilePage";
import { ProtectedRoute } from "./common/components/ProtectedRoute";
import "react-mde/lib/styles/css/react-mde-all.css";
import { ReviewPage } from "./features/Review/components/ReviewPage";
import { UserReviewPage } from "./features/Admin/components/UserReviewPage";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssVarsProvider>
        <CssBaseline />
        <Provider store={store}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reviewPage/:id" element={<ReviewPage />} />
            <Route path="/signUp" element={<RegistrationPage />} />
            <Route
              path="/admin"
              element={
                <ProtectedRoute onlyAdmin>
                  <AdminPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userReview/:id"
              element={
                <ProtectedRoute onlyAdmin>
                  <UserReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/myProfile/:id"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="/home" element={<HomePage />} />
          </Routes>
          <Toaster />
        </Provider>
      </CssVarsProvider>
    </ThemeProvider>
  </BrowserRouter>
);
