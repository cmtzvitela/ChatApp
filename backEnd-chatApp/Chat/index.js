import * as dotenv from 'dotenv';
import server from './lib/server.js';
import dbConnect from './lib/db.js';

dotenv.config();

const port = 3005;

dbConnect()
  .then(() => {
    console.log('DB Connected');
    server.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
