import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";

const MenPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=men");
  return (
    <ShopLayout
      title="TesloShop - Hombres"
      pageDescription="encuentra los mejores productos de teslo para Hombres"
    >
      <Typography variant="h1" component={"h1"}>
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todo para Hombres
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default MenPage;
