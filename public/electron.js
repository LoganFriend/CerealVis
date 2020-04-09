const { app, BrowserWindow, ipcMain, Menu } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");
Menu.setApplicationMenu(null);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1350,
    height: 800,
    nodeIntegration: false, // is default value after Electron v5
    contextIsolation: true, // protect against prototype pollution
    enableRemoteModule: false, // turn off remote
    webPreferences: {
      preload: path.join(app.getAppPath(), "./src/app-preload.js"), //Use a preload script
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(app.getAppPath(), "./build/index.html")}`
  );

  // Open the DevTools on start (if in development)
  if (isDev) mainWindow.webContents.openDevTools();

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
serial = new sp.SerialPortClass();

//IPC Channels
//-------------------------------------------------------------------------------------------------

//render processes can send logs to the main ipc channel with the pattern:
// window.ipcRenderer.send("log", severity, message)
ipcMain.on("log", (event, severity, message) => {
  console.log("Logging Channel: " + severity + ": " + message);
  //Pass log on to other renderer object so they may see them
  event.reply("log", severity, message)
});

ipcMain.on("serialport", (event, arg) => {
  streamtochart = function (data) {
    event.reply("datastream", data);
  };

  if (arg.cmd == "connect") {
    var bool;
    bool = serial.Connect(streamtochart, arg.port);
    event.reply("serialport", bool);
  } else if (arg.cmd == "start") {
    serial.Start();
  } else if (arg.cmd == "stop") {
    serial.Stop();
  } else if (arg.cmd == "getportlist") {
    event.reply("serialport", serial.GetPortList());
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
