const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide item name!"],
    minlength: [3, "Menu item name should be at least 3 characters"],
  },
  prices: [
    {
      price: {
        type: Number,
        required: [true, "Please provide item price!"],
      },
      size: {
        type: String,
        required: [true, "Please provide item size!"],
      },
    },
  ],
  discount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        return value <=100;
      },
      message: "Discount price should be less than or equal 100%",
    },
  },
  totalPrices: [
    {
      price: {
        type: Number,
        required: [true, "Please provide item price!"],
      },
      size: {
        type: String,
        required: [true, "Please provide item size!"],
      },
    },
  ],
  image: {
    type: String,
    required: [true, "Please provide menu item image!"],
  },
  category: {
    type: String,
    required: [true, "Please provide menu item category"],
    minlength:[4,"Menu item category must be at least 4 characters"],
    maxlength:[12,"Menu item category must be at most 12 characters"],
  },
  ingredients: [
    {
      name: {
        ar: {
          type: String,
          required: [true, "Please provide Arabic ingredients"],
        },
        en: {
          type: String,
          required: [true, "Please provide English ingredients"],
        },
      },
      emoji: {
        type: String,
        required: [true, "Please provide ingredient emoji!"],
      },
    },
  ],
  isSoldout: {
    type: Boolean,
    default: false,
  },
  sizes: {
    type: [String],
    enum: {
      values: ["regular","small", "medium", "large", "x large"],
      message: "Item size can be only (regular,small, medium, large, x large)",
    },
    default:["regular"],
    validate: {
      validator: function (value) {
        return value.length > 0;
      },
      message: "Please provide item sizes",
    },
  },
  isSpicy: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: [0, "Rating value should be at least 0"],
    max: [5, "Rating value should be at most 5"],
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Menu = mongoose.model("Menu", menuSchema);
module.exports = Menu;
