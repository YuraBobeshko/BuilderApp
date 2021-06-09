export interface ITreeItem {
  type?: ITypes;
  name?: string;
  text?: string | Promise<string>;
  children: ITreeItem[];
  isClose?: boolean;
}

export type ITree = ITreeItem[];

export type ISetTree = React.Dispatch<React.SetStateAction<ITree>>;

export type ITypes = "component" | "folder" | "file" | "select";
