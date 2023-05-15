import * as React from "react";
import { FC, useEffect } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { PageWrapper } from "../../../common/components/PageWrapper";
import { RegistrationForm } from "./RegistrationForm";
import { useCreateUserMutation } from "../api/authApi";

export const RegistrationPage: FC = () => {
  const { t } = useTranslation();
  const [registration, { isSuccess, data }] = useCreateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/login", { replace: true });
    }
  }, [isSuccess, data]);

  return (
    <PageWrapper>
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {t("auth.registration.title")}
        </Typography>
        <RegistrationForm registration={registration} />
      </Box>
    </PageWrapper>
  );
};
