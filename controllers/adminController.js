const Admin = require("../models/adminModel");
const catchAsync = require("../utils/catchAsync");
const filterFields = require("../utils/filterFields");

exports.getAllAdmins = catchAsync(async (req, res, next) => {
  const allAdmins = await Admin.find();

  res.status(200).json({
    status: "success",
    results: allAdmins?.length,
    data: allAdmins
  });
});

exports.createNewAdmin = catchAsync(async (req, res, next) => {
  const newAdmin = await Admin.create(req.body);
  res.status(201).json({
    status: "success", 
    data: newAdmin,
  })
});


exports.getAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const admin = await Admin.findById(id);

  if (!admin) {
    return next(new AppError("There is no admin with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: admin,
  });
});

exports.updateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const filteredBody = { ...filterFields(['email', 'passwordConfirm', 'isActive', 'password'], req.body) };
  const updatedAdmin = await Admin.findByIdAndUpdate(id, filteredBody, {
    new:true,
    runValidators:true,
  });
  
  if (!updatedAdmin) {
    return next(new AppError("There is no admin with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedAdmin,
  });
});

exports.deactivateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deactivatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!deactivatedAdmin) {
    return next(new AppError("There is no admin with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data:deactivatedAdmin
  })
});

exports.activateAdmin = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const activatedAdmin = await Admin.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!activatedAdmin) {
    return next(new AppError("There is no admin with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data:activatedAdmin
  })
});

exports.getMe = (req, res, next) => {
  const user = req?.user ?? null;

  if (!user) {
    return next(new AppError("Your are not logged in please, go login", 401));
  }

  res.status(200).json({
    status: "success",
    data: user
  });
};