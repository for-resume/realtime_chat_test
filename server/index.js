const express = require('express');
const socket = require('socket.io');
const http = require('http');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket(server);

app.use(cors());
app.use(router);

io.on('connect', socket => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.emit('message', {
      id: 'adminWlc',
      user: 'admin',
      text: `${user.name}, welcome to the room`,
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { id: 'adminJoined', user: 'admin', text: `${user.name} has joined` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', {
      id: `_${Math.random().toString(36).substr(2, 9)}`,
      user: user.name,
      text: message,
    });

    callback();
  });

  socket.on('removeMessage', (selectedMessageId, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('messageRemoved', selectedMessageId);

    callback();
  });

  socket.on('editMessage', ({ selectedMessageId, message }, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('messageEdited', {
      id: selectedMessageId,
      text: message,
    });

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', {
        id: 'adminLeft',
        user: 'admin',
        text: `${user.name} has left`,
      });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    }
  });
});

server.listen(process.env.PORT || 5000, () => console.log('Server has started.'));
