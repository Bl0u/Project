import { Stack } from "@mui/material";
import { useState } from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithubAlt } from "react-icons/fa";

import { SocialAuthButton } from "../../../../components/SocialAuthButton";
import { loginWithGoogle } from "../../../../services/auth/googleAuth.js";
import { loginWithGitHub } from "../../../../services/auth/githubAuth.js";
export function LoginSignInOptions({ setLoadingAction, loadingAction }) {
  const handleGoogleLogin = async () => {
    setLoadingAction("google");

    try {
      const user = await loginWithGoogle();
      console.log(user);
    } finally {
      setLoadingAction(null);
    }
  };
  const handleGitHubLogin = async () => {
    setLoadingAction("github");

    try {
      const user = await loginWithGitHub();
      console.log(user);
    } finally {
      setLoadingAction(null);
    }
  };
  return (
    <Stack spacing={2}>
      <SocialAuthButton
      variant="outlined"
        icon={<FcGoogle />}
        label="Sign in with Google"
        loading={loadingAction === "google"}
        onClick={handleGoogleLogin}
        disabled={
          loadingAction !== null
        }
      />

      <SocialAuthButton
      variant="outlined"
        icon={<FaGithubAlt />}
        label="Sign in with GitHub"
        loading={loadingAction === "github"}
        onClick={handleGitHubLogin}
        disabled={
          loadingAction !== null
        }
      />
    </Stack>
  );
}

