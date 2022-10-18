declare global {
  interface Window {
    electron: {
      selectAndSendFiles: (dest: string, url: string) => Promise<any>;
      selectAndSendFolder: (dest: string, url: string) => Promise<any>;
      downloadFile: (url: string, path: string) => Promise<any>;
      downloadFolder: (url: string, path: string) => Promise<any>;
    };
  }
}

import "../src/index.css";

import "../src/index";
