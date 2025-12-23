const catchAsync = require("../utils/catchAsync");
const Menu = require("../models/menuModel");

const getCartFromMenu = catchAsync(async (req, res, next) => {
  const items = req.body?.items ?? [];
  const cart = [];

  if (items.length > 0) {    
    const itemsIds = items.map(cur => cur.itemId);
    const menuItems = await Menu.find({ _id: { $in: itemsIds } }).select('name totalPrices');
    
    const totalPricesMap = new Map();
    const nameSizesMap = new Map();

    for (let i = 0; i < items.length; i++){
      const orderItem = menuItems.filter(cur => String(cur._id) === items[i].itemId)[0];
      nameSizesMap.set(`${orderItem._id}-${orderItem?.name}-${items[i].size}`, `${items[i].quantity}`);
    }

    nameSizesMap.forEach((value, key) => {
      const [id, name, size] = key.split('-');

      const curItem = menuItems.filter(cur => String(cur._id) === id)[0]
      for (let i = 0; i < curItem?.totalPrices.length; i++){
        totalPricesMap.set(curItem.totalPrices[i].size, curItem.totalPrices[i].price);
      }

      const pricePerOne = totalPricesMap.get(size); 
      const cartItem = {id,name, size, quantity: Number(value), price: pricePerOne * value };
      cart.push(cartItem)
    });

    delete req.body.items;
    req.body.cart = cart;
  }
  next();
});

module.exports = getCartFromMenu;