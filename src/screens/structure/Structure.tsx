import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import { TreeRenerer, StructureCreator, Uploader } from "../../components";
import { ListProjectActions } from "../../redux/actions";
import { IGetStructure, IProject } from "../../types";

function Structure() {
  let { currentId } = useParams<{ currentId: string | undefined }>();
  const dispatch = useDispatch();
  const project = useSelector((state) =>
    state.listProject.find((project) => project.id === currentId)
  ) as IProject;

  const tree = project.structure
  function setTree(structure: IGetStructure) {
    dispatch(
      ListProjectActions.editProject({ ...project, structure: structure(tree) })
    );
  }

  useEffect(() => {
    setTree(() => [
      {
        id: uuidv4(),
        type: "folder",
        name: "src",
        children: [
          {
            id: uuidv4(),
            type: "folder",
            name: "component",
            children: [
              {
                id: uuidv4(),
                type: "folder",
                name: "UI",
                children: [
                  {
                    id: uuidv4(),
                    children: [],
                    type: "component",
                    name: "Button",
                    text: "<button></button>",
                  },
                  {
                    id: uuidv4(),
                    children: [],
                    type: "component",
                    name: "Input",
                  },
                  {
                    id: uuidv4(),
                    children: [],
                    type: "component",
                    name: "Select",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: uuidv4(),
        type: "folder",
        name: "screen",
        children: [
          { id: uuidv4(), type: "file", name: "main", children: [] },
          { id: uuidv4(), type: "file", name: "singup", children: [] },
        ],
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TreeRenerer tree={tree} setTree={setTree} />
      <StructureCreator tree={tree} />
      <Uploader setTree={setTree} />
    </>
  );
}

export default Structure;
