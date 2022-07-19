import React from "react";
import { Divider, Grid, Typography } from "@mui/material";

export const OrderSumary = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>3</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>SubTotal</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{`$405`}</Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography>Impuestos (12.25%)</Typography>
      </Grid>
      <Grid item xs={6} display="flex" justifyContent={"end"}>
        <Typography>{`$49.6`}</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>
      <Grid item xs={6} sx={{ mt: 1 }} display="flex" justifyContent={"end"}>
        <Typography variant="subtitle1">{`$454.6`}</Typography>
      </Grid>
    </Grid>
  );
};
