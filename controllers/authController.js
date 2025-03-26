const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appErrors');
const sendEmail = require('./../utils/email');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    status: 'success',
    data: {
      users,
    },
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(500).json({
    status: 'error',
    message: 'this route is not defined yet',
  });
});

exports.signup = catchAsync(async (req, res) => {
  const newUser = await User.create(req.body);

  const token = signToken(newUser._id);

  res.status(201).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  //1- check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  //2- check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }
  //3- if everything is ok, send token to client
  const token = signToken(user._id);
  res.status(200).json({
    status: 'success',
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  //1 getting token and check of it's there
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith('Bearer ')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  console.log('token: ' + token);
  if (!token) {
    return next(new AppError('You are not logged in! Please log in', 401));
  }

  //2 verification of token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //3 check if the user still exist
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token user does no longer exist',
        401
      )
    );
  }

  //4 check if user changed password after the token was issued
  if (currentUser.changesPasswordAfter(decode, int)) {
    return next(
      new AppError('User recently changed password! please login again', 401)
    );
  }

  // grant access to protected route
  req.user = currentUser;
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user'
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1- get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('there is no user with this email address'), 404);
  }
  //2- generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //3- send it to user's email
  const resetURL = `${req.protocol}://${req.get('host')}/api/v1/users/resetpassword/${resetToken}`;

  const message = `Forgot your password? submit a patch with your new password and password confirm
  to: ${resetURL}.\nIf you didn't forget your password, please ignore this email`;

  try{
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token is valid for 10 min',
      message
    })
  
    res.status(200).json({
      status: 'success',
      message: 'Token sent to email'
    });
  }catch(err){
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({validateBeforeSave: false});

    return next(new AppError('There is an error sending the email. Try again later'), 500);
  }
  
});

exports.ResetPassword = (req, res, next) => {};
