import {
  InvalidResourceError,
  UnAuthorizedError,
  ValidationError,
} from "./customErrors.js";

export const catchAsyncErrors = (controllerFunction) => {
  return (req, res, next) => {
    Promise.resolve(controllerFunction(req, res, next)).catch(next);
  };
};

export const errorDetector = (err, req, res, next) => {
  let error = {
    statusCode: err?.statusCode || 500,
    message: err?.message || "Internal Server Error",
  };


  // handle the validationError
  if (err.name === "ValidationError") {
    // receiving multiple validation erros in the form of array
    const validatorErrors = Object.values(err.errors);

    // array
    const messages = validatorErrors.map((val) => val.message);

    const message = messages.join(", "); // message will be passed as a string

    error = new ValidationError(message, 400);
  }

  // handle the invalid mongoose id error
  if (err.name === "CastError") {
    const message = `Resource not found! Invalid ${err.path} `;
    error = new InvalidResourceError(message, 404);
  }

  // Handle Mongoose Duplicate Key Error
  if (err?.cause?.code === 11000) {
    const message = `Duplicate ${Object.keys(err.cause.keyValue)} entered.`;
    error = new ValidationError(message);
  }

  // Handle wrong JWT Error
  if (err.name === "JsonWebTokenError") {
    const message = `JSON Web Token is invalid. Try Again!!!`;
    error = new UnAuthorizedError(message);
  }

  // Handle expired JWT Error
  if (err.name === "TokenExpiredError") {
    const message = `JSON Web Token is expired. Try Again!!!`;
    error = new UnAuthorizedError(message);
  }

  res.status(error.statusCode).json({
    message: error.message,
    error: err,
    stack: err?.stack,
  });
};



