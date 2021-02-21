const createError = require('../utils/createError');
const { StatusCodes } = require('http-status-codes');

module.exports = function(req, res, next) {
  // Check for header and see if the authorization header is present.
  // If not present terminate the request and send BAD_REQUEST status back to browser.

  // If present, verify the token and see extract out user identification information here.
  // Once we have the info save it in req.user or else send UNAUTHORIZED status back to browser.
  if (!req.get('Authorization')) next(createError(StatusCodes.UNAUTHORIZED, "No authorization token found"))


  next();
}
