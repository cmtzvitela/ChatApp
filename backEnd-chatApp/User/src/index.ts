import * as dotenv from 'dotenv';
import app from './lib/server.js';
import dbConnect from './lib/db.js';
dotenv.config();

const port = 3001;

dbConnect()
  .then(() => {
    console.log('DB Connected');
    app.listen(port, () => {
      console.log(`Server is up on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
