import { Box, Button, Grid, Stack, TextField, Typography } from "@mui/material";
import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../api/authApi";
import { useTranslation } from "react-i18next";
import { PageWrapper } from "../../../common/components/PageWrapper";
import toast from "react-hot-toast";

export interface ILoginForm {
  email: string;
  password: string;
}

export const LoginPage: FC = () => {
  const [login, { data }] = useLoginMutation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const onSubmit: SubmitHandler<ILoginForm> = async (payload) => {
    login(payload);
  };

  useEffect(() => {
    if (data?.record.banned) {
      toast.error(t("general.toast.block"));
      return;
    }
    if (data?.token) {
      localStorage.setItem("token", data.token ?? "");
      navigate("/home", { replace: true });
    }
  }, [data?.token, data?.record.banned]);

  return (
    <PageWrapper>
      <Stack mt={6} alignItems="center">
        <Typography component="h1" variant="h5">
          {t("auth.login.title")}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            margin="normal"
            {...register("email", {
              required: true,
            })}
            required
            fullWidth
            label={t("auth.registration.email")}
            error={!!errors?.email}
            helperText={!!errors?.email && t("auth.registration.emailError")}
          />
          <TextField
            margin="normal"
            {...register("password", {
              required: true,
            })}
            required
            fullWidth
            label={t("auth.registration.password")}
            type="password"
            error={!!errors?.password}
            helperText={
              !!errors?.password && t("auth.registration.emailPassword")
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t("auth.login.title")}
          </Button>

          <Grid container display="flex" justifyContent="space-between">
            <Grid item>
              <Link to="/signUp">{t("auth.login.registration")}</Link>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </PageWrapper>
  );
};
