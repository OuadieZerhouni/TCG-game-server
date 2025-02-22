const https = require('http');
const socketIo = require('socket.io');
const SocketHandler = require('../classes/network/SocketHandler');
const GameEngine = require('../classes/battle/GameEngine');

const server = https.createServer(
//     {
//     key: fs.readFileSync(process.env.SSL_KEY_PATH),
//     cert: fs.readFileSync(process.env.SSL_CERT_PATH),
// }
);
const io = socketIo(server);

const socketHandler = new SocketHandler(io, new GameEngine(), );
socketHandler.initializeSocketEvents();

const SOCKET_PORT = process.env.SOCKET_PORT;
server.listen(SOCKET_PORT, () => {
    console.log(`Socket open on port ${SOCKET_PORT}`);
});

module.exports = server;
