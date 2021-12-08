import { IProject, ITree} from "../../types";

enum Type {
  SET_CURRENT_PROJECT_STRUCTURE = "SET_CURRENT_PROJECT_STRUCTURE",
  EDIT_CURRENT_PROJECT = "EDIT_CURRENT_PROJECT",
}

const setCurrentProjectsStructure = (data: ITree) => ({
  type: Type.SET_CURRENT_PROJECT_STRUCTURE,
  payload: data,
});

const editCurrentProject = (data: IProject) => ({
  type: Type.EDIT_CURRENT_PROJECT,
  payload: data,
});


interface ISetCurrentProjectsStructure {
  type: Type.SET_CURRENT_PROJECT_STRUCTURE;
  payload: ITree;
}

interface IEditCurrentProject {
  type: Type.EDIT_CURRENT_PROJECT;
  payload: IProject;
}

export const ProjectActions = {
  Type,
  setCurrentProjectsStructure,
  editCurrentProject,
};

export type IProjectActions =
  | ISetCurrentProjectsStructure
  | IEditCurrentProject;
