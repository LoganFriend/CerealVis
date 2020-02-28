const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 680,
    nodeIntegration: false, // is default value after Electron v5
    contextIsolation: true, // protect against prototype pollution
    enableRemoteModule: false, // turn off remote
    webPreferences: {
      preload: path.join(app.getAppPath(), "./src/app-preload.js") //Use a preload script
    }
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(app.getAppPath(), "./build/index.html")}`
  );

  // Open the DevTools on start (if in development)
  if (isDev) mainWindow.webContents.openDevTools();

  // Emitted when the window is closed
  mainWindow.on("closed", function() {
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
app.on("window-all-closed", function() {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
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

ipcMain.on("ping", (event, arg) => {
  console.log("ping"); // prints "ping"
  event.reply("pong");
});

ipcMain.on("log", (event, arg) => {
  console.log(arg);
});

ipcMain.on("run", (event, arg) => {
  streamtochart = function(data) {
    event.reply("datastream", data);
  };

  console.log(serial.Connect(streamtochart));
  serial.DataGate();
});

ipcMain.on("close", (event, arg) => {
  serial.Close();
});
//-------------------------------------------------------------------------------------------------
