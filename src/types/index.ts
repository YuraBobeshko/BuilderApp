export interface ITreeItem {
  type?: ITypes;
  name?: string;
  text?: string;
  children: ITreeItem[];
  isClose?: boolean;
}

export type ITree = ITreeItem[];

export type ISetTree = (prevState: ITree) => void;

export type ITypes = "component" | "folder" | "file" | "select";
