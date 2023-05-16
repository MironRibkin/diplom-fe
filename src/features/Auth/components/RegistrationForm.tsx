import * as React from "react";
import { FC } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SubmitHandler, useForm } from "react-hook-form";
import { IRegistrationApi } from "../api/authApi";

interface IProps {
  registration: (payload: IRegistrationApi) => void;
}

export const RegistrationForm: FC<IProps> = ({ registration }) => {
  const { t } = useTranslation();
  const onSubmit: SubmitHandler<IRegistrationApi> = (payload) => {
    registration(payload);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationApi>();

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ mt: 3 }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            {...register("userName", {
              required: true,
              maxLength: 20,
            })}
            required
            fullWidth
            autoFocus
            label={t("auth.registration.name")}
            error={!!errors?.userName}
            helperText={!!errors?.userName && t("auth.registration.nameError")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("email", {
              required: true,
            })}
            required
            fullWidth
            label={t("auth.registration.email")}
            error={!!errors?.email}
            helperText={!!errors?.email && t("auth.registration.emailError")}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            {...register("password", {
              required: true,
            })}
            required
            fullWidth
            label={t("auth.registration.password")}
            type="password"
            error={!!errors?.password}
            helperText={
              !!errors?.password && t("auth.registration.passwordError")
            }
          />
        </Grid>
      </Grid>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        {t("auth.registration.title")}
      </Button>
      <Grid container display="flex" justifyContent="space-between">
        <Grid item>
          <Link to="/login">{t("auth.registration.login")}</Link>
        </Grid>
      </Grid>
    </Box>
  );
};
