import { ICartProduct } from "../../interface";
import { CartState } from "./";

type CartActionType =
  | {
      type: "CART_FROM_COOKIES_STORAGE_LOADING";
      payload: ICartProduct[];
    }
  | {
      type: "CART_PRODUCT_UPDATE";
      payload: ICartProduct[];
    }
  | { type: "CART_QUANTITY_CHANGE"; payload: ICartProduct }
  | { type: "CART_PRODUCT_REMOVE"; payload: ICartProduct }
  | {
      type: "CART_ORDER_SUMARY_UPDATE";
      payload: {
        numberOfItems: number;
        subTotal: number;
        tax: number;
        total: number;
      };
    };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "CART_FROM_COOKIES_STORAGE_LOADING":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "CART_PRODUCT_UPDATE":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "CART_QUANTITY_CHANGE":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case "CART_PRODUCT_REMOVE":
      return {
        ...state,
        cart: state.cart.filter(
          (product) =>
            !(
              product._id === action.payload._id &&
              product.size === action.payload.size
            )
        ),
      };
    case "CART_ORDER_SUMARY_UPDATE":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
