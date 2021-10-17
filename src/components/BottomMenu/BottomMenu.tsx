import React, { useState, useEffect } from "react";
import { ITypes } from "../../types";
const options = [{ name: "component" }, { name: "folder" }, { name: "file" }];

interface IBottomMenu {
  name?: string;
  text?: string | Promise<string>;
  type?: ITypes;
  closeOrOpen?: "open" | "close";
  setName: (name: string) => void;
  setText?: (name: string) => void;
  onClickAdd: () => void;
  onClickDelete?: () => void;
  onChangeType: (type: ITypes) => void;
  onClickCloseOrOpen: () => void;
}

const BottomMenu = ({
  name,
  text,
  type,
  closeOrOpen,
  setName,
  setText,
  onChangeType,
  onClickAdd,
  onClickDelete,
  onClickCloseOrOpen,
}: IBottomMenu) => {
  const [openTextEditor, setOpenTextEditor] = useState(false);
  const [textRes, setTextRes] = useState("");
  useEffect(() => {
    if (setText)
      if (text instanceof Promise) {
        text.then((data) => setTextRes(data));
      } else if (text) {
        setTextRes(text);
      }
  }, [openTextEditor, text, setText]);

  return (
    <>
      <div>
        <button onClick={onClickAdd}>add</button>
        <button onClick={onClickDelete}>delete</button>
        <button onClick={onClickCloseOrOpen} disabled={!closeOrOpen}>
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
        {setText && (
          <button onClick={() => setOpenTextEditor(!openTextEditor)}>
            {openTextEditor ? "closeTextEditor" : "openTextEditor"}
          </button>
        )}
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {openTextEditor && setText && (
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={textRes}
          style={{ width: 500, height: 200 }}
        />
      )}
    </>
  );
};

export default BottomMenu;
