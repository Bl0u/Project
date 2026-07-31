import Box from "@mui/material/Box";

// import { LoginLeftPanel } from "./components/LoginLeftPanel";
// import { LoginRightPanel } from "./components/LoginRightPanel";
// import { LoginLeftPanel } from "./Left Panel/LoginLeftPanel";
import {LoginLeftPanel} from "./left panel/LoginLeftPanel" ;
import {LoginRightPanel} from "./right panel/LoginRightPanel" ;

export function Login() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
      }}
    >
      {/* Left Panel */}
      <LoginLeftPanel></LoginLeftPanel>
      {/* Right Panel */}
      <LoginRightPanel></LoginRightPanel>
    </Box>
  );
}
