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
      toast.error("Вы были забанены");
      return;
    }
    if (data?.token) {
      localStorage.setItem("token", data.token ?? "");
      navigate("/home", { replace: true });
    }
  }, [data?.token, data?.record.banned]);

  const { t } = useTranslation();

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
            label="Email Address"
            error={!!errors?.email}
            helperText={!!errors?.email && "Email is not valid"}
          />
          <TextField
            margin="normal"
            {...register("password", {
              required: true,
            })}
            required
            fullWidth
            label="Password"
            type="password"
            error={!!errors?.password}
            helperText={!!errors?.password && "Password is not valid"}
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
