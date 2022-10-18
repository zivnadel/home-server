import { contextBridge, ipcRenderer, OpenDialogOptions } from "electron";

contextBridge.exposeInMainWorld("electron", {
  selectAndSendFiles: (dest: string, url: string) =>
    ipcRenderer.invoke("selectAndSendFiles", dest, url),
  selectAndSendFolder: (dest: string, url: string) =>
    ipcRenderer.invoke("selectAndSendFolder", dest, url),
  downloadFile: (url: string, path: string) =>
    ipcRenderer.invoke("downloadFile", url, path),
  downloadFolder: (url: string, path: string) =>
    ipcRenderer.invoke("downloadFolder", url, path),
});
