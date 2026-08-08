import { Box } from "@mui/material";
import ProductCard from "./ProductCard";

export default function ProductGrid({
  products,
  discount,
}) {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fill, minmax(260px, 1fr))",
        gap: 3,
        width: "100%",
      }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          price={product.price}
          image={product.image}
          discount={discount}
        />
      ))}
    </Box>
  );
}