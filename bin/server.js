const mongoose = require('mongoose');
const fs = require('fs').promises;
const path = require('path');
const app = require('../app');
const {
  createFolderIfNotExist,
} = require('../helpers/fileSystem');

require('dotenv').config();

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;
const TEMP_DIR = path.join(process.cwd(), process.env.TEMP_DIR);
const AVATAR_DIR = path.resolve(__dirname, '../public', 'avatars');

const db = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  app.listen(PORT, async () => {
    await createFolderIfNotExist(TEMP_DIR);
    await createFolderIfNotExist(AVATAR_DIR);
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
  console.log('Database connection successful');
});

mongoose.connection.on('error', (err) => {
  console.log(`Server not running. Mongoose connection error: ${err}`);
  process.exit(1);
});

process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('DB is disconnected and application terminated');
    process.exit(1);
  });
});
