import { ADD_USER, REMOVE_USER } from "./actionConstants";

const initialState = JSON.parse(localStorage.getItem("userInfo")) || null;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return action.payload;
    case REMOVE_USER:
      return null;
    default:
      return state;
  }
};

export default userReducer;
