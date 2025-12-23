const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema({
  name: {
    ar: {
      type: String,
      required: [true,"Please provide arabic stock name"],
      minlength: [2, "Stock name must be at least 3 characters"],
      unique:true,
    },
    en: {
      type: String,
      required: [true,"Please provide arabic stock name"],
      minlength: [2, "Stock name must be at least 3 characters"],
      unique:true,
    }
  },
  emoji: {
    type: String,
    required:[true,"Please provide stock item emoji"],
  },
  quantity: {
    type: Number,
    required: [true, "Please provide stock item quantity!"],
    min:[1,"Stock item quantity must be at least 1"]
  },
  createdAt: {
    type: Date,
    default:Date.now,
  }
});

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;