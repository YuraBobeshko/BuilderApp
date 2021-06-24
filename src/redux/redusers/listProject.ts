import { ListProjectActions, IListProjectActions } from "../actions";
import { IListProject } from "../../types";
import { setListProject } from "../thunks";

type AppState = {};

export function ListProjectReducer(
  state: IListProject = [],
  action: IListProjectActions
): AppState {
  switch (action.type) {
    case ListProjectActions.Type.ADD_PROJECT: {
      const { payload } = action;
      const value = [...state, payload];
      setListProject(value);
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
      setListProject(value);
      return value;
    }

    case ListProjectActions.Type.DELETE_PROJECT: {
      const { payload } = action;
      const value = [...state.filter((project) => project.id !== payload.id)];
      setListProject(value);
      return value;
    }

    default:
      return state;
  }
}
