import React, { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSumary } from "../../components/cart";
import { CartContext } from "../../context";

const CartPage = () => {
  const { numberOfItems, isLoaded } = useContext(CartContext);
  const router = useRouter();
  useEffect(() => {
    if (isLoaded && numberOfItems === 0) {
      router.replace("cart/empty");
    }
  }, [isLoaded, numberOfItems, router]);

  if (!isLoaded || numberOfItems === 0) {
    return <></>;
  }
  return (
    <ShopLayout
      title={`Carrito - ${numberOfItems}`}
      pageDescription={"Carrito de compras de la tienda"}
    >
      <Typography variant="h1" component={"h1"} sx={{ mb: 2 }}>
        Carrito de compras
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList editable />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">Orden</Typography>
              <Divider sx={{ my: 1 }} />
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <Button
                  color="secondary"
                  className="circular-btn"
                  fullWidth
                  href="/checkout/address"
                >
                  Checkout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default CartPage;
