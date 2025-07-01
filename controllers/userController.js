const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.find();
    console.log(typeof users);
    res.status(200).json({
        results: users.length,
        data: {
            users
        }
    });
});

exports.createUser = ((req, res) => {
    res.status(500).json({
        status: 'error ',
        message: 'This route is not yet defined'
    });
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });
    res.status(200).json({
    });

    exports.getUser = ((req, res) => {
        res.status(500).json({
            status: 'error ',
            message: 'This route is not yet defined'
        });
    });

    exports.updateUser = ((req, res) => {
        res.status(500).json({
            status: 'error ',
            message: 'This route is not yet defined'
        });
    });

    exports.deleteUser = ((req, res) => {
        res.status(500).json({
            status: 'error ',
            message: 'This route is not yet defined'
        });
    });