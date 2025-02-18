const AppError = require('../utils/appError');


const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.message}: ${err.value}.`
  return new AppError()
};


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
      message: 'Something went wrong, please try again later.',
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


    let error = {...err};

    if(err.name === 'CastError') err = handleCastErrorDB(err);


    sendErrorPod(error, res);
  }
};
