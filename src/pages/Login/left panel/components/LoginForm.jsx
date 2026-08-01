import { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  InputAdornment,
  Link,
  Typography,
} from "@mui/material";

import LoadingButton from "@mui/lab/LoadingButton";

import { Visibility, VisibilityOff, Send } from "@mui/icons-material";

import { Link as RouterLink } from "react-router-dom";
import { SocialAuthButton } from "../../../../components/SocialAuthButton";

export function LoginForm({ setLoadingAction, loadingAction }) {
  const [showPassword, setShowPassword] = useState(false);

  const handleBtnClick = () => {
    setLoadingAction("login");

    setTimeout(() => {
      setLoadingAction(null);
    }, 2000);
  };

  return (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <TextField label="Email" type="email" color="primary" fullWidth />

      <TextField
        label="Password"
        type={showPassword ? "text" : "password"}
        color="primary"
        fullWidth
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
      variant="contained"
        label="Login"
        loading={loadingAction === "login"}
        onClick={handleBtnClick}
        disabled={loadingAction !== null}
      ></SocialAuthButton>

      <Typography
        sx={{
          display: "flex",
          justifyContent: "center",
          opacity: "40%",
          color: "text.secondary",
        }}
      >
        or
      </Typography>
    </Box>
  );
}
