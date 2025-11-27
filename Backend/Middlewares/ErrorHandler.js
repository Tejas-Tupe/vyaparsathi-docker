export const errorHandler = (err, req, res, next) => {
  
  if (process.env.NODE_ENV === "development") {
    console.error("Error Stack:", err.stack);
  }

  // Default status code and message
  const statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle common / known error types
  if (err.name === "ValidationError") {
    message = "Invalid data input";
  } else if (err.name === "JsonWebTokenError") {
    message = "Invalid authentication token";
  } else if (err.name === "TokenExpiredError") {
    message = "Authentication token expired";
  } else if (err.code === 11000) {
    message = "Duplicate field value entered";
  }

  // Send safe response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};  
