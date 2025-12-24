const catchAsync = require("../utils/catchAsync");
const Orders = require("../models/orderModel");
const AppError = require("../utils/appError");

exports.getAllOrders = catchAsync(async (req, res, next) => {
  const allOrders = await Orders.find();

  res.status(200).json({
    status: "success",
    results: allOrders.length,
    data:allOrders,
  })
});

exports.createNewOrder = catchAsync(async (req, res, next) => {
  const newOrder = await Orders.create(req.body);
  res.status(201).json({
    status: "success",
    data: newOrder,
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const order = await Orders.findById(id);

  if (!order) {
    return next(new AppError("There is no order with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: order,
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedOrder = await Orders.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true
  });

  if (!updatedOrder) {
    return next(new AppError("There is no order with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedOrder
  });
});

exports.deleteOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedOrder = await Orders.findByIdAndDelete(id);

  if (!deletedOrder) {
    return next(new AppError("There is no order with that Id", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Order was deleted successfully!",
    data: null,
  });
});