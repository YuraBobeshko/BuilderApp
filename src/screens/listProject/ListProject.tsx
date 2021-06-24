import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { ListProjectActions } from "../../redux/actions";

const ListProject = () => {
  let { currentId } = useParams<{ currentId: string | undefined }>();
  const dispatch = useDispatch();
  const listProject = useSelector((state) => state.listProject);
  let history = useHistory();

  console.log(listProject);

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
            dispatch(
              ListProjectActions.addProject({
                id: uuidv4(),
                name: e.target.value,
                structure: [],
              })
            );

          setTimeout(() => {
            e.target.value = "";
          }, 0);
        }}
      />
    </div>
  );
};

export default ListProject;
