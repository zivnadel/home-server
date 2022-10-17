import { OpenDialogOptions, OpenDialogReturnValue } from "electron";

declare global {
  interface Window {
    electron: {
      dialog: {
        showOpenDialog: (
          options: OpenDialogOptions
        ) => Promise<OpenDialogReturnValue>;
      };
    };
    SERVER_URL: string;
  }
}

window.SERVER_URL = "http://localhost:5000";

import "../src/index.css";

import "../src/index";
