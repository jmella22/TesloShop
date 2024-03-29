import type { NextPage } from "next";

import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProductList } from "../components/products";
import { useProducts } from "../hooks";
import { FullScreenLoading } from "../components/ui";

const HomePage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products");

  return (
    <ShopLayout
      title="TesloShop - Home"
      pageDescription="encuentra los mejores productos de teslo"
    >
      <Typography variant="h1" component={"h1"}>
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todos los Productos
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};
export default HomePage;
