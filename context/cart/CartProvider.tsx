import React, { FC, PropsWithChildren, useEffect, useReducer } from "react";
import Cookie from "js-cookie";
import { ICartProduct } from "../../interface";
import { cartReducer, CartContext } from "./";

export interface CartState {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;
}

const CART_INITAL_STATE: CartState = {
  cart: Cookie.get("cart") ? JSON.parse(Cookie.get("cart")!) : [],
  numberOfItems: 0,
  subTotal: 0,
  tax: 0,
  total: 0,
};

export const CartProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITAL_STATE);

  useEffect(() => {
    try {
      const cookieProducts = Cookie.get("cart")
        ? JSON.parse(Cookie.get("cart")!)
        : [];
      dispatch({
        type: "CART_FROM_COOKIES_STORAGE_LOADING",
        payload: cookieProducts,
      });
    } catch (error) {
      dispatch({ type: "CART_FROM_COOKIES_STORAGE_LOADING", payload: [] });
    }
  }, []);

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(state.cart));
  }, [state.cart]);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const taxeRate = Number(process.env.NEXT_PUBLIC_TAX_RATE || 0);

    const orderSumary = {
      numberOfItems,
      subTotal,
      tax: subTotal * taxeRate,
      total: subTotal * (taxeRate + 1),
    };
    dispatch({ type: "CART_ORDER_SUMARY_UPDATE", payload: orderSumary });
  }, [state.cart]);

  const addProductToCart = (product: ICartProduct) => {
    const productInCartButDifferentSize = state.cart.some(
      (p) => p._id === product._id && p.size === product.size
    );
    if (!productInCartButDifferentSize) {
      return dispatch({
        type: "CART_PRODUCT_UPDATE",
        payload: [...state.cart, product],
      });
    }

    //Acumular
    const updateProducts = state.cart.map((p) => {
      if (p._id !== product._id) return p;
      if (p.size !== product.size) return p;

      // Actualizar la cantidad
      p.quantity += product.quantity;
      return p;
    });

    return dispatch({ type: "CART_PRODUCT_UPDATE", payload: updateProducts });
  };

  const updateCartQuatity = (product: ICartProduct) => {
    dispatch({ type: "CART_QUANTITY_CHANGE", payload: product });
  };

  const removeCartProduct = (product: ICartProduct) => {
    dispatch({ type: "CART_PRODUCT_REMOVE", payload: product });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,

        //Method
        addProductToCart,
        updateCartQuatity,
        removeCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
