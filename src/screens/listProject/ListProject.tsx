import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useParams, useHistory } from "react-router-dom";

import { IListProject } from "../../types";

const ListProject = () => {
  let { currentId } = useParams<{ currentId: string | undefined }>();
  let history = useHistory();
  const [listProject, setListProject] = useState<IListProject>([
    {
      id: uuidv4(),
      name: "Project",
    },
  ]);
  return (
    <div>
      <ul>
        {listProject.map(({ name, id }) => (
          <li
            key={id}
            onClick={() => history.push(id)}
            style={{ color: id === currentId ? "red" : "black" }}
          >
            {name}
          </li>
        ))}
      </ul>
      <input
        onBlur={(e) => {
          e.target.value &&
            setListProject((prevState) => [
              ...prevState,
              {
                id: uuidv4(),
                name: e.target.value,
              },
            ]);

          setTimeout(() => {
            e.target.value = "";
          }, 0);
        }}
      />
    </div>
  );
};

export default ListProject;
