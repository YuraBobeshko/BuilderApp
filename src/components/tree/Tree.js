import React from "react";

import { BottomMenu } from "../index";
import style from "./style";

const changeTree = (setArr, indexes, index, type, value) => {
  const addLeaf = (sum, item) => {
    sum[item].children[index].children.push({ children: [] });
  };
  const deleteLeaf = (sum, item) => {
    sum[item].children.splice(index, 1);
  };
  const closeOrOpenLeaf = (sum, item, value) => {
    sum[item].children[index].isClose = value;
  };
  const setName = (sum, item) => {
    sum[item].children[index].name = value;
  };

  setArr((prevState) => {
    const value = JSON.parse(JSON.stringify(prevState));

    indexes.reduce((sum, item, idx) => {
      if (!idx) sum = value;

      if (idx + 1 === indexes.length) {
        switch (type) {
          case "add":
            addLeaf(sum, item);
            break;
          case "delete":
            deleteLeaf(sum, item);
            break;
          case "close":
            closeOrOpenLeaf(sum, item, true);
            break;
          case "open":
            closeOrOpenLeaf(sum, item, false);
            break;
          case "setName":
            setName(sum, item);
            break;

          default:
            break;
        }
      }

      return sum[item].children;
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
                onClickCloseOrOpen={changeTreeType(index, "close")}
                onClickDelet={changeTreeType(index, "delete")}
                setName={(value) => changeTreeType(index, "setName", value)()}
              />
            </div>
          );
        }

        const closeOrOpen = item?.isClose ? "open" : "close";

        return (
          <div key={index} style={style.block}>
            <span>{[...indexes, index].join(" - ")}</span>
            <BottomMenu
              closeOrOpen={closeOrOpen}
              name={item.name || ""}
              onClickAdd={changeTreeType("add")}
              onClickCloseOrOpen={changeTreeType(index, closeOrOpen)}
              onClickDelet={changeTreeType(index, "delete")}
              setName={(value) => changeTreeType(index, "setName", value)()}
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
