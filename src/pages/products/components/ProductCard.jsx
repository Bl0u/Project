import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Box,
    Chip,
  } from "@mui/material";
  
  export default function ProductCard({
    title,
    price,
    image,
    discount,
  }) {
    const discountedPrice =
      price - (price * discount) / 100;
  
    return (
      <Card
        sx={{
          width: 280,
          borderRadius: 3,
          overflow: "hidden",
          transition: "0.2s",
  
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: 6,
          },
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image={image}
          alt={title}
        />
  
        <CardContent>
          <Typography
            variant="h6"
            fontWeight={600}
            gutterBottom
          >
            {title}
          </Typography>
  
          {discount > 0 ? (
            <Box>
              <Typography
                variant="body2"
                sx={{
                  textDecoration: "line-through",
                  opacity: 0.5,
                }}
              >
                ${price}
              </Typography>
  
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Typography
                  variant="h6"
                  color="primary"
                  fontWeight={700}
                >
                  ${discountedPrice.toFixed(2)}
                </Typography>
  
                <Chip
                  label={`${discount}% OFF`}
                  color="success"
                  size="small"
                />
              </Box>
            </Box>
          ) : (
            <Typography
              variant="h6"
              color="primary"
              fontWeight={700}
            >
              ${price}
            </Typography>
          )}
        </CardContent>
      </Card>
    );
  }