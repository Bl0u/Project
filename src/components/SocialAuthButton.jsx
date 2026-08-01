import LoadingButton from "@mui/lab/LoadingButton";

import EmailIcon from "@mui/icons-material/Email";
import { useState } from "react";
import { Typography } from "@mui/material";
import { FaGithubAlt } from "react-icons/fa";

export function SocialAuthButton({variant, onClick, icon, label, loading, disabled}) {
  return (
    <>
      <LoadingButton
      disabled={disabled}
        variant={variant}
        // variant="contained"
        loading={loading}
        onClick={onClick}
        startIcon={icon || undefined}
        fullWidth
        sx={{
          color: variant === "contained" ? "primary.contrastText" : variant === "outlined" ? "primary.main" : "text.secondary",
        }}
      >
        {label}
      </LoadingButton>
    </>
  );
}
