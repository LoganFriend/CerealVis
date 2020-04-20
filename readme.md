# CerealVis

CerealVis is a portable desktop application made to read in and display sensor data via a serial connection. CerealVis can connect to a variety of devices and start reading and displaying data from it. Features like auto connect and different types of visualization is what makes CerealVis a great tool for anyone looking to visualize sensor data.

## Installation

Downloads can be found in the release section of our github repo. If you want to build the project yourself and have both git and npm installed, you can run the following: 

~~~
git clone https://github.com/LoganFriend/CerealVis.git
cd CerealVis
npm install && npm run build
~~~

This will create both an installation tool and an unpacked version in the dist folder that can be run without an installer.

## Usage

1. Connect your device to any of your USB ports.

2. Click the "Search" button in order to connect to your device.

3. Click the "Start" button in order to read and display data.

4. Switch between tabs to see different visualizations.

5. Click the "Stop" button to stop displaying data.

6. Click the "Disconnect" button to disconnect from the device.


If you want to set up your own device for using with this project, use the examples within this repository as a baseline. values sent to the program are in an analog form between 0 and 1024.

## Contributing

This project will no longer be under official development as of May 9th, 2020. You're free to fork this repo and build upon the project under the MIT license.

## License
[MIT](https://choosealicense.com/licenses/mit/)