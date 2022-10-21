# Home Server

In my house, we needed a simple "shared folder" with a friendly interface to manage, store and share files between devices in the local network, so I created this system, written entirely in TypeScript, including a friendly and simple GUI built with Electron and React, and a server created with Node and Express.
It was a fun experiment creating this system entirely in the JavaScript ecosystem and it is actually very useful, simple and fast.

## Overview

As I mentioned, this system includes a GUI and a server.

### User Interface

Using this simple GUI, you can interact with the server and manage your files. There are 2 windows on this program: the main page, and a settings page.
In the main page, there is a view of the directory tree of the system, and you can interact with it with some simple controls, go ahead and explore those!
In the settings page, you can configure the URL of the server, and the port in use by the server. This setting is required to establish a connection to the server.

<div align="center">
  <img src="https://user-images.githubusercontent.com/52624380/197210145-76cb577e-9634-4318-b5b2-3608bb63e62f.png" width="480" height="360" /> <img src="https://user-images.githubusercontent.com/52624380/197208289-0b151710-1b8f-48a3-a31a-b41ae15bd87b.png" width="480" height="360" />
</div>

In the menu (opened with the hamburger button), you can access the pages as well as changing the language (options are English and Hebrew. Default is Hebrew).

<div align="center">
  <img src="https://user-images.githubusercontent.com/52624380/197210436-dddb3592-c83e-4337-8932-4fa23555df72.png" />
</div>

**The GUI is currently supporting Windows OS only.**

### Server

The server is a simple express server. The only thing you need to be aware of is that the "root" folder is the storage of this file-managment system. The directory tree presented in the GUI is rooted to this "root" folder, so keep it there (at the root of the server folder). Every file submitted via the GUI will be stored there.

## Installation and Config

### User Interface

On every device (running windows) you want to connect to the system, download and run the installer (.exe) from the latest release in the releases tab.
Make sure to configure the server URL and the port in the settings windows.
You are ready to go!

### Server

**Make sure you have node installed on the machine you want to host the server on.** Download the zipped folder containing the server from the latest release in the releases tab and extract in. Edit the .env file using any text editor and fill those variables:
```
DELETE_PASSWORD: The interface requires users to type a password upon file/folder deletion. Configure your password in this variable.
PORT: The port you server will be running on.
```
Open the folder in the Command Prompt and run ```npm install``` to install dependencies. After that, run ```npm start```. The server should be up and running.

## Important Notes

- This system is intended for local network usage only. It is not very secured because it isn't intended to be exposed to external network traffic. Keep that in mind.
- The server URL will be the internal IP address of the device hosting the server. You can get that using the ```ipconfig``` command or other tools.
- The server can be hosted on any OS running node, but the GUI is Windows only.

## Technologies Used

TypeScript, Electron.js, Webpack, Electron Forge, React.js, react-router-dom (v6), Tailwind CSS, Axios, Node.js, Express.js, Multer and more.

## Coming Soon

I will add more features to this system when needed, as well as additional interface for mobile devices (probably in React Native).

## License

This is an open source software under [MIT License](https://github.com/zivnadel/home-server/blob/master/LICENSE.md).
