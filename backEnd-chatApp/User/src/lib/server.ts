import express from 'express';
import cors from 'cors';
import router from '../routers/userRoutes.js';

const app = express();

app.use(express.json());

app.use(cors());

app.get('/signin', (req, res) => {
  res.json({ message: 'Signed In' });
});

app.use(router);

export default app;
