import React from "react";
import JSZip from "jszip";
import { saveAs } from "../../utils";
import { ITree } from "../../types/";

const Zip = new JSZip();

interface IStructureCreator {
  tree: ITree;
}

const StructureCreator = ({ tree }: IStructureCreator) => {
  return (
    <div>
      StructureCreator
      <button onClick={download}>download</button>
    </div>
  );
};

async function download() {
  Zip.file("Hello.txt", "Hello World\n");
  const img = Zip.folder("images");
  img?.file("Hello1.txt", "Hello World1\n");
  const content = await Zip.generateAsync({ type: "blob" });
  saveAs(content, "example.zip");
}

export default StructureCreator;
