import React from "react";
import BrowserRouter from "./screens/BrowserRouter";
import { Provider } from "react-redux";

import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter />
    </Provider>
  );
}

export default App;
