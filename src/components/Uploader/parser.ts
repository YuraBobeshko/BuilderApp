import { ChangeEvent } from "react";
import {ISetTree, ITree} from "../../types";
import {v4 as uuidv4} from "uuid";
import Zip, {JSZipObject} from "jszip";

export default function parser(e: ChangeEvent<HTMLInputElement>, setTree: ISetTree) {
    const reader = new FileReader();

    if (e.currentTarget.files == null) {
        throw new Error("Error finding e.currentTarget.files");
    }
    const file = e.currentTarget.files[0];

  reader.onloadend = async () => {
        const zip = await Zip.loadAsync(file);
        const listFolder = zip.files;
        const tree: ITree = [];

       zip.forEach((element: string, file: JSZipObject) => {
            const path = listFolder[element].name.split("/").filter(Boolean);

            function createTree(path: string[], tree: ITree) {
                if (!path[0]) return tree;
                if (!tree.find((element) => element?.name === path[0])) {
                    tree.push({
                        id: uuidv4(),
                        name: path[0],
                        children: [],
                        type: file.dir
                            ? "folder"
                            : file.name.endsWith(".tsx")
                                ? "component"
                                : "file" || "select",
                        text: file.async("string") || "",
                    });
                }
                if (path.length) {
                    createTree(
                        path.slice(1),
                        tree?.find((element) => element?.name === path[0])
                            ?.children || []
                    );
                }
            }

            createTree(path, tree);
        });
      setTree(() => tree);
    };

    reader.readAsDataURL(file);
}
