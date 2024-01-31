import express from 'express';
import http from 'http';
import { Server as SocketServer } from 'socket.io';
import { socketController } from './controllers/socketController.js';

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

const PORT = 3000;

io.on('connection', (socket) => {
  console.log('Client connected');

  socketController(socket, io);
})

server.listen(PORT, () => {
  console.log('Server listening on port: ', PORT);
});