const Tour = require('../models/tourModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appErrors');

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

    if(!tour) {
        return next(new AppError(
            'There is no tour with that name.',
            404
        ))
    }
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

exports.getAccount = (req, res) => {
    res.status(200).render('account', {
        title: 'Your account',
    });
}

exports.updateUserData = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(
            req.user.id, {
            name: req.body.name,
            email: req.body.email
        },
        {
            new: true,
            runValidators: true
        }
    );
    res.status(200).render('account', {
        title: 'Your account',
        user: updateUser
    });
});