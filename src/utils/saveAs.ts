export default function saveAs(blob: Blob, fileName: string) {
  // @ts-ignore
  if (typeof navigator.msSaveOrOpenBlob !== "undefined") {
    // @ts-ignore
    return navigator.msSaveOrOpenBlob(blob, fileName);
    // @ts-ignore
  } else if (typeof navigator.msSaveBlob !== "undefined") {
    // @ts-ignore
    return navigator.msSaveBlob(blob, fileName);
  } else {
    const elem = window.document.createElement("a");
    elem.href = window.URL.createObjectURL(blob);
    elem.download = fileName;
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
