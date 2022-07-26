import React, { useContext } from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSumary } from "../../components/cart";
import { CartContext } from "../../context";
import { countries } from "../../utils";

const SummaryPage = () => {
  const { shippingAddress, numberOfItems } = useContext(CartContext);
  if (!shippingAddress) return <></>;
  return (
    <ShopLayout
      title={"Resumén de Orden"}
      pageDescription={"Resumén de la orden de compra de la tienda"}
    >
      <Typography variant="h1" component={"h1"} sx={{ mb: 2 }}>
        Resumén de la Orden
      </Typography>
      <Grid container>
        <Grid item xs={12} sm={7}>
          <CartList />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Card className="sumary-card">
            <CardContent>
              <Typography variant="h2">{`Resumén (${numberOfItems} ${
                numberOfItems === 1 ? "Producto" : "Productos"
              })`}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href={"/checkout/address"} passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>{`${shippingAddress?.firstName} ${shippingAddress?.lastName}`}</Typography>
              <Typography>
                {shippingAddress?.address}
                {shippingAddress?.address2
                  ? `, ${shippingAddress?.address2}`
                  : ""}
              </Typography>
              <Typography>{`${shippingAddress?.city}, ${shippingAddress?.zip}`}</Typography>
              <Typography>
                {countries.nameCountry(shippingAddress?.country)}
              </Typography>
              <Typography>{shippingAddress?.phone}</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">Productos a comprar</Typography>
                <NextLink href={"/cart"} passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <Button color="secondary" className="circular-btn" fullWidth>
                  Confirmar Orden
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default SummaryPage;
