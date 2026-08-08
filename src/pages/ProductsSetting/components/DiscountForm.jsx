import { useReducer, useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { selectDiscount, selectProducts } from "../../../feature/products/productsSelectors";
import { setDiscount } from "../../../feature/products/productsSlice";
import { addProduct } from "../../../feature/products/productsSlice";
import { deleteProduct } from "../../../feature/products/productsSlice";

export default function DiscountForm() {
    const dispatch = useDispatch() ;
    const products = useSelector(selectProducts) ;
    const discount = useSelector(selectDiscount)
    console.log(products) ;
    const [discountInput, setDiscountInput] = useState(0) ;


  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(setDiscount(Number(discountInput)));
    // You'll connect Redux here later.
    console.log("Discount:", discount);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
        maxWidth: 500,
        p: 3,
        border: 1,
        borderColor: "divider",
        borderRadius: 3,
        bgcolor: "background.paper",
      }}
    >
      <Typography
        variant="h6"
        fontWeight={700}
        sx={{ mb: 1 }}
      >
        Product Discount
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ mb: 3 }}
      >
        Set a discount percentage for all products.

        <br></br>
        <br></br>
        current discount is {discount}%
      </Typography>

      <TextField
        fullWidth
        label="Discount"
        type="number"
        value={discountInput}
        onChange={(event) => setDiscountInput(event.target.value)}

        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                %
              </InputAdornment>
            ),
          },
        }}
        inputProps={{
          min: 0,
          max: 100,
        }}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2 }}
      >
        Apply Discount
      </Button>
    </Box>
  );
}