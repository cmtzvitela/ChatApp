import express from 'express';
import router from '../routers/userRoutes.js';
const app = express();
app.use(express.json());
app.get('/signin', (req, res) => {
    res.json({ message: 'Signed In' });
});
app.use(router);
export default app;
