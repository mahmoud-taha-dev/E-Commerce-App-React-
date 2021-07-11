import { combineReducers, createStore } from 'redux';

// Reducers
import cartReducer from './features/cart/cartReducer';
import userReducer from './features/user/userReducer';

const reducers = combineReducers({cart : cartReducer, user : userReducer});
const store = createStore(reducers);

export default store;