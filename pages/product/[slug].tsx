import React, { useContext, useState } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { useRouter } from "next/router";
import { CartContext } from "../../context";

import { Box, Button, Chip, Grid, Typography } from "@mui/material";
import { ShopLayout } from "../../components/layouts";
import {
  ProductSizeSelector,
  ProductSlideshow,
} from "../../components/products";
import { ItemCounter } from "../../components/ui";
import { ICartProduct, IProduct, ISize } from "../../interface";
import { dbProduct } from "../../database";

interface Props {
  product: IProduct;
}

const ProductPage: NextPage<Props> = ({ product }) => {
  const router = useRouter();
  const { addProductToCart } = useContext(CartContext);
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    inStock: product.inStock,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  });

  const onSelectedSize = (size: ISize) => {
    if (size) {
      setTempCartProduct({
        ...tempCartProduct,
        size,
      });
    }
  };

  const updateQuantity = (quantity: number) => {
    setTempCartProduct({
      ...tempCartProduct,
      quantity,
    });
  };

  const addCartProduct = () => {
    if (!tempCartProduct.size) return;
    addProductToCart(tempCartProduct);
    router.push("/cart");
  };

  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideshow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={"flex"} flexDirection="column">
            <Typography variant="h1" component={"h1"}>
              {product.title}
            </Typography>
            <Typography variant="subtitle1">{`$${product.price}`}</Typography>
            <Box sx={{ my: 2 }}>
              <Typography variant="subtitle2">Cantidad</Typography>
              <ItemCounter
                quantity={tempCartProduct.quantity}
                inStock={tempCartProduct.inStock}
                updateQuantity={updateQuantity}
              />
              <ProductSizeSelector
                selectedSize={tempCartProduct.size}
                onSelectedSize={onSelectedSize}
                sizes={product.sizes}
              />
            </Box>
            {/* agegar al carrito */}
            {product.inStock > 0 ? (
              <Button
                color="secondary"
                className="circular-btn"
                onClick={addCartProduct}
              >
                {tempCartProduct.size
                  ? "Agregar al carrito"
                  : "Seleccione una talla"}
              </Button>
            ) : (
              <Chip
                label="No hay disponibles"
                color="error"
                variant="outlined"
              />
            )}
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  );
};

// export const getServerSideProps: GetServerSideProps = async ({ params }) => {
//   const { slug = "" } = params as { slug: string };
//   const product = await dbProduct.getProductBySlug(slug);

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       product,
//     },
//   };
// };

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const productSlugs = await dbProduct.getAllProductSlug();

  return {
    paths: productSlugs.map(({ slug }) => ({
      params: { slug },
    })),
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug = "" } = params as { slug: string };

  const product = await dbProduct.getProductBySlug(slug);

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const revalidate = 60 * 60 * 24;
  return {
    props: {
      product,
    },
    revalidate,
  };
};

export default ProductPage;
