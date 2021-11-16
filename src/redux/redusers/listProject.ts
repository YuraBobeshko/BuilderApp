import { ListProjectActions, IListProjectActions } from "../actions/listProject";
import { IListProject } from "../../types";

export function ListProjectReducer(
  state: IListProject = [],
  action: IListProjectActions
): IListProject {
  switch (action.type) {
    case ListProjectActions.Type.ADD_PROJECT: {
      const { payload } = action;
      const value = [...state, payload];
      return value;
    }

    case ListProjectActions.Type.SET_LIST_PROJECT: {
      const { payload } = action;
      return payload;
    }

    case ListProjectActions.Type.EDIT_PROJECT: {
      const { payload } = action;
      const value = [
        ...state?.map((project) =>
          project.id === payload.id ? payload : project
        ),
      ];
      return value;
    }

    case ListProjectActions.Type.DELETE_PROJECT: {
      const { payload } = action;
      const value = [...state.filter((project) => project.id !== payload.id)];
      return value;
    }

    default:
      return state;
  }
}
