const AppError = require('../utils/appErrors.js');

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.message}: ${err.value}.`;
  return new AppError();
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value} please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data.${errors.join(', ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid token. please login first again!', 401);
const handleJWTExpiredError = () =>
  new AppError('Your token has expired! please login again', 401);

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorPod = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Programming or other unknown error: don't leak error details
  } else {
    //1- log error
    console.error('Error', err);

    //2- send generic error message
    res.status(500).json({
      status: error,
      message: 'Something went wrong.',
    });
  }
};

module.exports = (err, req, res, next) => {
  //console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  res.status = err.status || 'error';

  if (process.env.NODE_ENV !== 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };

    if (err.name === 'CastError') err = handleCastErrorDB(err);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);
    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name == 'TokenExpiredError') error = handleJWTExpiredError();
    sendErrorPod(error, res);
  }
};
