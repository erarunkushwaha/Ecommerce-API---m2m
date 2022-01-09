const CustomError = require("../errors");
const admin = require("../firebase/index");
const { StatusCodes } = require("http-status-codes");
const User = require("../models/users");

const auth = async (req, res, next) => {
  try {
    const firebaseAdmin = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken);
    req.user = firebaseAdmin;

    next();
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      err: "Invalid token",
    });
  }
  // const token = req.signedCookies.token;
  // if (!token) {
  //   throw new CustomError.UnauthenticatedError("Authentication invalid");
  // }

  // try {
  //   // const payload = isTokenValid(token);
  //   const { name, userId, role } = isTokenValid(token);
  //   // Attach the user and his permissions to the req object
  //   // req.user = payload.user;
  //   req.user = { name, userId, role };
  //   console.log(req.user);

  //   next();
  // } catch (error) {
  //   throw new CustomError.UnauthenticatedError("Authentication invalid");
  // }
};
// authorizePermissions
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    console.log(req.user);

    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};
const adminCkeck = async (req, res, next) => {
  const { email } = req.user;
  const user = await User.findOne({ email }).exec();
  if (user.role !== "admin") {
    throw new CustomError.UnauthorizedError(
      `You do not have permission to access this route`
    );
  }
  next();
};
module.exports = { auth, authorizeRoles, adminCkeck };
