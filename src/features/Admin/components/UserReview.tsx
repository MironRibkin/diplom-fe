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
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ReviewsTable } from "../../Review/components/ReviewsTable";
import { useGetUserByIdQuery } from "../../Admin/api/usersApi";
import { stringAvatar } from "../../../common/utils/stringAvatar";

function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
  event.preventDefault();
}

export const UserReview = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data: userData } = useGetUserByIdQuery(id || "");
  console.log(userData);

  return (
    <Paper sx={{ width: "100%", mb: 2, height: "100%" }}>
      <Header />
      <Box margin="10px">
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
            <Link color="inherit">{userData?.userName}</Link>
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
          <Typography variant="h5" color="error" margin="10px">
            {t("profile.account")}
          </Typography>
          <Avatar
            {...stringAvatar(userData?.userName || "", userData?.userName)}
          />
          <Typography variant="h4">{userData?.userName}</Typography>
          <Typography fontSize="12px">{userData?.email} </Typography>
        </Box>
      </Box>
      <Typography margin="8px" variant="h6">
        {t("profile.adminReview")}: {userData?.userName}
      </Typography>
      <ReviewsTable />;
    </Paper>
  );
};
