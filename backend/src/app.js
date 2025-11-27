const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/users.routes');
const eventRoutes = require('./routes/events.routes');
const ticketRoutes = require('./routes/tickets.routes');
const uploadsRoutes = require('./routes/uploads.routes');
const errorMiddleware = require('./middleware/error.middleware');


const app = express();
app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json());
app.use(morgan('dev'));


const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);


app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/uploads', uploadsRoutes);


app.get('/api/health', (req, res) => res.json({ status: 'ok' }));


app.use(errorMiddleware);


module.exports = app;
