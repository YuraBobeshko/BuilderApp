import { ProjectActions, IProjectActions } from "../actions/currentProject";
import { IProject } from "../../types";
import {defaultProject} from "../../constants";

export function CurrentProjectReducer(
  state: IProject = defaultProject,
  action: IProjectActions
): IProject {
  switch (action.type) {
    case ProjectActions.Type.SET_CURRENT_PROJECT_STRUCTURE: {
      const { payload } = action;
      return {...state, structure: payload };
    }

    case ProjectActions.Type.EDIT_CURRENT_PROJECT: {
      const { payload } = action;
      return {...state, ...payload};
    }

    default:
      return state;
  }
}
