const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');


let io;


const initSocket = (server) => {
io = new Server(server, { cors: { origin: process.env.CLIENT_URL || 'http://localhost:5173' } });


io.use((socket, next) => {
const token = socket.handshake.auth?.token;
if (!token) return next(); // unauthenticated sockets allowed for public events
try {
const payload = jwt.verify(token, process.env.JWT_SECRET);
socket.userId = payload.sub;
next();
} catch (err) {
next();
}
});


io.on('connection', (socket) => {
console.log('socket connected', socket.id);


socket.on('join:event', (eventId) => {
socket.join(`event:${eventId}`);
});


socket.on('leave:event', (eventId) => {
socket.leave(`event:${eventId}`);
});


socket.on('disconnect', () => {
console.log('socket disconnected', socket.id);
});
});
};


const getIO = () => io;
module.exports = { initSocket, getIO };
