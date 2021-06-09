import React from "react";
import JSZip from "jszip";
import { ITree, ITreeItem, ISetTree } from "../../types";

const Zip = new JSZip();

interface IUploader {
  setTree: ISetTree;
}

const Uploader = ({ setTree }: IUploader) => {
  return (
    <div>
      <input
        className="fileInput"
        type="file"
        onChange={(e) => onChange(e, setTree)}
      />
    </div>
  );
};

function onChange(e: React.ChangeEvent<HTMLInputElement>, setTree: ISetTree) {
  let reader = new FileReader();
  if (e.currentTarget.files == null) {
    throw new Error("Error finding e.currentTarget.files");
  }
  let file = e.currentTarget.files[0];

  reader.onloadend = async () => {
    const zip = await Zip.loadAsync(file);
    const listFolder = zip.files;
    const tree: ITree = [];

    zip.forEach((element, file) => {
      const path = listFolder[element].name.split("/").filter(Boolean);

      function createTree(path: string[], tree: ITree) {
        if (!path[0]) return tree;

        if (!tree.find((element: ITreeItem) => element.name === path[0])) {
          tree.push({
            name: path[0],
            children: [],
            type: file.dir
              ? "folder"
              : file.name.endsWith(".tsx")
              ? "component"
              : "file" || "select",
            text: file.async("string") || "",
          });
        }
        if (path.length)
          createTree(
            path.slice(1),
            tree?.find((element: ITreeItem) => element?.name === path[0])
              ?.children || []
          );
      }
      createTree(path, tree);
    });
    setTimeout(() => {
      setTree(tree);
    }, 500);
  };

  reader.readAsDataURL(file);
}

export default Uploader;
