const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'A tour must have a name'],
        unique: true,
        trim: true
    },
    durations: {
        type: Number,
        required: [true, 'A tour must have a durations']
    },
    maxGroupSize: {
        type: Number,
        required: [true, 'A tour must have a group size']
    },
    difficulty:{
        type: String,
        required: [true, 'A tour must have a diffuculity']
    },
    ratingsAverage:{
        type: Number,
        dafault: 4.5
    },
    ratingsQuantity:{
        type: Number,
        default: 0
    },
    price:{
        type: Number,
        require: [true, 'A tour must have a price']
    },
    priceDiscount: Number,
    summary:{
        type: String,
        trim: true 
    }
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;