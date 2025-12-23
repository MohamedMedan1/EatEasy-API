const mongoose = require("mongoose");

const tablesSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true,"Please provide a table number"],
    min: [1, "Table number must be at least 1"],
    unique: true,
  },
  capacity: {
    type: Number,
    required:[true,"Please provide table capacity"],
    min: [1,"Table capacity must be at least 1"],
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

const Tables = mongoose.model("Tables", tablesSchema);
module.exports = Tables;