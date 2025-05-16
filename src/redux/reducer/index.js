// import handleCart from './handleCart'
// import { combineReducers } from "redux";
// const rootReducers = combineReducers({
//     handleCart,
// })
// export default rootReducers


// redux/reducer/index.js - Update this file to include the auth reducer

import { combineReducers } from "redux";
import handleCart from "./handleCart";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  cart: handleCart,
  auth: authReducer
});

export default rootReducer;
