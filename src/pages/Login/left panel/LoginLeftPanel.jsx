import { Box } from "@mui/material";
import { LoginPageTopBar } from "./components/LoginPageTopBar.jsx";
import { LoginPageHeader } from "./components/LoginPageHeader.jsx";
import { LoginForm } from "./components/LoginForm.jsx";
import { LoginSignInOptions } from "./components/LoginSignInOptions.jsx";
import { Stack } from "@mui/material";
import { useState } from "react";
export function LoginLeftPanel() {
  const [loadingAction, setLoadingAction] = useState(null);

  return (
    <>
      <Box
        sx={{
          flex: 2,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 5,
        }}
      >
        <Stack
          spacing={3}
          sx={{
            width: "100%",
            maxWidth: 450,
          }}
        >
          <LoginPageTopBar />
          <LoginPageHeader />
          
          <LoginForm
            loadingAction={loadingAction}
            setLoadingAction={setLoadingAction}
          />
          <LoginSignInOptions
            loadingAction={loadingAction}
            setLoadingAction={setLoadingAction}
          />
        </Stack>
      </Box>
    </>
  );
}
