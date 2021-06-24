import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Structure, Config, Builder, ListProject } from "./";
import { Navigation } from "../components";

const listNav = [
  { name: "ListProject", component: ListProject },
  { name: "Structure", component: Structure },
  { name: "Builder", component: Builder },
  { name: "Config", component: Config },
];

const BrowserRouter = () => {
  return (
    <Router>
      <Switch>
        {listNav.map(({ name, component }) => (
          <Route key={name} path={`/${name}/:currentId?`}>
            {componentWraper(component)}
          </Route>
        ))}
        <Redirect to="/ListProject" />
      </Switch>
    </Router>
  );
};

function componentWraper(Component: React.FC): JSX.Element {
  return (
    <>
      <Navigation />
      <Component />
    </>
  );
}

export default BrowserRouter;
