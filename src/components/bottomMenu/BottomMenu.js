import React from "react";

const BottomMenu = ({
  name,
  closeOrOpen,
  setName,
  onClickAdd,
  onClickDelet,
  onClickCloseOrOpen,
}) => {
  return (
    <div>
      {onClickAdd && <button onClick={onClickAdd}>add</button>}
      <button onClick={onClickDelet}>delete</button>
      {closeOrOpen && (
        <button onClick={onClickCloseOrOpen}>{closeOrOpen}</button>
      )}
      <input value={name} onChange={(e) => setName(e.target.value)} />
    </div>
  );
};

export default BottomMenu;
