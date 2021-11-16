import { combineReducers } from "redux";

import { IRootReducer } from "../../types";
import { ListProjectReducer } from "./listProject";
import { CurrentProjectReducer } from "./currentProject";

declare module "react-redux" {
  interface DefaultRootState extends IRootReducer {}
}

const rootReducer = combineReducers<IRootReducer>({
  listProject: ListProjectReducer,
  currentProject: CurrentProjectReducer,
});


export default rootReducer;
