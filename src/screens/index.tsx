import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Structure from "./structure";
import Builder from "./builder";
import Config from "./config";
import { Navigation } from "../components";

const BrowserRouter = () => {
  return (
    <Router>
      <Navigation />
      <Switch>
        <Route path="/structure">
          <Structure />
        </Route>
        <Route path="/builder">
          <Builder />
        </Route>
        <Route path="/config">
          <Config />
        </Route>
      </Switch>
    </Router>
  );
};

export default BrowserRouter;
