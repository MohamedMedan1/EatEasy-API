const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Admin = require("../models/adminModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const generateJWTAndSendResponse = (res,curAdmin) => {
  const token = jwt.sign({ id: curAdmin?._id },process.env.JWT_SECRET_KEY, {
    expiresIn:"90d"
  }) 

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", 
    sameSite: process.env.NODE_ENV === "production" ? "none":"lax",
  });

  res.status(200).json({
    status: "success",
    token,
    data: curAdmin,
  });
  
} 

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError("Please enter your email and password",400));
  }

  const curAdmin = await Admin.findOne({ email }).select("+password");
  if (!curAdmin || !(await curAdmin.isCorrectPassword(password,curAdmin?.password))) {
    return next(new AppError("Your email or password is incorrect!", 401));
  }
  generateJWTAndSendResponse(res, curAdmin);
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies?.jwt || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new AppError("You are not logged in! Please log in.", 401));
  }

  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
  
  const user = await Admin.findById(decode?.id); 
  if (!user) {
    return next(new AppError("There is no user with that Id", 404));
  }

  if (await user.isPasswordChangedAfterLogin(decode.iat)) {
    return next(
      new AppError("You changed password after login please, log in again", 401)
    );
  }

  req.user = user;
  next();
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { currentPassword, newPassword, newPasswordConfirm } = req.body;

  if (!currentPassword || !newPassword || !newPasswordConfirm) {
    return next(new AppError("Please provide your current password ,new one and confirm it to be able to change your password", 400)); 
  }

  const { _id } = req?.user;
  const curUser = await Admin.findById(_id).select("+password");

  if (!curUser) {
      return next(new AppError("There is no user with that Id", 404));
  }

  if (!(await curUser.isCorrectPassword(currentPassword, curUser?.password))) {
    return next(new AppError("Your current password is incorrect please, try again with the correct one!", 400));
  }

  curUser.password = newPassword;
  curUser.passwordConfirm = newPasswordConfirm;
  await curUser.save();

  curAdmin.password = undefined;

  generateJWTAndSendResponse(res, curUser);
});
