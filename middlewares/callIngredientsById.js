const catchAsync = require("../utils/catchAsync");
const Stock = require("../models/stockModel");
const AppError = require("../utils/appError");

const callIngredientsById = catchAsync(async (req, res, next) => {
  let ingredientsIds = [];
  if (typeof req.body.ingredients === "string") {
      ingredientsIds = JSON.parse(req.body.ingredients)
  }
  
  if (ingredientsIds.length > 0) {
    const ingredients = await Stock.find({
      _id: { $in: ingredientsIds }
    }).select('-quantity -createdAt');      
    
    if (ingredientsIds.length !== ingredients.length) {
      return next(new AppError("One or more stock items were not found", 404));
    }
    req.body.ingredients = ingredients;
  }
  next();
})

module.exports = callIngredientsById;