import { createContext } from "react";
import { ICartProduct } from "../../interface";

interface ContextProps {
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  //Method
  addProductToCart: (product: ICartProduct) => void;
  updateCartQuatity: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
