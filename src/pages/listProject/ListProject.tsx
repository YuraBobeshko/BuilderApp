import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { ListProjectActions } from "../../redux/actions";

const ListProject = () => {
  const { currentId } = useParams<{ currentId: string | undefined }>();
  const dispatch = useDispatch();
  const listProject = useSelector((state) => state.listProject);
  const history = useHistory();

  return (
    <div>
      <ul>
        {listProject.map(({ name, id }) => (
          <li
            key={id}
            onClick={() =>
              history.push(id === currentId ? "/ListProject/" : id)
            }
            onContextMenu={() => dispatch(ListProjectActions.deleteProject(id))}
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
