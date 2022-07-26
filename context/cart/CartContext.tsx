import { createContext } from "react";
import { ICartProduct, IShippingAddress } from "../../interface";

interface ContextProps {
  isLoaded: boolean;
  cart: ICartProduct[];
  numberOfItems: number;
  subTotal: number;
  tax: number;
  total: number;

  shippingAddress?: IShippingAddress;

  //Method
  addProductToCart: (product: ICartProduct) => void;
  removeCartProduct: (product: ICartProduct) => void;
  updateAddress: (address: IShippingAddress) => void;
  updateCartQuatity: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);
