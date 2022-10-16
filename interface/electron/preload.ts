import { contextBridge, ipcRenderer, OpenDialogOptions } from "electron";

contextBridge.exposeInMainWorld("electron", {
  dialog: {
    showOpenDialog: (options: OpenDialogOptions) =>
      ipcRenderer.invoke("openDialog", options),
  },
});
