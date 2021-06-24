import { combineReducers } from "redux";

import { IRootReducer } from "./state";
import { ListProjectReducer } from "./listProject";

declare module "react-redux" {
  interface DefaultRootState extends IRootReducer {}
}

const rootReducer = combineReducers<IRootReducer>({
  listProject: ListProjectReducer as any,
});

export default rootReducer;
