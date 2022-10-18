import { app, BrowserWindow, dialog, ipcMain } from "electron";

import fs from "fs";
import fsp from "fs/promises";
import path from "path";
import FormData from "form-data";

import dirTree from "directory-tree";
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
      icon: path.join(__dirname, "..", "..", "assets", "icon.png"),
      webPreferences: {
        devTools: !app.isPackaged,
        contextIsolation: true,
        preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      },
    });

    Main.win.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
  }

  private static onClose() {
    Main.win = null;
  }

  private static onReady() {
    Main.createWindow();
    Main.win.on("closed", Main.onClose);

    ipcMain.handle(
      "selectAndSendFiles",
      async (_, dest: string, url: string) => {
        const { filePaths, canceled } = await dialog.showOpenDialog({
          properties: ["openFile", "multiSelections"],
        });

        if (!canceled) {
          const formData = new FormData();

          formData.append("path", dest);

          filePaths.forEach((path, index) => {
            formData.append(path.split("\\").pop(), fs.createReadStream(path));
          });

          await axios.post(url, formData);

          Main.win.reload();
        }
      }
    );

    ipcMain.handle(
      "selectAndSendFolder",
      async (_, dest: string, url: string) => {
        const createFormData = (tree: any, formData: FormData) => {
          tree.children.forEach((child: any) => {
            if (child.type === "directory") {
              createFormData(child, formData);
            } else {
              formData.append(child.path, child.file);
            }
          });
        };

        const { filePaths, canceled } = await dialog.showOpenDialog({
          properties: ["openDirectory"],
        });

        const folderName = path.basename(filePaths[0]);

        if (!canceled) {
          const tree = dirTree(
            filePaths[0],
            {
              attributes: ["type"],
            },
            async (item, PATH, stats) => {
              (item as any).file = fs.createReadStream(item.path);
              const splittedPath = `${dest}\\${folderName}\\${PATH.split(
                `\\${folderName}\\`
              ).pop()}`;
              if (splittedPath.endsWith("\\")) {
                item.path = splittedPath.substring(0, splittedPath.length - 1);
              } else {
                item.path = splittedPath;
              }
            },
            (item, PATH, stats) => {
              const splittedPath = `${dest}\\${folderName}\\${PATH.split(
                `\\${folderName}\\`
              ).pop()}`;
              if (splittedPath.endsWith("\\")) {
                item.path = splittedPath.substring(0, splittedPath.length - 1);
              } else {
                item.path = splittedPath;
              }
            }
          );

          const formData = new FormData();

          createFormData(tree, formData);

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

        await fsp.writeFile(
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
              await fsp.mkdir(
                `${filePaths[0]}\\${currentPath}\\${child.name}`,
                {
                  recursive: true,
                }
              );
              await generateFolder(child, `${currentPath}\\${child.name}`);
            } else {
              await fsp.writeFile(
                `${filePaths[0]}\\${currentPath}\\${child.name}`,
                child.file,
                "base64"
              );
            }
          }
        };

        await fsp.mkdir(`${filePaths[0]}\\${splittedPath}`, {
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
