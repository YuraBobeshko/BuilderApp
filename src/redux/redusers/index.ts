import { combineReducers } from "redux";

import { IRootReducer } from "../../types";
import { ListProjectReducer } from "./listProject";

declare module "react-redux" {
  interface DefaultRootState extends IRootReducer {}
}

const rootReducer = combineReducers<IRootReducer>({
  listProject: ListProjectReducer,
});

export default rootReducer;
