import React from "react";

const options = [{ name: "componet" }, { name: "folder" }, { name: "file" }];

const BottomMenu = ({
  name,
  type,
  closeOrOpen,
  setName,
  onChangeType,
  onClickAdd,
  onClickDelet,
  onClickCloseOrOpen,
}) => {
  return (
    <div>
      {onClickAdd && <button onClick={onClickAdd}>add</button>}
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
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default BottomMenu;
