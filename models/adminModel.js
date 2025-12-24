const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide admin name!"],
    minlength: [2, "Admin name should be at least 2 characters"],
    maxlength: [30, "Admin name should be at most 30 characters"]
  },
  email: {
    type: String,
    required: [true, "Please provide admin email!"],
    unique: true,
    validate: [validator.isEmail, "Please provide a valid email!"],
  },
  password: {
    type: String,
    required: [true, "Please provide admin name!"],
    minlength: [8, "Admin password should be at least 8 characters"],
    maxlength: [16, "Admin password should be at most 16 characters"],
    validate: [validator.isStrongPassword, "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special symbol."],
    select:false,
  },
  passwordConfirm: {
    type: String,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Password confirm should be equal to password"
    }
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  passwordChangedAt:Date
});

adminSchema.pre('save', async function () {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
});

adminSchema.pre('save', function () {
  if (this.isModified("password") && !this.isNew) {
    this.passwordChangedAt = Date.now() - 1000
  }
});

adminSchema.methods.isCorrectPassword = async function (candidatePassword, adminPassword) {
  return await bcrypt.compare(candidatePassword, adminPassword);
};

adminSchema.methods.isPasswordChangedAfterLogin = function (loginTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangedTimeStamp = parseInt(new Date(this.passwordChangedAt).getTime() / 1000);
    return passwordChangedTimeStamp > loginTimeStamp
  }
  return false;
}


const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;