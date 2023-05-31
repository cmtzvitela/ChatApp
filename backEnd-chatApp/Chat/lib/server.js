import express from 'express';
import messagesRoutes from '../routes/messagesRoutes.js';
import conversationRoutes from '../routes/conversationRoutes.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.use(messagesRoutes);
app.use(conversationRoutes);

export default app;
