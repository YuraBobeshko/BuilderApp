import React, { useState } from "react";

import { Tree } from "./components";

function App() {
  const [arr, setArr] = useState([
    {
      children: [
        {
          children: [
            {
              children: [
                { children: [], name: "13123123" },
                { children: [] },
                { children: [] },
              ],
            },
          ],
        },
      ],
    },
    { children: [{ children: [] }, { children: [] }] },
  ]);

  return <Tree arr={arr} setArr={setArr} />;
}

export default App;
