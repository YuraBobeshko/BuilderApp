import { ListProjectActions, IListProjectActions } from "../actions";
import { IListProject } from "../../types";

export function ListProjectReducer(
  state: IListProject = [],
  action: IListProjectActions
) {
  switch (action.type) {
    case ListProjectActions.Type.ADD_PROJECT: {
      const { payload } = action;
      return [...state, payload];
    }

    case ListProjectActions.Type.EDIT_PROJECT: {
      const { payload } = action;
      return [
        ...state?.map((project) =>
          project.id === payload.id ? payload : project
        ),
      ];
    }

    case ListProjectActions.Type.DELETE_PROJECT: {
      const { payload } = action;
      return [...state.filter((project) => project.id !== payload.id)];
    }

    default:
      return state;
  }
}
