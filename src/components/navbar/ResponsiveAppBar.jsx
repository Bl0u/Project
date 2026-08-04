import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import NavigationLinks from "./components/NavigationLinks";
import NavbarActions from "./components/NavbarActions";

export default function ResponsiveAppBar() {

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography variant="h5" sx={{ flexGrow: 1 }}>
            vBot
          </Typography>


          <NavbarActions />
          <NavigationLinks />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
