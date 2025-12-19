const Menu = require("../models/menuModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllMenu = catchAsync(async (req, res, next) => {
  const menu = await Menu.find();
  res.status(200).json({
    results: menu.length,
    data: menu,
  });
});

exports.createMenuItem = catchAsync(async (req, res, next) => {
  const menuItem = await Menu.create({ ...req.body, image: req?.file?.path });
  res.status(201).json({
    data: menuItem,
  });
});

exports.getMenuItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const menuItem = await Menu.findById(id);

  if (!menuItem) {
    return next(new AppError("There is no menu Item with that Id", 404));
  }

  res.status(200).json({
    data: menuItem,
  });
});

exports.updateMenuItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedItem = await Menu.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    context: "query",
  });

  if (!updatedItem) {
    return next(new AppError("There is no menu Item with that Id", 404));
  }

  res.status(200).json({
    data: updatedItem,
  });
});

exports.deleteMenuItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedItem = await Menu.findByIdAndDelete(id);

  if (!deletedItem) {
    return next(new AppError("There is no menu item with that Id", 404));
  }

  res.status(204).json({
    message: "Menu item was deleted successfully!",
  });
});
