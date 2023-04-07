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

export interface IRegistrationForm {
  firstname: string;
  // lastName: string;
  email: string;
  password: string;
}

export const Registration: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegistrationForm>();
  const [registration, { isSuccess, data }] = useCreateUserMutation();

  const onSubmit: SubmitHandler<IRegistrationForm> = (payload) => {
    registration(payload);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess && data) {
      navigate("/login", { replace: true });
    }
  }, [isSuccess, data]);

  return (
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
          Sign up
        </Typography>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register("firstname", {
                  required: true,
                  maxLength: 20,
                  pattern: /^[A-Za-z]+$/i,
                })}
                required
                fullWidth
                autoFocus
                label="First Name"
                error={!!errors?.firstname}
                helperText={!!errors?.firstname && "First Name is not valid"}
              />
            </Grid>
            {/*<Grid item xs={12} sm={6}>*/}
            {/*  <TextField*/}
            {/*    {...register("lastName", {*/}
            {/*      required: true,*/}
            {/*      maxLength: 20,*/}
            {/*      pattern: /^[A-Za-z]+$/i,*/}
            {/*    })}*/}
            {/*    required*/}
            {/*    fullWidth*/}
            {/*    label="Last Name"*/}
            {/*    error={!!errors?.lastName}*/}
            {/*    helperText={!!errors?.lastName && "Last Name is not valid"}*/}
            {/*  />*/}
            {/*</Grid>*/}
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
            Sign Up
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login"> Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
