import React, { useState } from "react";
import { TreeRenerer, StructureCreator, Uploader } from "./components";
import { ITree } from "./types";

function App() {
  const [tree, setTree] = useState<ITree>([
    {
      type: "folder",
      name: "src",
      children: [
        {
          type: "folder",
          name: "component",
          children: [
            {
              type: "folder",
              name: "UI",
              children: [
                {
                  children: [],
                  type: "component",
                  name: "Button",
                  text: "<button></button>",
                },
                { children: [], type: "component", name: "Input" },
                { children: [], type: "component", name: "Select" },
              ],
            },
          ],
        },
      ],
    },
    {
      type: "folder",
      name: "screen",
      children: [
        { type: "file", name: "main", children: [] },
        { type: "file", name: "singup", children: [] },
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

export default App;
