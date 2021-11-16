export interface IProject {
  id: ID;
  name?: string;
  structure: ITree;
}
export type IListProject = IProject[];

export interface ITreeItem {
  id: string;
  type?: ITypes;
  name?: string;
  text?: string | Promise<string>;
  children: ITreeItem[];
  isClose?: boolean;
}

export type ITree = ITreeItem[];

export type IGetStructure = (prevState: ITree) => ITree;

export type ISetTree = (structure: IGetStructure) => void;

export interface IRootReducer {
  listProject: IListProject;
  currentProject: IProject;
}

export type ID = string | number

export type ITypes = "component" | "folder" | "file" | "select";
