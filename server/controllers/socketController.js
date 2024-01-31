import uniqid from 'uniqid';
import usersManager from '../managers/users.js';
import { roomNameGenerator } from '../utils/roomUtils.js';
import messagesManager from '../managers/messagesManager.js';

export function socketController(socket, io) {
  const registerUser = (data) => {
    let users = [...usersManager.getUsers()];
    users = users.filter(({ nickname }) => nickname !== data.nickname);

    socket.join(data.nickname);

    return users;
  }

  socket.on('register-user', (data, callback) => {
    try {
      console.log('register-user: ', data);
      usersManager.registerUser(data);

      const users = registerUser(data);
      
      io.except(data.nickname).emit('user-connected', data);

      callback({
        error: null,
        data: { users },
        status: "ok"
      })
    } catch (error) {
      console.log('error register user: ', error);
      callback({
        error: { message: error.message },
        status: "error",
        data: null
      })
    }
  });

  socket.on('reconnect-user', (data, callback) => {
    console.log('reconnect user: ', data);
    
    const users = registerUser(data);

    const existUser = usersManager.existUser(data);

    if (!existUser) {
      usersManager.registerUser(data);
      io.except(data.nickname).emit('user-connected', data);
    }

    if (callback) {
      callback({
        error: null,
        status: "ok",
        data: { users }
      })
    }
  }) 

  socket.on('open-chat', (data, callback) => {
    const { participants } = data;

    const roomName = roomNameGenerator(participants);
    const roomMessages = messagesManager.getMessagesByRoom(roomName);

    const joinSocket = socket.join(roomName);

    const response = {
      messages: roomMessages ? roomMessages : []
    };
    
    callback(response);
  });

  socket.on('leave-chat', (data) => {
    const { participants } = data;

    const roomName = roomNameGenerator(participants);
    socket.leave(roomName);
  });

  socket.on('send-message', async (data, callback) => {
    const roomName = roomNameGenerator(data);
    const messageId = uniqid(`${roomName}-`);
    const messageData = {
      ...data,
      messageId,
    }
    console.log('send-message: ', data);
    console.log('roomName: ', roomName);
    const clientsInRoom = io.sockets.adapter.rooms.get(roomName);

    let roomData = {
      room: roomName,
      event: 'new-message'
    }
    console.log('clientsInRoom: ', clientsInRoom);
    if (!clientsInRoom || clientsInRoom.size === 1) {
      roomData = {
        room: data.to,
        event: 'noti-new-message'
      }
    }
  
    socket.to(roomData.room).emit(roomData.event, messageData);
    messagesManager.saveMessagesByRoom(roomName, [messageData]);

    if (callback) {
      callback({ message: messageData });
    }
  })
};
