const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');
const { default: connectDB } = require('./config/data');

dotenv.config();

//connect to DB
connectDB();

// const testTour = new Tour({
//     name: 'the Park Camper',
//     price: 997
// });

// testTour
//     .save()
//     .then(doc => {
//         console.log(doc);
//     }).catch(err => {
//         console.log('Error', err);
//     });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}..`);
});
