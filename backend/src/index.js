require('dotenv').config();
const http = require('http');
const app = require('./app');
const connectDB = require('./config/db');
const { initSocket } = require('./socket');
const logger = require('./utils/logger');


const PORT = process.env.PORT || 5000;


(async () => {
await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/event-manager-dev');
const server = http.createServer(app);
initSocket(server);
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
})();
