import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { TreeRenerer, StructureCreator, Uploader } from "../../components";
import { ITree } from "../../types";

function Structure() {
  const [tree, setTree] = useState<ITree>([
    {
      id: uuidv4(),
      type: "folder",
      name: "src",
      children: [
        {
          id: uuidv4(),
          type: "folder",
          name: "component",
          children: [
            {
              id: uuidv4(),
              type: "folder",
              name: "UI",
              children: [
                {
                  id: uuidv4(),
                  children: [],
                  type: "component",
                  name: "Button",
                  text: "<button></button>",
                },
                {
                  id: uuidv4(),
                  children: [],
                  type: "component",
                  name: "Input",
                },
                {
                  id: uuidv4(),
                  children: [],
                  type: "component",
                  name: "Select",
                },
              ],
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      type: "folder",
      name: "screen",
      children: [
        { id: uuidv4(), type: "file", name: "main", children: [] },
        { id: uuidv4(), type: "file", name: "singup", children: [] },
      ],
    },
  ]);

  return (
    <>
      <TreeRenerer tree={tree} setTree={setTree} />
      <StructureCreator tree={tree} />
      <Uploader setTree={setTree} />
    </>
  );
}

export default Structure;
