import * as dotenv from 'dotenv';
import app from './lib/server.js';
import dbConnect from './lib/db.js';
import server from './graphQL/server.js';
dotenv.config();
const port = 3001;
// app.get('/test', (req, res) => {
//   res.json({ message: 'Connection with the server' });
// });
// server.start().then(() => {
//   server.applyMiddleware({ app });
// });
dbConnect()
    .then(() => {
    console.log('DB Connected');
    app.listen(port, () => {
        console.log(`Server is up on port ${port}`);
    });
})
    .then(() => {
    server;
})
    .catch((error) => console.log(error));
