const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
  console.log('UNHANDLE REJECTION shutting down..');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');
const { default: connectDB } = require('./src/config/data');

dotenv.config();

//connect to DB
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});

process.on('unhandleRejection', (err) => {
  console.log('UNHANDLE REJECTION shutting down..');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
