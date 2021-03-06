// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const WebSocket = require('ws');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

const msgConstructor = function (msg){
    const randomId = uuidv1();
    const newMsg = {
        type: 'incomingMessage',
        id: randomId,
        username: msg.username,
        content: msg.content,
        color: msg.color
    }
    return newMsg;
}

const notificationConstructor = function(notification){
    const newNotification = {
        type: 'incomingNotification',
        id: uuidv1(),
        content: notification.content
    }
    return newNotification;
}

const broadcast = function(data){
    wss.clients.forEach((client) => {
        if(client.readyState === WebSocket.OPEN){
            client.send(JSON.stringify(data));
        }
    })
}

const assignColor = function(){
     return '#'+((1<<24)*Math.random()|0).toString(16)
}

const clients = [];
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
    clients.push(ws);
    ws.send(JSON.stringify({type: 'assignColor', color: assignColor()}));
    broadcast({type:'connect', num:clients.length});

  ws.on('message', function incoming(data){
      if(JSON.parse(data).type === 'postNotification'){
        let notificationObj = notificationConstructor(JSON.parse(data));
        broadcast(notificationObj);
      } else if(JSON.parse(data).type === 'postMessage'){
        let msgObj = msgConstructor(JSON.parse(data));
        broadcast(msgObj);
      }
  });
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
      clients.pop();
      broadcast({type:'connect', num:clients.length});
      })
      console.log('Client disconnected')
});