import { OpenDialogOptions, OpenDialogReturnValue } from "electron";

declare global {
  interface Window {
    electron: {
      selectAndSendFiles: (
        dialogOptions: OpenDialogOptions,
        dest: string,
        url: string
      ) => Promise<any>;
      downloadFile: (url: string, path: string) => Promise<any>;
      downloadFolder: (url: string, path: string) => Promise<any>;
    };
    SERVER_URL: string;
    SERVER_PORT: string;
  }
}

window.SERVER_URL = "http://localhost";
window.SERVER_PORT = "5000";

import "../src/index.css";

import "../src/index";
