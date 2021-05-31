import React, { useState } from "react";

const options = [{ name: "component" }, { name: "folder" }, { name: "file" }];

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
}) => {
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
          onChange={(e) => {
            onChangeType(e.target.value);
          }}
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
