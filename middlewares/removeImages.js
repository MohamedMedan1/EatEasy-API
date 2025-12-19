const Menu = require('../models/menuModel');
const cloudinary = require('../config/cloudinary');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

const deleteMenuItemImage = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const menuItem = await Menu.findById(id);

  if (!menuItem) {
    return next(new AppError("There is no menu item with that Id", 404));
  }
  const l_IndexOfURL = menuItem?.image.split("/").length - 1; 
  const imageId = `eatEasy/menu/${menuItem?.image.split("/")[l_IndexOfURL].split(".")[0]}`

  const result = await cloudinary.uploader.destroy(imageId);
  next();
});

module.exports = deleteMenuItemImage;
