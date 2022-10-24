import {ID, IListProject, IProject} from "../../types";
import { get, post, put, deleteApi } from "../../api";
import {ListProjectActions} from "../actions/listProject";
import {AppDispatch} from "../store";

export async function getListProject(dispatch: AppDispatch) {
  const data = await get<IListProject>("/ListProject");
  
  if(data) dispatch(ListProjectActions.setListProject(data));
  return data;
}

export async function setListProject(dispatch: AppDispatch, data: IListProject) {
  const res = await post<IListProject>("/ListProject", data);
  if(res) dispatch(ListProjectActions.setListProject(res));
  return res;
}

export async function addListProject(dispatch: AppDispatch, data: IProject) {
  const res = await put<IProject>("/ListProject", data);
  if(res) dispatch(ListProjectActions.setListProject(res));
  return res;
}

export async function updateListProject(dispatch: AppDispatch, data: IProject) {
  const res = await put<IProject>("/ListProject", data);
  if(res) dispatch(ListProjectActions.setListProject(res));
  return res;
}

export async function deleteListProject(dispatch: AppDispatch, id: ID) {
  const res = await deleteApi<IProject>("/ListProject", id);
  if(res) dispatch(ListProjectActions.setListProject(res));
  return res;
}

