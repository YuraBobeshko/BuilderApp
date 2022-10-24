import React from "react";
import { useParams, Link } from "react-router-dom";
import {listNav} from "../../constants";

const Navigation = () => {
  const { currentId } = useParams<{ currentId: string | undefined }>();

  return (
    <nav style={{ display: "flex" }}>
      {currentId
        ? listNav.map(({ name }) => (
            <li key={name}>
              <Link to={`/${name}/${currentId}`}>{name}</Link>
            </li>
          ))
        : null}
    </nav>
  );
};

export default Navigation;
