# DomoThink-Test-API

DomoThink is a home automation project. We want to create a simple box that can communicate with all your connected objects. Our vision is to allow home automation to people who doesn't have a large computer science knowledge to control their home from there mobiles.

Our team is divide in 3 teams:
- Operational team (This team is responsible for the maintenance of the box that comunicates with the objects)
- Core team (this team is responsible for the developpment of the Core API in C++. This API is the interface between the objects and the mobile applications)
- Mobile team (this team is responsible for the developpment of the mobile applications like Android, iOS and Windows 10 apps.)

This is a test API for the DomoThink project. We develop this API in order to test our mobile applications while we wait the true C++ API developped by our Core Team.


## How to setup

- Install node.js
- Clone this repository or a stable release
- open a comand prompt
- type "npm install"
- type "npm start"

## Features

- Login / Logout
- Device management
- Directive management

## To do list

- Plugin management
- User management
- Setup script

## Login headers

When you login to the API via the `/login` route (POST method) you will recieve a `token` that you have to store somewhere on your app.

This token is essential to access the other routes. To verify you are authentificated, you must send the `token` for each request via an HTTP header.
These are the HTTP headers you must implement:

- `login-token` : corresponding to your `token`
- `login-name` : corresponding to your `username` or `email` 
