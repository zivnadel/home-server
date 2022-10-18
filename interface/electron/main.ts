import {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  OpenDialogOptions,
} from "electron";
import FormData from "form-data";
import { createReadStream } from "fs";
import fs from "fs/promises";
import axios from "axios";

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

class Main {
  private static win: Electron.BrowserWindow;

  private static onWindowAllClosed() {
    if (process.platform !== "darwin") {
      app.quit();
    }
  }

  private static createWindow() {
    Main.win = new BrowserWindow({
      height: 600,
      width: 800,
      autoHideMenuBar: true,
      webPreferences: {
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    Main.win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

    Main.win.webContents.openDevTools();
  }

  private static onClose() {
    Main.win = null;
  }

  private static onReady() {
    Main.createWindow();
    Main.win.on("closed", Main.onClose);

    ipcMain.handle(
      "selectAndSendFiles",
      async (
        _,
        dialogOptions: OpenDialogOptions,
        dest: string,
        url: string
      ) => {
        const { filePaths, canceled } = await dialog.showOpenDialog(
          dialogOptions
        );

        if (!canceled) {
          const formData = new FormData();

          formData.append("path", dest);

          filePaths.forEach((path, index) => {
            formData.append(path.split("\\").pop(), createReadStream(path));
          });

          await axios.post(url, formData);

          Main.win.reload();
        }
      }
    );

    ipcMain.handle("downloadFile", async (_, url: string, path: string) => {
      const { filePaths, canceled } = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (!canceled) {
        const res = await axios.get(`${url}/${path.replace("\\", "/")}`, {
          responseType: "stream",
        });

        await fs.writeFile(
          `${filePaths[0]}\\${path.split("\\").pop()}`,
          res.data
        );
      }
    });

    ipcMain.handle("downloadFolder", async (_, url: string, path: string) => {
      const { filePaths, canceled } = await dialog.showOpenDialog({
        properties: ["openDirectory"],
      });

      if (!canceled) {
        const res = await axios.get(`${url}/${path.replace("\\", "/")}`);

        const tree = res.data;
        const splittedPath = path.split("\\").pop();

        const generateFolder = async (tree: any, currentPath: string) => {
          for (const child of tree.children) {
            if (child.type === "directory") {
              await fs.mkdir(`${filePaths[0]}\\${currentPath}\\${child.name}`, {
                recursive: true,
              });
              await generateFolder(child, `${currentPath}\\${child.name}`);
            } else {
              await fs.writeFile(
                `${filePaths[0]}\\${currentPath}\\${child.name}`,
                child.file,
                "base64"
              );
            }
          }
        };

        await fs.mkdir(`${filePaths[0]}\\${splittedPath}`, {
          recursive: true,
        });
        await generateFolder(tree, splittedPath);
      }
    });
  }

  static main() {
    app.on("window-all-closed", Main.onWindowAllClosed);
    app.whenReady().then(Main.onReady);
  }
}

if (require("electron-squirrel-startup")) {
  app.quit();
}

Main.main();
