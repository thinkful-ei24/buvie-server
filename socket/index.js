'use strict';

const initializeChat = io => {
  io.on('connection', (socket) => {
    console.log('made connection', socket.id);
    socket.on('subscribe', room => {
      console.log('joining ', room);
      socket.join(room);
    });

    socket.on('chat', data => {
      console.log(data, 'to ', data.room);
      io.sockets.in(data.room).emit('chat', data);
    });
  });
};

module.exports = { initializeChat };