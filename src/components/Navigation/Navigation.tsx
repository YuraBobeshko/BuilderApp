import React from "react";
import { useParams, Link } from "react-router-dom";

const listNav = [
  { name: "ListProject" },
  { name: "Structure" },
  { name: "Builder" },
  { name: "Config" },
];

const Navigation = () => {
  const { currentId } = useParams<{ currentId: string | undefined }>();

  return (
    <div style={{ display: "flex" }}>
      {currentId
        ? listNav.map(({ name }) => (
            <li key={name}>
              <Link to={`/${name}/${currentId}`}>{name}</Link>
            </li>
          ))
        : null}
    </div>
  );
};

export default Navigation;
