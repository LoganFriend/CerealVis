# CerealVis - Project Documentation

CerealVis is a portable desktop application made to read in and display sensor data via a serial connection. CerealVis can connect to a variety of devices and start reading and displaying data from it. Features like auto connect and different types of visualization is what makes CerealVis a great tool for anyone looking to visualize sensor data.

Here is everything you would need to familiarize yourself with the internals of the project:

## Links

* [Electron API](https://www.electronjs.org/docs/api)
* [Electron Security Docs](https://www.electronjs.org/docs/tutorial/security)
* [Electron-Builder Docs](https://www.electron.build/)
* [ChartJS Docs](https://www.chartjs.org/docs/latest/)
* [SerialPort Docs](https://serialport.io/docs/guide-about)
* [An interesting read on the way electron's rendering process works](https://medium.com/cameron-nokes/deep-dive-into-electrons-main-and-renderer-processes-7a9599d5c9e2)
* [Material UI Theme Devias Kit (Inspiration for the UI used for the project)](https://material-ui.com/store/items/devias-kit/)

## Understanding IPC Communication

Electron Uses IPC channels to communicate between a main process (controls the main window instances and everything that works behind the scenes) and a render process (the user front end portion of the window).

The Main Process has access to the node modules in the program, including SerialPort. In order to make calls to that module from the front end, we have to communicate over the IPC Communication Channels. 

Channels have two pieces: an event and an argument. The event is useful when you want to reply to a sent message or find special metadata for a given message, whereas the argument has the primary important data that is sent along side the message.

In this program, there are 3 channels:
* serialport
  * Sends back and forth an argument object that contains a command as well as any other significant data, telling the serialport what to do.
* log
  * Used to pass logging messages back and forth between Processes. Used in the notification bar primarily.
* datastream
  * Special channel dedicated to only the data that is being streamed in from the serial port.

## The Main Files

### App.js && Routes.js

The program works quite similarly to a standard React.js app. There is a base index.html page in public/ that links to the App.js file in src/. App.js is where the main setup is for the front end UI, and its where the routing is set up as well. 

Since Electron is inherently a web browser, the way to move in-between pages is by routing to a different url. This is where Routes.js comes into play, where it specifies what front end components and layout to show when you get redirected to a specific url. 

### Dashboard Components

The dashboard components are where the majority of our front end is located. In it you will find the various charts and front end components required to communicate with the backend. The most important component is Serial, as it is what allows the front end to establish a device connection with the backend. 

In order to modify/add components, you will need to modify the Dashboard.js file.

## Continued development. 

The way the project was designed, there is no inherent API to interface with. While there is a "standard" to the way we communicate between a serial device and the serialport module, that standard can be modified very easily at this time. In the event that further development continues, I encourage you to visit some of the links above. A general knowledge of Electron, React.js, and IOT devices will be very helpful.