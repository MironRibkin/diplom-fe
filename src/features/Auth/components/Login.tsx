import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLoginMutation } from "../api/authApi";
import { useTranslation } from "react-i18next";
import { HeaderSelectLeague } from "../../../common/components/HeaderSelectLeague";
import { Header } from "../../../common/components/Header";

export interface ILoginForm {
  email: string;
  password: string;
}

export const Login: FC = () => {
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
    if (data?.token) {
      localStorage.setItem("token", data.token ?? "");
      navigate("/home", { replace: true });
    }
  }, [data?.token]);

  const { t } = useTranslation();

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
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
      </Container>
    </>
  );
};
