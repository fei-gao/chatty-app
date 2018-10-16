React Boilerplate
=====================

A minimal and light dev environment for ReactJS.

## Features
1. It allows multiple users to join the same host
2. Each user can set their own username (optional) and type in a chat message
3. Message will be broadcasted to all conntected users. 
4. Number of connected users are listed and continously updated
5. Users are assigned a specific color for their chat messages and username changes
6. If users put images links (.png, .gif, .jpg), the image will be rendered in the screen

### Screenshot
![Screenshot of chatty app](https://github.com/fei-gao/chatty-app/blob/master/docs/chatty-app.png)
![Screenshot of post picture](https://github.com/fei-gao/chatty-app/blob/master/docs/post_picture.png)
## Getting Started
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies for the client using the `npm install` command.
3. Go to chatty_server folder and install dependencies for the server using `npm install` command
4. Start the webpack dev server using `npm start` in root directory
5. Start the websocket server using `node server.js` in chatty_server
6. The app will be served at <http://localhost:3000/>.

## Dependencies

- Node 5.10.x or above
### 1. Client Side
- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- babel-preset-stage-0
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom
### 2. Server
- express
- ws
- uuid


