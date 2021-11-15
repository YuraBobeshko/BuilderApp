import React, { useState, useEffect } from "react";
import { options } from "../../constants";
import { ITypes } from "../../types";
import Button from "../UI/Button";

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

const BottomMenu = React.memo( ({
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
  useEffect( () => {
     (async () => {
      if (setText)
        if (text instanceof Promise) {
          const data = await text;
          setTextRes(data || '');
        } else if (text) {
          setTextRes(text);
        }
    })()
  }, [openTextEditor, text, setText]);

  return (
    <>
      <div>
        <Button className='add' onClick={onClickAdd}>add</Button>
        <Button className='delete' onClick={onClickDelete}>delete</Button>
        <Button className='closeOrOpen' onClick={onClickCloseOrOpen} disabled={!closeOrOpen}>
          {closeOrOpen || "not parent"}
        </Button>
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
          <Button className='setText' onClick={() => setOpenTextEditor(!openTextEditor)}>
            {openTextEditor ? "closeTextEditor" : "openTextEditor"}
          </Button>
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
    </>
  );
});

export default BottomMenu;
