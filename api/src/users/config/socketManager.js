const io = require('../../../server').io;

const users = {};

const socketToRoom = {};

module.exports = (socket) => {
  try {
    socket.on('join room', (roomId) => {
      if (users[roomId]) {
        const length = users[roomId].length;
        if (length === 4) {
          socket.emit('room full');
          return;
        }
        users[roomId].push(socket.id);
      } else {
        users[roomId] = [socket.id];
      }

      socketToRoom[socket.id] = roomId;
      const usersInThisRoom = users[roomId].filter((id) => id !== socket.id);

      socket.emit('all users', usersInThisRoom);
    });

    socket.on('sending signal', (payload) => {
      io.to(payload.userToSignal).emit('user joined', {
        signal: payload.signal,
        callerId: payload.callerId,
      });
    });

    socket.on('returning signal', (payload) => {
      io.to(payload.callerId).emit('receiving returned signal', {
        signal: payload.signal,
        id: socket.id,
      });
    });

    socket.on('disconnect', () => {
      const roomId = socketToRoom[socket.id];
      let room = users[roomId];
      if (room) {
        room = room.filter((id) => id !== socket.id);
        users[roomId] = room;
      }
      socket.broadcast.emit('user left', socket.id);
    });

    socket.on('code', (data, callback) => {
      socket.broadcast.emit('code', data);
    });
  } catch (ex) {
    console.log(ex.message);
  }
};
