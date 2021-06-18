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
  async function openTree(tree: ITree, folder: JSZip | null) {
    tree.forEach((element: ITreeItem) => {
      if (element.type === "folder") {
        // folder = ;
        openTree(element.children, folder?.folder(element.name || " ") || null);
        return;
      }
      if (element.type === "file") {
        folder?.file((element.name || " ") + ".js", element.text || "");
      }
      if (element.type === "component") {
        folder?.file((element.name || " ") + ".jsx", element.text || "");
      }
      if (element.children.length) openTree(element.children, folder);
    });
    return folder;
  }
  const folders = await openTree(tree, Zip.folder("Yura"));
  const content = await folders?.generateAsync({ type: "blob" });
  if (content) saveAs(content, "example.zip");
}

export default StructureCreator;
