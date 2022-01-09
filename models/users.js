const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      maxlength: 50,
      minlength: 3,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Please provide email"],
      index: true,
    },
    picture: {
      type: String,
      default: null,
    },
    uid: {
      type: String,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    cart: {
      type: Array,
      default: [],
    },
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
