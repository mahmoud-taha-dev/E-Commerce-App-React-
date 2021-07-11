import { ADD_TO_CART, CLEAR_CART, CHANGE_IN_CART } from "./cartTypes";

export const addToCart = (productItem) => {
  return {
    type: ADD_TO_CART,
    payload: productItem,
  };
};

export const clearCart = () => {
  return {
    type: CLEAR_CART,
  };
};

export const changeInCart = (products, cartNum) => {
  return {
    type: CHANGE_IN_CART,
    payload: {
      products,
      cartNum,
    },
  };
};
