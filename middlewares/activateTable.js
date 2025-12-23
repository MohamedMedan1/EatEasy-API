const Tables = require("../models/tablesModel");
const catchAsync = require("../utils/catchAsync");

const activateTable = catchAsync(async (req, res, next) => {
  const tableId = req.body?.tableId;
  if (tableId) {
    await Tables.findByIdAndUpdate(tableId, { isActive: true })
  }
  next();
});

module.exports = activateTable;