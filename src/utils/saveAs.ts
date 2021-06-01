export default function saveAs(blob: Blob, fileName: string) {
  if (typeof navigator.msSaveOrOpenBlob !== "undefined") {
    return navigator.msSaveOrOpenBlob(blob, fileName);
  } else if (typeof navigator.msSaveBlob !== "undefined") {
    return navigator.msSaveBlob(blob, fileName);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = fileName;
    // @ts-ignore
    elem.style = "display:none;opacity:0;color:transparent;";
    (document.body || document.documentElement).appendChild(elem);
    if (typeof elem.click === "function") {
      elem.click();
    } else {
      elem.target = "_blank";
      elem.dispatchEvent(
        new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true,
        })
      );
    }
    URL.revokeObjectURL(elem.href);
  }
}
