import * as dotenv from 'dotenv';
import eServer from './lib/server.js';
import dbConnect from './lib/db.js';
import server from './graphQL/server.js';
dotenv.config();

const port = 3001;

dbConnect()
  .then(() => {
    console.log('DB Connected');
    eServer.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .then(() => {
    server;
  })
  .catch((error) => console.log(error));
