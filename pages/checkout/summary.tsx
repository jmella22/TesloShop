import React from "react";
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

const SummaryPage = () => {
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
              <Typography variant="h2">Resumén (3 Productos)</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">
                  Dirección de entrega
                </Typography>
                <NextLink href={"/checkout/address"} passHref>
                  <Link underline="always">Editar</Link>
                </NextLink>
              </Box>

              <Typography>José Mella</Typography>
              <Typography>Los robles N° 911</Typography>
              <Typography>Puente Alto, RM</Typography>
              <Typography>Chile</Typography>
              <Typography>+56920000289</Typography>
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
