import React from "react";

import { BottomMenu } from "../index";
import style from "./style";
import { ITree, ITypes, ISetTree, ITreeItem } from "../../types";

const changeTree = <Type,>(
  setTree: ISetTree,
  index: number,
  type: string,
  value?: string,
  indexes: number[] = [0]
) => {
  // const a: Type = '';
  // const b: string = a;
  // console.log(b)
  const addComponent = (parent: ITree, item: number) => {
    // const typeId: string | null =

    // const getType = () => {
    //   if (!typeId) return;
    //   if (+typeId === 1) return "component";
    //   if (+typeId === 2) return "folder";
    //   if (+typeId === 3) return "file";
    // };
    const element: ITreeItem = {
      children: [],
      name: "",
      type: "select",
      // type: typeId ?? getType(),
      //       ...(typeId && +typeId === 1
      //         ? {
      //             text: `import React from 'react'

      // const fdgdfg = () => {
      //     return (
      //         <div>

      //         </div>
      //     )
      // }

      // export default fdgdfg`,
      //           }
      //         : null),
    };
    if (indexes.length) {
      parent[item].children[index].children.push(element);
    } else {
      parent[item].children.push(element);
    }
  };
  const deleteComponent = (parent: ITree, item: number) => {
    if (indexes.length) {
      parent[item].children.splice(index, 1);
    } else {
      parent.splice(index, 1);
    }
  };
  const closeOrOpenComponent = (
    parent: ITree,
    item: number,
    value: boolean
  ) => {
    if (indexes.length) {
      parent[item].children[index].isClose = value;
    } else {
      parent[item].isClose = value;
    }
  };
  const setName = (parent: ITree, item: number) => {
    if (indexes.length) {
      parent[item].children[index].name = value;
    } else {
      parent[index].name = value;
    }
  };
  const setText = (parent: ITree, item: number) => {
    if (indexes.length) {
      parent[item].children[index].text = value;
    } else {
      parent[index].text = value;
    }
  };
  const setType = (parent: ITree, item: number, value: ITypes) => {
    if (indexes.length) {
      parent[item].children[index].type = value;
    } else {
      parent[index].type = value;
    }
  };

  setTree((prevState: ITree) => {
    const newState: ITree = JSON.parse(JSON.stringify(prevState));

    function findBrach(parent: ITree, iteratin: number) {
      if (iteratin + 1 === indexes?.length || !indexes?.length) {
        switch (type) {
          case "add":
            addComponent(parent, indexes[iteratin] || 0);
            break;
          case "delete":
            deleteComponent(parent, indexes[iteratin] || 0);
            break;
          case "close":
            closeOrOpenComponent(parent, indexes[iteratin] || 0, true);
            break;
          case "open":
            closeOrOpenComponent(parent, indexes[iteratin] || 0, false);
            break;
          case "setName":
            setName(parent, indexes[iteratin] || 0);
            break;
          case "setText":
            setText(parent, indexes[iteratin] || 0);
            break;
          case "setType":
            // @ts-ignore
            setType(parent, indexes[iteratin] || 0, value);
            break;
          default:
            break;
        }
        return parent;
      }
      findBrach(parent[indexes[iteratin]]?.children, ++iteratin);
    }
    findBrach(newState, 0);

    return newState;
  });
};

interface ITreeRenerer {
  tree: ITree;
  setTree: ISetTree;
  indexes?: number[];
}

const TreeRenerer = ({ tree, indexes = [], setTree }: ITreeRenerer) => {
  const changeTreeType = (index: number, type: string, value?: string) => {
    return () => changeTree<string>(setTree, index, type, value, indexes);
  };
  return (
    <>
      {tree.map((item: ITreeItem, index: number) => {
        if (!item?.children?.length) {
          return (
            <div style={style.block} key={index}>
              {[...indexes, index].join(" - ")}
              <BottomMenu
                type={item.type}
                text={item.text}
                name={item?.name || ""}
                setName={(value) => changeTreeType(index, "setName", value)()}
                setText={
                  item.type !== "folder"
                    ? (value) => changeTreeType(index, "setText", value)()
                    : undefined
                }
                onClickAdd={changeTreeType(index, "add")}
                onChangeType={(value) =>
                  changeTreeType(index, "setType", value)()
                }
                onClickDelet={changeTreeType(index, "delete")}
                onClickCloseOrOpen={changeTreeType(index, "close")}
              />
            </div>
          );
        }

        const closeOrOpen = item?.isClose ? "open" : "close";

        return (
          <div key={index} style={style.block}>
            <span>{[...indexes, index].join(" - ")}</span>
            <BottomMenu
              type={item.type}
              text={item.text}
              name={item.name || ""}
              closeOrOpen={closeOrOpen}
              setText={
                item.type !== "folder"
                  ? (value) => changeTreeType(index, "setText", value)()
                  : undefined
              }
              setName={(value) => changeTreeType(index, "setName", value)()}
              onClickAdd={changeTreeType(index, "add")}
              onChangeType={(value) =>
                changeTreeType(index, "setType", value)()
              }
              onClickDelet={changeTreeType(index, "delete")}
              onClickCloseOrOpen={changeTreeType(index, closeOrOpen)}
            />
            {!item.isClose && (
              <TreeRenerer
                tree={item.children}
                indexes={[...indexes, index]}
                setTree={setTree}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default TreeRenerer;
