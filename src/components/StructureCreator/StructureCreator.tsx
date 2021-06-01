import React from "react";
import JSZip from "jszip";
import { saveAs } from "../../utils";
import { ITree, ITreeItem } from "../../types/";

const Zip = new JSZip();

interface IStructureCreator {
  tree: ITree;
}

const StructureCreator = ({ tree }: IStructureCreator) => {
  return (
    <div>
      StructureCreator
      <button onClick={() => download(tree)}>download</button>
    </div>
  );
};

async function download(tree: ITree) {
  async function openTree(tree: ITree, folder: any) {
    tree.forEach((element: ITreeItem) => {
      console.log(element.type, element.name);
      if (element.type === "folder") {
        // folder = ;
        openTree(element.children, folder.folder(element.name || " "));
        return;
      }
      if (element.type === "file") {
        folder.file((element.name || " ") + ".js", element.text || "");
      }
      if (element.type === "component") {
        folder.file((element.name || " ") + ".jsx", element.text || "");
      }
      if (element.children.length) openTree(element.children, folder);
    });
    return folder;
  }
  const folders = await openTree(tree, Zip.folder("Yura"));
  const content = await folders.generateAsync({ type: "blob" });
  console.log(folders);
  saveAs(content, "example.zip");
  console.log();
}

export default StructureCreator;
