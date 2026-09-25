// middlewares/errorHandler.js
export const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({ message: messages.join(", ") });
  }

  // Mongoose CastError (invalid ObjectId)
  if (err.name === "CastError") {
    return res
      .status(400)
      .json({ message: `Resource not found with id ${err.value}` });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
