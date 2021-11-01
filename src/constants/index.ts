import {v4 as uuidv4} from "uuid";
import {ITree} from "../types";

export const listNav = [
    { name: "ListProject" },
    { name: "Structure" },
    { name: "Builder" },
    { name: "Config" },
];

export const defaultTree: ITree = [
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
]
