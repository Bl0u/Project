import { Box, Typography } from "@mui/material";
// import DiscountForm from "./components/DiscountForm";
import DiscountForm from "./components/DiscountForm";

export default function ProductsSettings() {
  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Product Settings
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Manage your product configuration.
      </Typography>

      <DiscountForm />
    </Box>
  );
}