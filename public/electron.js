const { app, BrowserWindow, ipcMain, Menu, session } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
Menu.setApplicationMenu(null);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1350,
    height: 900,
    minWidth: 960,
    minHeight: 720,
    nodeIntegration: false, // this should not be enabled for any window that loads remote content
    contextIsolation: true, // protect against prototype pollution and prevents global objects by scripts running in the render process
    enableRemoteModule: false, // turn off remote, this helps lock down the internal IPC channels
    webPreferences: {
      preload: path.join(app.getAppPath(), "./src/app-preload.js"), //Use a preload script
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(app.getAppPath(), "./build/index.html")}`
  );

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "script-src 'self' filesystem: 'report-sample' 'unsafe-inline' 'unsafe-eval'",
        ],
      },
    });
  });

  // Open the DevTools on start (if in development)
  if (isDev) {
    mainWindow.webContents.openDevTools();

    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": [
            "script-src 'self' filesystem: 'report-sample' 'unsafe-inline' 'unsafe-eval'",
          ],
        },
      });
    });
  } else {
    session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          "Content-Security-Policy": ["script-src 'self' filesystem:"],
        },
      });
    });
  }

  // Emitted when the window is closed
  mainWindow.on("closed", function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this section you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
//-------------------------------------------------------------------------------------------------

//SerialPort
//-------------------------------------------------------------------------------------------------
const sp = require("./serialport");
const serial = new sp.SerialPortClass();

//IPC Channels
//-------------------------------------------------------------------------------------------------

//render processes can send logs to the main ipc channel with the pattern:
// window.ipcRenderer.send("log", severity, message)
//
// severity can be one of the following:
// info
// success
// warning
// error
//
ipcMain.on("log", (event, severity, message) => {
  console.log("Logging Channel: " + severity + ": " + message);
  //Pass log on to other renderer object so they may see them
  event.reply("log", severity, message);
});

ipcMain.on("serialport", (event, arg) => {
  var streamtochart = function (data) {
    event.reply("datastream", data);
  };

  if (arg.cmd == "connect") {
    event.reply("serialport", serial.Connect(streamtochart, arg.port));
  } else if (arg.cmd == "start") {
    serial.Start();
  } else if (arg.cmd == "stop") {
    serial.Stop();
  } else if (arg.cmd == "getportlist") {
    (async () => {
      await serial.CreatePortList();
      event.reply("serialport", serial.GetPortList());
    })();
  } else if (arg.cmd == "disconnect") {
    serial.Disconnect();
  }
});

ipcMain.on("close", (event, arg) => {
  serial.Disconnect();
});

//-------------------------------------------------------------------------------------------------

app.on("window-all-closed", () => {
  serial.Disconnect();
});
