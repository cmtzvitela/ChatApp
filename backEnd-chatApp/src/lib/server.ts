import express from 'express';
import cors from 'cors';
import router from '../routers/userRoutes.js';
import { Server } from 'socket.io';
import http from 'http';

const app = express();
const eServer = http.createServer(app);
const io = new Server(eServer, {
  cors: {
    origin: 'https://localhost:3001',
  },
});

app.use(express.json());

app.use(cors());

app.get('/signin', (req, res) => {
  res.json({ message: 'Signed In' });
});

app.use(router);

io.on('connection', (socket) => {
  console.log('A user connected');
});

export default eServer;
