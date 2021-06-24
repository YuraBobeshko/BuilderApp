import { IListProject, IProject } from "../../types";

enum Type {
  ADD_PROJECT = "ADD_PROJECT",
  SET_LIST_PROJECT = "SET_LIST_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  SET_STRUCTURE_PROJECT = "SET_STRUCTURE_PROJECT",
}

const addProject = (data: IProject) => ({
  type: Type.ADD_PROJECT,
  payload: data,
});
const setListProject = (data: IListProject) => ({
  type: Type.SET_LIST_PROJECT,
  payload: data,
});
const editProject = (data: IProject) => ({
  type: Type.EDIT_PROJECT,
  payload: data,
});
const deleteProject = (id: string) => ({
  type: Type.DELETE_PROJECT,
  payload: { id },
});

interface IAddProject {
  type: Type.ADD_PROJECT;
  payload: IProject;
}

interface ISetListProject {
  type: Type.SET_LIST_PROJECT;
  payload: IListProject;
}

interface IEditProject {
  type: Type.EDIT_PROJECT;
  payload: IProject;
}

interface IDeleteProject {
  type: Type.DELETE_PROJECT;
  payload: { id: string };
}

export const ListProjectActions = {
  Type,
  addProject,
  setListProject,
  editProject,
  deleteProject,
};

export type IListProjectActions =
  | IAddProject
  | ISetListProject
  | IEditProject
  | IDeleteProject;
