const mongoose = require('mongoose');
const app = require('../app');

require('dotenv').config();

const uriDb = process.env.DB_HOST;
const PORT = process.env.PORT || 3000;

const db = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

mongoose.connection.on('connected', () => {
  app.listen(PORT, () => {
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
