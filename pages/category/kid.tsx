import type { NextPage } from "next";
import { Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { useProducts } from "../../hooks";
import { FullScreenLoading } from "../../components/ui";

const KidPage: NextPage = () => {
  const { products, isLoading, isError } = useProducts("/products?gender=kid");
  return (
    <ShopLayout
      title="TesloShop - Niños"
      pageDescription="encuentra los mejores productos de teslo para Niños"
    >
      <Typography variant="h1" component={"h1"}>
        Tienda
      </Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>
        Todo para Niños
      </Typography>
      {isLoading ? <FullScreenLoading /> : <ProductList products={products} />}
    </ShopLayout>
  );
};

export default KidPage;
