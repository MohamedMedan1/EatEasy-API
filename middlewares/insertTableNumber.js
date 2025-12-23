const Tables = require("../models/tablesModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const insertTableNumber = catchAsync(async (req, res, next) => {
  const tableId = req.body?.tableId;

  if (!tableId) {
    return next(new AppError("Please provide a table-Id to complete order", 400));
  }

  const table = await Tables.findById(tableId);
  if (!table) {
    return next(new AppError("There is no table with that id",404))
  }
  
  delete req.body.tableId;
  req.body.tableNumber = table?.number;

  next();
});

module.exports = insertTableNumber;