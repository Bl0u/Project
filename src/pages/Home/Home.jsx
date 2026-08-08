// import Navbar from "../../components/navbar/Navbar";

import {
  Box,
  Button,
  Container,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { AuthContext } from "../../context/AuthContext/AuthContext"; 
import { useContext } from "react";
export function Home() {
  const {user, isAuthenticated} = useContext(AuthContext) ;
  return (
    <>

      <Container maxWidth="md" sx={{ mt: 6 }}>
        <Paper
          elevation={4}
          sx={{
            p: 5,
            textAlign: "center",
            transition: "0.3s",
          }}
        >
          <Typography variant="h3" gutterBottom>
            Welcome {isAuthenticated ? user.email : "👋"}
          </Typography>

          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Toggle between Light and Dark mode using the button in the
            navigation bar.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            justifyContent="center"
          >
            <Button variant="contained">
              Get Started
            </Button>

            <Button variant="outlined">
              Learn More
            </Button>
          </Stack>
        </Paper>

        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={3}
          sx={{ mt: 5 }}
        >
          <Paper
            elevation={2}
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Light Theme
            </Typography>

            <Typography color="text.secondary">
              Clean backgrounds with darker text for comfortable daytime use.
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Dark Theme
            </Typography>

            <Typography color="text.secondary">
              Softer dark backgrounds that reduce eye strain in low light.
            </Typography>
          </Paper>

          <Paper
            elevation={2}
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            <Typography variant="h6" gutterBottom>
              Material UI
            </Typography>

            <Typography color="text.secondary">
              All colors automatically follow the current theme without extra
              styling.
            </Typography>
          </Paper>
        </Stack>
      </Container>
    </>
  );
}