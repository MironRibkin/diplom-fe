import React, { FC, ReactNode } from "react";
import { Header } from "./header/Header";
import { Box, Breadcrumbs, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface IBreadcrumb {
  url?: string | null;
  title?: string | null;
}

interface IProps {
  children: ReactNode;
  breadcrumbs?: IBreadcrumb[];
}

export const PageWrapper: FC<IProps> = ({ children, breadcrumbs }) => {
  const navigate = useNavigate();

  return (
    <Paper sx={{ width: "100%", minHeight: "100vh", height: "100%" }}>
      <Header />
      {breadcrumbs && (
        <Box margin="10px" role="presentation">
          <Breadcrumbs aria-label="breadcrumb">
            {breadcrumbs.map(({ url, title }) => (
              <Link
                key={url}
                sx={{ cursor: "pointer" }}
                underline="hover"
                color="inherit"
                onClick={url ? () => navigate(url) : undefined}
              >
                {title}
              </Link>
            ))}
          </Breadcrumbs>
        </Box>
      )}
      {children}
    </Paper>
  );
};
