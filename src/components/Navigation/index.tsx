import React from "react";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div style={{ display: "flex" }}>
      <li>
        <Link to="/structure">Structure</Link>
      </li>
      <li>
        <Link to="/builder">Builder</Link>
      </li>
      <li>
        <Link to="/config">Config</Link>
      </li>
    </div>
  );
};

export default Navigation;
