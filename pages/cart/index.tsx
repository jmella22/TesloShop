import React, { useContext } from "react";
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
  const { numberOfItems } = useContext(CartContext);

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
                <Button color="secondary" className="circular-btn" fullWidth>
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
