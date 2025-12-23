const calculateTotalPrice =(req, res, next) => {

  let itemPrices = req.body.prices;
  if (typeof req.body?.prices === "string") {
    itemPrices = JSON.parse(req.body.prices)
  }

  const discount = Number(req.body?.discount) ?? 0;
  const totalPrices = [];

  if (itemPrices.length > 0) {
    if (discount > 0) {
      for (let i = 0; i < itemPrices.length; i++){
        const totalPrice ={}
        totalPrice.price = itemPrices[i].price - Math.round((itemPrices[i].price * discount) / 100);
        totalPrice.size = itemPrices[i].size;
        totalPrices.push(totalPrice);
      }
      req.body.totalPrices = totalPrices;
    }
    else {
      req.body.totalPrices = itemPrices;
    }
  }
  next();
};

module.exports = calculateTotalPrice;
