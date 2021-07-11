import { ADD_TO_CART, CLEAR_CART, CHANGE_IN_CART } from "./cartTypes";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart") || "[]"),

  cartNum: localStorage.getItem("cartNum")
    ? parseInt(localStorage.getItem("cartNum"))
    : 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload],
        cartNum: state.cartNum + 1,
      };
    case CLEAR_CART:
      return {
        ...state,
        cartItems: [],
        cartNum: 0,
      };
    case CHANGE_IN_CART:
      return {
        ...state,
        cartItems: action.payload.products,
        cartNum: action.payload.cartNum,
      };
    default:
      return state;
  }
};

export default cartReducer;
