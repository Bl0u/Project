import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthContext } from "../../../../context/AuthContext/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import { SocialAuthButton } from "../../../../components/SocialAuthButton";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required.")
    .email("Please enter a valid email."),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(50, "Password is too long."),
});

export function LoginForm({ setLoadingAction, loadingAction }) {
  const delay = (ms) => new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
  const [showPassword, setShowPassword] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "peter@gmail.com",
      password: "hello1234",
    },
  });

  const [loginRes, setLoginRes] = useState({
    message: "",
    type: "", // "success" | "error"
  });
  const onSubmit = async (data) => {
    setLoadingAction("login");
  
    const res = await login(data);
    
    await delay(3000)   ;
    setLoginRes({
      message: res.message,
      type: res.success ? "success" : "error",
    });
    
    if (res.success) {
      await delay(2000)   ;
      
      navigate("/home");
    }
    setLoadingAction(null) ;
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField
        label="Email"
        type="email"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        fullWidth
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography
        variant="body2"
        sx={{
          mt: 2,
          color: loginRes.type === "success" ? "success.main" : "error.main",
          fontWeight: 500,
        }}
      >
        {loginRes.message}
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link
          component={RouterLink}
          to="/forgetPassword"
          underline="hover"
          color="text.secondary"
        >
          Forgot Password?
        </Link>
      </Box>

      <SocialAuthButton
        type="submit"
        variant="contained"
        label="login"
        loading={loadingAction === "login"}
        disabled={loadingAction !== null}
      />

      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          opacity: 0.4,
          color: "text.secondary",
        }}
      >
        or
      </Typography>
    </Box>
  );
}
