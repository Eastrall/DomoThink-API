# DomoThink-Test-API

DomoThink is a home automation project. We want to create a simple box that can communicate with all your connected objects. Our vision is to allow home automation to people who doesn't have a large computer science knowledge to control their home from there mobiles.

Our team is divide in 3 teams:
- Operational team (This team is responsible for the maintenance of the box that comunicates with the objects)
- Core team (this team is responsible for the developpment of the Core API in C++. This API is the interface between the objects and the mobile applications)
- Mobile team (this team is responsible for the developpment of the mobile applications like Android, iOS and Windows 10 apps.)

This is a test API for the DomoThink project. We develop this API in order to test our mobile applications while we wait the true C++ API developped by our Core Team.


## How to setup on Windows

- Install node.js
- Clone this repository or a stable release
- open a comand prompt
- type "npm install"
- type "npm start"

# Installing on a Raspberry Pi environment (Raspbian)

If you want to use the API on a Raspberry Pi with Raspbian, you can launch the `install.sh` file and it will setup a good environment for your API.

Let's get started.

- Connect to your Raspberry Pi with Putty (or everything else)
- type `wget https://raw.githubusercontent.com/Eastrall/DomoThink-Test-API/master/install/install.sh`
- type `chmod +x install.sh`
- type `./install.sh`
- wait ~10 minutes while the script setup the API for you

## Features

- Login / Logout
- Device management
- Directive management
- User management
- Plugin management
- Setup script for Linux environment

## To do list

- ...

## Login headers

When you login to the API via the `/login` route (POST method) you will recieve a `token` that you have to store somewhere on your app.

This token is essential to access the other routes. To verify you are authentificated, you must send the `token` for each request via an HTTP header.
These are the HTTP headers you must implement:

- `login-token` : corresponding to your `token`
