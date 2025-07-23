const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
    //1- get tour data from collection
    const tours = await Tour.find();


    //2- build template
    //3- render template with tour data

    res.status(200).render('overview' , {
        title: 'All Tours',
        tours
    });
});

exports.getTour = catchAsync( async(req, res, next) => {
    //1- get the data for the requested tour including reviews and tours
    const tour = await Tour.findOne({slug: req.params.slug}).populate({
        path: 'reviews',
        fields: 'review rating user'
    })
    //2- build template

    //3- render the template using data form1 
    res.status(200).render('tour' , {
        title: `${tour.name} Tour`,
        tour
    });

    next();
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
    
    res.status(200).render('login', {
        title: 'Login into your acount',
    })
})
