const Menu = require("../models/menuModel");
const Stock = require("../models/stockModel");
const catchAsync = require("../utils/catchAsync");

const decreaseStockAfterOrder = catchAsync(async (req, res, next) => {
  const cart = req.body?.cart ?? [];
  if (cart.length === 0) return next();

  const itemQuantityMap = new Map();
  for (let i = 0; i < cart.length; i++){
    if (itemQuantityMap.has(cart[i].id)) {
      const preQuantity = Number(itemQuantityMap.get(cart[i].id));  
      itemQuantityMap.set(cart[i].id, preQuantity + cart[i].quantity)        
    }
    else {
      itemQuantityMap.set(cart[i].id, cart[i].quantity)       
    }  
  }
  
  const orderItemsIds = [...itemQuantityMap.keys()];
  const menuItems = await Menu.find({ _id: { $in: orderItemsIds } }).select('ingredients');
  
  const bulkOperations = [];
  menuItems.forEach(menuItem => {
    const quantityOrdered = itemQuantityMap.get(String(menuItem._id));

    menuItem.ingredients.forEach(ingredient => {
      bulkOperations.push({
        updateOne: {
          filter: { _id: ingredient._id },
          update: { $inc: { quantity: -quantityOrdered } }
        }
      });
    });
  });

  if (bulkOperations.length > 0) {
    await Stock.bulkWrite(bulkOperations);
  }      
  next();
});

module.exports = decreaseStockAfterOrder;