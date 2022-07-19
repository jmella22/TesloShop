import React from "react";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { CartList, OrderSumary } from "../../components/cart";
import {
  CreditCardOffOutlined,
  CreditScoreOutlined,
} from "@mui/icons-material";

const OrderPage = () => {
  return (
    <ShopLayout
      title={" Orden N°123ASD"}
      pageDescription={"Orden de compra Numero 123ASD"}
    >
      <Typography variant="h1" component={"h1"} sx={{ mb: 2 }}>
        Orden: N° 123ASD
      </Typography>

      {/* <Chip
        sx={{ my: 2 }}
        label="Pendiente de Pago"
        variant="outlined"
        color="error"
        icon={<CreditCardOffOutlined />}
      /> */}

      <Chip
        sx={{ my: 2 }}
        label="Orden ya fue pagada"
        variant="outlined"
        color="success"
        icon={<CreditScoreOutlined />}
      />

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
              </Box>

              <Typography>José Mella</Typography>
              <Typography>Los robles N° 911</Typography>
              <Typography>Puente Alto, RM</Typography>
              <Typography>Chile</Typography>
              <Typography>+56920000289</Typography>
              <Divider sx={{ my: 1 }} />
              <Box display={"flex"} justifyContent="space-between">
                <Typography variant="subtitle1">Productos a comprar</Typography>
              </Box>
              <OrderSumary />
              <Box sx={{ mt: 3 }}>
                <Typography variant="h1">Pagar</Typography>
                <Chip
                  sx={{ my: 2 }}
                  label="Orden ya fue pagada"
                  variant="outlined"
                  color="success"
                  icon={<CreditScoreOutlined />}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

export default OrderPage;
