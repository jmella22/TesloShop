import type { GetServerSideProps, NextPage } from "next";
import { Box, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import { ProductList } from "../../components/products";
import { dbProduct } from "../../database";
import { IProduct } from "../../interface";

interface Props {
  products: IProduct[];
  foundProducts: boolean;
  query: string;
}

const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {
  return (
    <ShopLayout
      title="TesloShop - Search"
      pageDescription="encuentra los mejores productos de teslo"
    >
      <Typography variant="h1" component={"h1"}>
        Buscar Productos
      </Typography>
      {foundProducts ? (
        <Box display={"flex"}>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Encontramos estos producto referente a:
          </Typography>
          <Typography
            variant="h2"
            textTransform={"capitalize"}
            sx={{ mb: 1, ml: 1 }}
            color="secondary"
          >
            {query}
          </Typography>
        </Box>
      ) : (
        <>
          <Box display={"flex"}>
            <Typography variant="h2" sx={{ mb: 1 }}>
              No encontramos ningún producto referente a:
            </Typography>
            <Typography
              variant="h2"
              textTransform={"capitalize"}
              sx={{ mb: 1, ml: 1 }}
              color="secondary"
            >
              {query}
            </Typography>
          </Box>
          <Typography variant="h2" sx={{ mb: 1 }}>
            Pero esta selección podría interesarte:
          </Typography>
        </>
      )}
      <ProductList products={products} />
    </ShopLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { query = "" } = params as { query: string };

  if (query.length === 0) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  let products = await dbProduct.getProductsByTerm(query);
  const foundProducts = products.length > 0;

  if (!foundProducts) {
    products = await dbProduct.getAllProducts();
  }

  return {
    props: {
      products,
      foundProducts,
      query,
    },
  };
};

export default SearchPage;
