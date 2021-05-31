import React, { useState } from "react";

import { Tree } from "./components";

function App() {
  const [arr, setArr] = useState([
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
  console.log("arr", arr);

  return <Tree arr={arr} setArr={setArr} />;
}

export default App;
