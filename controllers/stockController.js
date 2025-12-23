const Stock = require("../models/stockModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllStock = catchAsync(async (req, res, next) => {
  const allStock = await Stock.find();

  res.status(200).json({
    status: "success",
    results:allStock.length,
    data: allStock,
  });
});

exports.createNewStockItem = catchAsync(async (req, res, next) => {
  const newStockItem = await Stock.create(req.body);

  res.status(201).json({
    status: "success",
    data: newStockItem
  });
});

exports.getStockItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const stockItem = await Stock.findById(id);

  if (!stockItem) {
    return next(new AppError("There is no stock item with that Id", 404));
  }

  res.status(200).json({
    status: "Success", 
    data:stockItem
  })
});

exports.updateStockItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const updatedStockItem = await Stock.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedStockItem) {
    return next(new AppError("There is no stock item with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: updatedStockItem,
  });
});

exports.deleteStockItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedStockItem = await Stock.findByIdAndDelete(id);

  if (!deletedStockItem) {
    return next(new AppError("There is no stock item with that Id", 404));    
  }

  res.status(204).json({
    status: "success",
    message:"Stock item was deleted successfully!",
    data: null
  })
})