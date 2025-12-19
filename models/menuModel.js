const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide item name!"],
    minlength: [3, "Menu item name should be at least 3 characters"],
  },
  price: {
    type: Number,
    required: [true, "Please provide item price!"],
  },
  discount: {
    type: Number,
    default: 0,
    validate: {
      validator: function (value) {
        if (this.price) {
          return value <= this.price;
        }
        return true;
      },
      message: "Discount price should be less than or equal the item price!",
    },
  },
  totalPrice: {
    type: Number,
  },
  image: {
    type: String,
    required: [true, "Please provide menu item image!"],
  },
  ingredients: {
    ar: [{
      name: {
        type: String,
        required: [true, "Please provide Arabic ingredients"],
      },
      emoji: {
        type: String,
        required: [true, "Please provide ingredient emoji!"],
      },
    }],
    en: [{
      name: {
        type: String,
        required: [true, "Please provide English ingredients"],
      },
      emoji: {
        type: String,
        required: [true, "Please provide ingredient emoji!"],
      },
    }],
  },
  isSoldout: {
    type: Boolean,
    default: false,
  },
  size: {
    type: [String],
    required: [true, "Please provide menu item size"],
    enum: {
      values: ["sm", "m", "lg", "xl"],
      message: "Item size can be only (sm, m, lg, xl)",
    },
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

const menuModel = mongoose.model("Menu", menuSchema);
module.exports = menuModel;
