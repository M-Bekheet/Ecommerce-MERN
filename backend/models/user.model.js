const mongoose = require("mongoose");
const validatoooor = require('validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minLength: 5,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (value) {
        if (!validatoooor.isEmail(value)) {
          return false
        }
      }
    }
  },
  password: {
    type: String,
    required: true,
    minLength: 8
  },
  isAdmin: {
    type: Boolean,
    default: false,
    required: true
  },
  isSeller: {
    type: Boolean,
    default: false,
    required: true
  }
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;