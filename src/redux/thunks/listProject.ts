import { IListProject } from "../../types";
import { get, post } from "../../api";

export async function getListProject() {
  return get<IListProject>("/ListProject");
}

export async function setListProject(data: IListProject) {
  return post<IListProject>("/ListProject", data);
}
