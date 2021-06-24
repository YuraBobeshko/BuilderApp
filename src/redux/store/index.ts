import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../redusers";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const middlewares = [thunk];


export default createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middlewares))
);
