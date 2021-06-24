import { IProject } from "../../types";

enum Type {
  ADD_PROJECT = "ADD_PROJECT",
  EDIT_PROJECT = "EDIT_PROJECT",
  DELETE_PROJECT = "DELETE_PROJECT",
  SET_STRUCTURE_PROJECT = "SET_STRUCTURE_PROJECT",
}

const addProject = (data: IProject) => ({
  type: Type.ADD_PROJECT,
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

export const ListProjectActions = {
  Type,
  addProject,
  editProject,
  deleteProject,
};

export type IListProjectActions =
  | ReturnType<typeof addProject>
  | ReturnType<typeof editProject>
  | ReturnType<typeof deleteProject>;
