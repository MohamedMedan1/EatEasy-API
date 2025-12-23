const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  cart: [{
    name: {
      type: String,
      required: [true, "Please provide cart item name!"],
      minlength:[3,"Cart item name must be at least 3 charachters"],
    },
    price: {
      type: Number,
      requried:[true,"please provide item total price (price - discount)!"],
    },
    quantity: {
      type: Number,
      required: [true, "Please provide cart item quantity!"],
      min:[1,"Cart item quantity must be at least 1"],
    },
  }],
  tableNumber: {
    type: Number,
    required: [true, "Please provide a table number!"],
    min:[1,"Table number must be at least 1"],
  },
  totalPrice: {
    type: Number,
    required: [true, "Please provide total price of order!"],
    min:[0,"Total price of order must be at least 0"],
  },
  status: {
    type:String,
    enum: {
      values: ["prepared", "delivered", "cancelled"],
      message:"Order status can only be prepared, delivered, cancelled "
    },
    default:"prepared"
  },
  paymentMethod: {
    type: String,
    enum: {
      values: ["cash", "visa card"],
      message:"Payment method can only be cash or delivered"
    },
    required:[true,"Please provide order payment method"]
  },
  isPaid: {
    type:Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default:Date.now
  },
});

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;