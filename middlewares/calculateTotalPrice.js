const catchAsync = require("../utils/catchAsync");
const Menu = require("../models/menuModel");
const AppError = require("../utils/appError");

const calculateTotalPrice = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const menuItem = await Menu.findById(id);

  if (req.body.price !== undefined || req.body.discount !== undefined) {
    const price = Number(req.body?.price ?? (menuItem?.price || 0));
    const discount = Number(req.body?.discount ?? (menuItem?.discount || 0));

    if (price < discount) {
      return next(
        new AppError(
          `Item discount:${discount} should be less than or equal the item price:${price} `
        )
      );
    }

    req.body.totalPrice = price - discount;
  }
  next();
});

module.exports = calculateTotalPrice;
