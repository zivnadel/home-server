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
  }
}

import "../src/index.css";

import "../src/index";
