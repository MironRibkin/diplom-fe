import * as React from "react";
import { FC, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateUserMutation } from "../api/authApi";
import { useTranslation } from "react-i18next";
import { HeaderSelectLeague } from "../../../common/components/HeaderSelectLeague";
import { IRegistrationApi } from "../api/authApi";
import { Header } from "../../../common/components/Header";
// export interface IRegistrationForm {
//   userName: string;
//   // lastName: string;
//   email: string;
//   password: string;
// }

export const Registration: FC = () => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationApi>();
  const [registration, { isSuccess, data }] = useCreateUserMutation();

  const onSubmit: SubmitHandler<IRegistrationApi> = (payload) => {
    registration(payload);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/login", { replace: true });
    }
  }, [isSuccess, data]);

  return (
    <>
      <Header />
      <Container component="main" maxWidth="xs">
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
                    pattern: /^[A-Za-z]+$/i,
                  })}
                  required
                  fullWidth
                  autoFocus
                  label="Name"
                  error={!!errors?.userName}
                  helperText={!!errors?.userName && "Name is not valid"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", {
                    required: true,
                  })}
                  required
                  fullWidth
                  label="Email Address"
                  error={!!errors?.email}
                  helperText={!!errors?.email && "Email is not valid"}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("auth.registration.title")}
            </Button>
            <Grid container display="flex" justifyContent="space-between">
              <Grid item>
                <Link to="/login">{t("auth.registration.login")}</Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
