class AppError extends Error{
  constructor(message,statusCode) {
    //new Error(message) === super(message) because we inherit from Error Class
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;