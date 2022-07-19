import React, { FC } from "react";
import { Grid } from "@mui/material";
import { ProducCard } from ".";
import { IProduct } from "../../interface";

interface Props {
  products: IProduct[];
}

export const ProducList: FC<Props> = ({ products }) => {
  return (
    <Grid container spacing={4}>
      {products.map((product) => (
        <ProducCard product={product} key={product.slug} />
      ))}
    </Grid>
  );
};
