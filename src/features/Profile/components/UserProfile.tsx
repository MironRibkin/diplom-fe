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
import { useGetUserQuery } from "../../Admin/api/usersApi";
import { stringAvatar } from "../../../common/utils/stringAvatar";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export const UserProfile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data } = useGetUserQuery();

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
              {t("breadcrumbs.home")}
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
          <Avatar {...stringAvatar(data?.userName || "", data?.userName)} />
          <Typography variant="h4">{data?.userName}</Typography>
          <Typography fontSize="12px">{data?.email} </Typography>
        </Box>
      </Box>
      <Typography margin="8px" variant="h6">
        {t("profile.myReviews")}:
      </Typography>
      <ReviewsTable />
    </Paper>
  );
};
