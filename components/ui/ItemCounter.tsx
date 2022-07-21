import React, { FC } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";

interface Props {
  quantity: number;
  inStock: number;

  //Method
  updateQuantity: (quantity: number) => void;
}

export const ItemCounter: FC<Props> = ({
  inStock,
  quantity,
  updateQuantity,
}) => {
  const addQuantity = () => {
    if (quantity < inStock) {
      updateQuantity(quantity + 1);
    }
    return;
  };

  const subtractQuantity = () => {
    if (quantity > 1) {
      updateQuantity(quantity - 1);
    }
    return;
  };

  return (
    <Box display={"flex"} alignItems="center">
      <IconButton onClick={subtractQuantity}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>
        {quantity}
      </Typography>
      <IconButton onClick={addQuantity}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  );
};
