const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {
  encryptPassword,
  comparePassword,
  signToken,
  verifyToken,
} = require("../helpers/helper");

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    validate: [
      {
        validator: function (value) {
          return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
        },
        msg: "Invalid email format",
      },
      {
        validator: function (value) {
          return User.findOne({ email: value, _id: { $ne: this._id } })
            .then((user) => {
              if (user) {
                return false;
              }
            })
            .catch((err) => {
              throw Error("Error validating email");
            });
        },
        msg: "Email already in use",
      },
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Phone number is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

userSchema.pre("save", function (next) {
  this.password = encryptPassword(this.password);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
