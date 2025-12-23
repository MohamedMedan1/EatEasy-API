const Menu = require("../models/menuModel");
const Stock = require("../models/stockModel");

const applySoldoutItems = catchAsync(async (req, res, next) => {
  const finishedStockIds = await Stock.find({ quantity: 0 }).select("_id"); //array of ids

if (finishedStock.length > 0) {
    await Menu.updateMany(
      { ingredients: { $in: finishedStockIds } },
      { $set: { isSoldout: true } }            
    );
  }
  
  next();
});

module.exports = applySoldoutItems;