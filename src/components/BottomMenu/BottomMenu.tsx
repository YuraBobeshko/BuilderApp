import React, { useState, useEffect } from "react";
import { ITypes } from "../../types";
const options = [{ name: "component" }, { name: "folder" }, { name: "file" }];

export interface IBottomMenu {
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
  // @ts-ignore
  useEffect(async () => {
    if (setText)
      if (text instanceof Promise) {
        const data = await text;
        setTextRes(data || '');
      } else if (text) {
        setTextRes(text);
      }
  }, [openTextEditor, text, setText]);

  return (
    <>
      <div>
        <button className='add' onClick={onClickAdd}>add</button>
        <button className='delete' onClick={onClickDelete}>delete</button>
        <button className='closeOrOpen' onClick={onClickCloseOrOpen} disabled={!closeOrOpen}>
          {closeOrOpen || "not parent"}
        </button>
        <select
          className='selectType'
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
          <button className='setText' onClick={() => setOpenTextEditor(!openTextEditor)}>
            {openTextEditor ? "closeTextEditor" : "openTextEditor"}
          </button>
        )}
        <input className='name' value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      {openTextEditor && setText && (
        <textarea
          className='text'
          onChange={(e) => setText(e.target.value)}
          value={textRes}
          style={{ width: 500, height: 200 }}
        />
      )}
      {textRes}
    </>
  );
};

export default BottomMenu;
