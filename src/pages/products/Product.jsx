import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import ProductGrid from "./components/ProductGrid";

// import {
//   selectProducts,
//   selectDiscount,
// } from "../../features/products/productsSelectors";
import { selectProducts, selectDiscount } from "../../feature/products/productsSelectors";
export default function Products() {
  const products = useSelector(selectProducts);
  const discount = useSelector(selectDiscount);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        px: 3,
        py: 5,
      }}
    >
      <Typography
        variant="h4"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Products
      </Typography>

      <Typography
        color="text.secondary"
        sx={{ mb: 4 }}
      >
        Browse our products
      </Typography>

      <ProductGrid
        products={products}
        discount={discount}
      />
    </Box>
  );
}