import React, { useState } from "react";
import { ITypes } from "../../types";
const options = [{ name: "component" }, { name: "folder" }, { name: "file" }];

interface IBottomMenu {
  name?: string;
  text?: string;
  type?: ITypes;
  closeOrOpen?: "open" | "close";
  setName: (name: string) => void;
  onChangeType: (type: ITypes) => void;
  onClickAdd: () => void;
  onClickDelet?: () => void;
  onClickCloseOrOpen: () => void;
}

const BottomMenu = ({
  name,
  text,
  type,
  closeOrOpen,
  setName,
  onChangeType,
  onClickAdd,
  onClickDelet,
  onClickCloseOrOpen,
}: IBottomMenu) => {
  const [openTextEditor, setOpenTextEditor] = useState(false);
  return (
    <>
      <div>
        <button onClick={onClickAdd}>add</button>
        <button onClick={onClickDelet}>delete</button>
        <button onClick={onClickCloseOrOpen} disabled={!!onClickCloseOrOpen}>
          {closeOrOpen || "not parent"}
        </button>
        <select
          onChange={(
            event: React.ChangeEvent<HTMLSelectElement> & {
              target: { value: ITypes };
            }
          ) => onChangeType(event.target.value)}
          value={type || "select"}
        >
          <option value="select" hidden>
            select
          </option>
          {options.map(({ name }) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
        <button onClick={() => setOpenTextEditor(!openTextEditor)}>
          {openTextEditor ? "closeTextEditor" : "openTextEditor"}
        </button>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {openTextEditor && (
        <textarea
          onChange={() => {}}
          value={text}
          style={{ width: 500, height: 200 }}
        />
      )}
    </>
  );
};

export default BottomMenu;
