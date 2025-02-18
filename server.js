const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { default: connectDB } = require('./config/data');

dotenv.config();

//connect to DB
connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});

process.on('unhandleRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLE REJECTION');
  server.close(() => {
    process.exit(1);
  });
});
