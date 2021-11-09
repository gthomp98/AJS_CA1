//This is the error handler, it is very basic and contains a few error statuses for various query issues.

function errorHandler(err, req, res, next) {
  //this states if there is an error with a string entered it will be returned as a bad request, as will a validation error
  if (typeof err === "string") {
    return res.status(400).json({ message: err });
  }
  if (typeof err === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }
  //If there is an unauthorized error then there will be a forbidden error return
  if (typeof err === "UnauthorizedError") {
    return res.status(401).json({ message: err.message });
  }
  //if something else an error 500 is returned which is an internal server error
  return res.status(500).json({ message: err.message });
}
//this exports this function so that other files can use it
module.exports = {
  errorHandler,
};
