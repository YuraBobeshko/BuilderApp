import React from "react";
import {BottomMenu} from "../index";
import style from "./style";
import {ITree, ITypes, ISetTree, ITreeItem} from "../../types";
import {v4 as uuidv4} from "uuid";

export type IChangeTree<T> = (
    setTree: ISetTree,
    index: number,
    type: string,
    indexes: number[],
    value?: T,
) => any;

const changeTree: IChangeTree<string> = (
    setTree,
    index,
    type,
    indexes = [0],
    value,
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
            id: uuidv4(),
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
    id?: string
}

function TreeItem({indexes = [], index, name, prop4, onChangeType, onClickDelete, item, onClickAdd, onClickCloseOrOpen}: {
    indexes: number[] | undefined,
    index: number,
    item: ITreeItem,
    name: (value: string) => void,
    prop4: (value: string) => any,
    onClickAdd: () => void,
    onChangeType: (value: string) => void,
    onClickDelete: () => void,
    onClickCloseOrOpen: () => void
}) {
    return <div style={style.block}>
        {[...indexes, index].join(" - ")}
        <BottomMenu
            type={item.type}
            text={item.text}
            name={item?.name || ""}
            setName={name}
            setText={
                item.type !== "folder"
                    ? prop4
                    : undefined
            }
            onClickAdd={onClickAdd}
            onChangeType={onChangeType
            }
            onClickDelete={onClickDelete}
            onClickCloseOrOpen={onClickCloseOrOpen}
        />
    </div>;
}

const TreeRenerer = React.memo(({tree, indexes = [], setTree}: ITreeRenerer) => {
    const changeTreeType = (index: number, type: string, value?: string) => {
        return () => changeTree(setTree, index, type, indexes, value);
    };
    return (
        <>
            {tree.map((item: ITreeItem, index: number) => {
                if (!item?.children?.length) {
                    return (
                        <TreeItem
                            key={index}
                            indexes={indexes} index={index} item={item}
                            name={(value) => changeTreeType(index, "setName", value)()}
                            prop4={(value) => changeTreeType(index, "setText", value)()}
                            onClickAdd={changeTreeType(index, "add")}
                            onChangeType={(value) => changeTreeType(index, "setType", value)()}
                            onClickDelete={changeTreeType(index, "delete")}
                            onClickCloseOrOpen={changeTreeType(index, "close")}/>
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
                            onClickDelete={changeTreeType(index, "delete")}
                            onClickCloseOrOpen={changeTreeType(index, closeOrOpen)}
                        />
                        {!item.isClose && (
                            <TreeRenerer
                                key={item.id}
                                id={item.id}
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
}, (a, b) => {
    let areEqual = true
    console.log(a, b)
    console.log(a.indexes === b.indexes)
    console.log(a.tree === b.tree)
    if (a.indexes && b.indexes)
        areEqual = a.indexes.every((item, index) => item === b.indexes?.at(index))
    // if(a.indexes && b.indexes)
    //  const resA = a.tree.find()

    return areEqual
});

export default TreeRenerer;
