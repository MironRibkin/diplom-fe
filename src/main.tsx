import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import { Login } from "./features/Auth/components/Login";
import { Registration } from "./features/Auth/components/Registration";
import { UserList } from "./features/Users/components/UserList";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./common/components/ProtectedRoute";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Registration />} />
          {/*<Route path="/userTable" element={<EnhancedTable />} />*/}

          <Route
            path="/home"
            element={
              // <ProtectedRoute>
              <UserList />
              // </ProtectedRoute>
            }
          />
        </Routes>
        <Toaster />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
);
