import React from "react";

import { BottomMenu } from "../index";
import style from "./style";

const changeTree = (setArr, indexes, index, type, value) => {
  const addComponent = (parent, item) => {
    parent[item].children[index].children.push({ children: [] });
  };
  const deleteComponent = (parent, item) => {
    if (indexes.length) {
      parent[item].children.splice(index, 1);
    } else {
      parent.splice(index, 1);
    }
  };
  const closeOrOpenComponent = (parent, item, value) => {
    if (indexes.length) {
      parent[item].children[index].isClose = value;
    } else {
      parent[item].isClose = value;
    }
  };
  const setName = (parent, item) => {
    if (indexes.length) {
      parent[item].children[index].name = value;
    } else {
      parent[index].name = value;
    }
  };
  const setType = (parent, item) => {
    if (indexes.length) {
      parent[item].children[index].type = value;
    } else {
      parent[index].type = value;
    }
  };

  setArr((prevState) => {
    const value = JSON.parse(JSON.stringify(prevState));

    (indexes.length ? indexes : [index]).reduce((parent, item, idx) => {
      if (!idx) parent = value;

      if (idx + 1 === indexes.length || !indexes.length) {
        switch (type) {
          case "add":
            addComponent(parent, item);
            break;
          case "delete":
            deleteComponent(parent, item);
            break;
          case "close":
            closeOrOpenComponent(parent, item, true);
            break;
          case "open":
            closeOrOpenComponent(parent, item, false);
            break;
          case "setName":
            setName(parent, item);
            break;
          case "setType":
            setType(parent, item);
            break;
          default:
            break;
        }
        return parent;
      }

      return parent[item].children;
    }, 0);
    return [...value];
  });
};

const Tree = ({ arr, indexes = [], setArr }) => {
  const changeTreeType = (index, type, value) => {
    return () => changeTree(setArr, indexes, index, type, value);
  };
  return (
    <>
      {arr.map((item, index) => {
        if (!item?.children?.length) {
          return (
            <div style={style.block} key={index}>
              {[...indexes, index].join(" - ")}
              <BottomMenu
                name={item?.name || ""}
                type={item.type}
                setName={(value) => changeTreeType(index, "setName", value)()}
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
              name={item.name || ""}
              type={item.type}
              closeOrOpen={closeOrOpen}
              setName={(value) => changeTreeType(index, "setName", value)()}
              onClickAdd={changeTreeType(index, "add")}
              onChangeType={(value) =>
                changeTreeType(index, "setType", value)()
              }
              onClickDelet={changeTreeType(index, "delete")}
              onClickCloseOrOpen={changeTreeType(index, closeOrOpen)}
            />
            {!item.isClose && (
              <Tree
                arr={item.children}
                indexes={[...indexes, index]}
                setArr={setArr}
              />
            )}
          </div>
        );
      })}
    </>
  );
};

export default Tree;
