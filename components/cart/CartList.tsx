import React, { FC, useContext, useEffect, useState } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  CardActionArea,
  CardMedia,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ItemCounter } from "../ui";
import { CartContext } from "../../context";
import { ICartProduct } from "../../interface";

interface Props {
  editable?: boolean;
}

export const CartList: FC<Props> = ({ editable = false }) => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);

  const { cart, updateCartQuatity, removeCartProduct } =
    useContext(CartContext);

  const onNewCartQuantityValue = (
    product: ICartProduct,
    newQuantityVale: number
  ) => {
    product.quantity = newQuantityVale;
    updateCartQuatity(product);
  };

  return (
    <>
      {hasMounted &&
        cart.map((product) => (
          <Grid
            container
            spacing={2}
            key={product._id + product.size}
            sx={{ mb: 1 }}
          >
            <Grid item xs={3}>
              <NextLink href={`/product/${product.slug}`} passHref>
                <Link>
                  <CardActionArea>
                    <CardMedia
                      image={`/products/${product.image}`}
                      component="img"
                      sx={{ borderRadius: "5px" }}
                    />
                  </CardActionArea>
                </Link>
              </NextLink>
            </Grid>
            <Grid item xs={7}>
              <Box display={"flex"} flexDirection="column">
                <Typography variant="body1">{product.title}</Typography>
                <Typography variant="body1">
                  Talla: <strong>{product.size}</strong>
                </Typography>
                {editable ? (
                  <ItemCounter
                    quantity={product.quantity}
                    inStock={product.inStock}
                    updateQuantity={(newValue) =>
                      onNewCartQuantityValue(product, newValue)
                    }
                  />
                ) : (
                  <Typography variant="h6">{`${product.quantity} ${
                    product.quantity > 1 ? "Productos" : "Producto"
                  }`}</Typography>
                )}
              </Box>
            </Grid>
            <Grid
              item
              xs={2}
              display="flex"
              alignItems={"center"}
              flexDirection="column"
            >
              <Typography variant="subtitle1">{`$${product.price}`}</Typography>
              {editable && (
                <Button
                  variant="text"
                  color="secondary"
                  onClick={() => removeCartProduct(product)}
                >
                  Remover
                </Button>
              )}
            </Grid>
          </Grid>
        ))}
    </>
  );
};
