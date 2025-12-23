const Tables = require("../models/tablesModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.getAllTables = catchAsync(async (req, res, next) => {
  const allTables = await Tables.find();

  res.status(200).json({
    status: "success",
    results: allTables.length,
    data: allTables,
  });
});

exports.createNewTable = catchAsync(async (req, res, next) => {
  const newTable = await Tables.create(req.body);

  res.status(201).json({
    status: "success",
    data: newTable
  });
});

exports.getTable = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const table = await Tables.findById(id);

  if (!table) {
    return next(new AppError("There is no table with that Id", 404));
  }

  res.status(200).json({
    status: "success",
    data: table
  });
});

exports.updateTable = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  
  const updatedTable = await Tables.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!updatedTable) {
    return next(new AppError("There is no table with that Id", 404));
  }

  res.status(200).json({
    status: "Success",
    data: updatedTable
  });
});

exports.deleteTable = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const deletedTable = await Tables.findByIdAndDelete(id);

  if (!deletedTable) {
    return next(new AppError("There is no table with that Id", 404));
  }

  res.status(204).json({
    status: "success",
    message: "Table deleted successfully",
    data: null
  });
})