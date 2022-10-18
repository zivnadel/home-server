import { contextBridge, ipcRenderer, OpenDialogOptions } from "electron";

contextBridge.exposeInMainWorld("electron", {
  selectAndSendFiles: (
    dialogOptions: OpenDialogOptions,
    dest: string,
    url: string
  ) => ipcRenderer.invoke("selectAndSendFiles", dialogOptions, dest, url),
  downloadFile: (url: string, path: string) =>
    ipcRenderer.invoke("downloadFile", url, path),
  downloadFolder: (url: string, path: string) =>
    ipcRenderer.invoke("downloadFolder", url, path),
});
