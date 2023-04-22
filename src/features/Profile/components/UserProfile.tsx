import * as React from "react";

import {
  Avatar,
  Box,
  Breadcrumbs,
  Link,
  Paper,
  Typography,
} from "@mui/material";
import { Header } from "../../../common/components/Header";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReviewsTable } from "../../Review/components/ReviewsTable";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export function UserProfile() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Paper sx={{ width: "100%", mb: 2, height: "100%" }}>
      <Header />

      <Box margin="5px">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/Home")}
            >
              {t("breadcrumbs.Home")}
            </Link>
            <Link
              sx={{ cursor: "pointer" }}
              underline="hover"
              color="inherit"
              onClick={() => navigate("/myProfile")}
            >
              {t("breadcrumbs.profile")}
            </Link>
          </Breadcrumbs>
        </div>
      </Box>
      <Box width="100%" height="30ch" display="flex" alignItems="center">
        <Box
          borderRadius="25px"
          width="90%"
          height="100%"
          display="flex"
          alignItems="center"
          flexDirection="column"
          padding="10px"
          gap="6px"
        >
          <Avatar
            sx={{
              textAlign: "center",
              width: "120px",
              height: "120px",
            }}
          />
          <Typography variant="h3">MY NAME</Typography>
          <Typography fontSize="15px">MY EMAIL </Typography>
          <Typography variant="h6">Мои работы</Typography>
        </Box>
      </Box>
      <ReviewsTable />
    </Paper>
  );
}
