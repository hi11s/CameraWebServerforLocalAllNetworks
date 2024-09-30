const path = require('path');
const express = require('express');
const WebSocket = require('ws');
const app = express();

const WS_PORT = 8888;
const HTTP_POST = 8000;

const wsServer = new WebSocket.Server({port: WS_PORT}, ()=> console.log("WS Server listening at ...", {WS_PORT})); 

let connectedClients = [];
wsServer.on('connection', (ws, req)=>{
    console.log('Connected');
    connectedClients.push(ws);

    ws.on('message', data => {
        connectedClients.forEach((ws, i) => {
            if (ws.readyState === ws.OPEN) {
                ws.send(data);
            } else {
                connectedClients.splice(i, 1);
            }
        });
    });
});



app.get('/Client', (req, res)=>res.sendFile(path.resolve(__dirname, './client.html')));
app.listen(HTTP_POST, ()=> console.log('HTTP server is listening at ...', {HTTP_POST}));