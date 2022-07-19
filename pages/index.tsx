import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../components/layouts";
import { ProducList } from "../components/products";
import { initialData } from "../database/products";

const HomePage: NextPage = () => {
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
      <ProducList products={initialData.products as any} />
    </ShopLayout>
  );
};
export default HomePage;
