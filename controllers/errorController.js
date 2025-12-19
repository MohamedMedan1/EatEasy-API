const AppError = require("../utils/appError");
const handleDevErrors = (error, res) => {
  const { statusCode, status, message } = error; 
  res.status(statusCode).json({
    status,
    message,
    stack:error.stack,
  })
  
}

const handleProdErrors = (error,res) => {
  if (error.isOperational) {
    const { statusCode, status, message } = error; 
    res.status(statusCode).json({
      status,
      message
    })    
  } else {
    res.status(500).json({
      status:"error",
      message:"Something went very wrong, Please try again later!"
    })
  }
}

const handleDuplicationKeyError = (err) => {
  const duplicatedFields = Object.keys(err.keyPattern);
  const messages = duplicatedFields.map(
    (curField) =>
      `Duplicate ${curField} value entered. Please use another value.`
  );
  return new AppError(messages.join(" "), 400);
};

const handleValidationError = (err) => {
  const failedFields = Object.keys(err.errors);
  const messages = failedFields.map((curField) => err.errors[curField].message);
  return new AppError(messages.join(" , "), 400);
};

const handleCastError = (err) => new AppError(`Invalid ID : ${err.value}`, 400);

const handleTokenValidationError = () => new AppError("Invalid Token", 401);

const handleTokenExpiredError = () =>
  new AppError("Token was expired please, log in", 401);

module.exports = (err, req, res, next) => {
  err.status = err.status || "error";
  err.statusCode = err.statusCode || 500;


  if (err.code === 11000) err = handleDuplicationKeyError(err);
  if (err.name === "ValidationError") err = handleValidationError(err);
  if (err.name === "CastError") err = handleCastError(err);
  if (err.name === "JsonWebTokenError") err = handleTokenValidationError();
  if (err.name === "TokenExpiredError") err = handleTokenExpiredError();

  if (process.env.NODE_ENV === "development") {
    handleDevErrors(err,res);
  }
  else if(process.env.NODE_ENV === "production") {
    handleProdErrors(err,res);
  }
}