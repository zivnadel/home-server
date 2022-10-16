import { app, BrowserWindow, dialog, ipcMain } from "electron";

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
    // Dereference the window object.
    Main.win = null;
  }

  private static onReady() {
    Main.createWindow();
    Main.win.on("closed", Main.onClose);

    ipcMain.handle("openDialog", (_, options) =>
      dialog.showOpenDialog(options)
    );
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
