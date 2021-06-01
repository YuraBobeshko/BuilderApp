import React, { useState } from "react";
import { TreeRenerer, StructureCreator } from "./components";
import { ITree } from "./types";

function App() {
  const [tree, setTree] = useState<ITree>([
    {
      type: "folder",
      children: [
        {
          children: [
            {
              children: [
                {
                  children: [],
                  type: "component",
                  name: "Button",
                  text: "<button></button>",
                },
                { children: [], type: "component", name: "Input" },
                { children: [], type: "component" },
              ],
            },
          ],
        },
      ],
    },
    { type: "folder", children: [{ children: [] }, { children: [] }] },
  ]);

  console.log("tree", tree);

  return (
    <>
      <TreeRenerer tree={tree} setTree={setTree} />
      <StructureCreator tree={tree} />
    </>
  );
}

export default App;
