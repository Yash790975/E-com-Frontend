import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducer/index";
import thunk from "redux-thunk";
// (Optional) Redux Logger
import logger from "redux-logger";

const composeEnhancers =
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
);

export default store;