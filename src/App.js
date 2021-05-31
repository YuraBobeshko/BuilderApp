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
                { children: [], type: "componet", name: "Button" },
                { children: [], type: "componet", name: "Input" },
                { children: [], type: "componet" },
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
