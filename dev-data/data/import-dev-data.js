const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../../src/models/tourModel');
const User = require('../../src/models/userModel');
const Review = require('../../src/models/reviewModel');


dotenv.config({ path: './config.env' });

const DB = process.env.MONGO;

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        // useCreateIndex: true,
        // useFindAndModify: false
    })
    .then(con => {
        console.log(con.connection);
        console.log('DB connection successful');
    })
    .catch(err => {
        console.error('Database connection error:', err)
    });

//read JSON file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'));
const users = JSON.parse(fs.readFileSync(`${__dirname}/users-simple.json`, 'utf-8'));
const reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews-simple.json`, 'utf-8'));

//import data intoDB
const importData = async () => {
    try {
        await Tour.create(tours);
        await User.create(users, { validateBeforeSave: false });
        await Review.create(reviews);
        cosole.log('data sucessfuly loaded');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

//delete all data from collection
const deleteData = async () => {
    try {
        await Tour.deleteMany();
        await User.deleteMany();
        await Review.deleteMany();
        cosole.log('data sucessfuly deleted');
    } catch (err) {
        console.log(err);
    }
    process.exit();
};

if (process.argv[2] === '--import') {
    importData()
} else if (process.argv[2] === '--delete') {
    deleteData()
}
