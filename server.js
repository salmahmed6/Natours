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
