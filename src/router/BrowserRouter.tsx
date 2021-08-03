import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Config, Builder, ListProject } from "../pages";
import { Navigation } from "../components";
import { getListProject } from "../redux/thunks";
import { ListProjectActions } from "../redux/actions";

const Structure = lazy((): any => import("../pages/structure"));

const listNav = [
  { name: "ListProject", component: ListProject },
  { name: "Structure", component: Structure },
  { name: "Builder", component: Builder },
  { name: "Config", component: Config },
];

const BrowserRouter = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getListProject().then((data) => {
      data && dispatch(ListProjectActions.setListProject(data));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <Router>
      <Suspense fallback={<p>loading</p>}>
        <Switch>
          {listNav.map(({ name, component }) => (
            <Route key={name} path={`/${name}/:currentId?`}>
              {componentWrapper(component)}
            </Route>
          ))}
        </Switch>
      </Suspense>
    </Router>
  );
};

function componentWrapper(Component: React.FC): JSX.Element {
  return (
    <>
      <Navigation />
      <Component />
    </>
  );
}

export default BrowserRouter;
