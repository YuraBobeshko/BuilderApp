import React from "react";
import { ISetTree } from "../../types";
import parser from "./parser";

export interface IUploader {
  setTree: ISetTree;
}

const Uploader = ({ setTree }: IUploader) => {
    return (
    <div>
      <input
        className="fileInput"
        type="file"
        onChange={(e) => parser(e, setTree)}
      />
    </div>
  );
};



export default Uploader;
