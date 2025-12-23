
const calculateCartTotalPrice = (req, res, next) => {
  const cart = req.body.cart;
  const order_totalPrice = cart.reduce((acc,cur)=> acc + cur.price,0)
  
  req.body.totalPrice = order_totalPrice;
  next();
};

module.exports = calculateCartTotalPrice;