import { Box } from "@mui/material";
import { LoginPageTopBar } from "./Components/LoginPageTopBar.jsx";
import { LoginPageHeader } from "./Components/LoginPageHeader.jsx";
import { LoginForm } from "./Components/LoginForm.jsx";
import { LoginSignInOptions } from "./Components/LoginSignInOptions.jsx";
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
