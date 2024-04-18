const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname:{
       type:String,
        required: true,
        trim: true,
    },
    lastname:{
      type: String,
       required: true,
       trim: true,
   },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ]
  })
);

module.exports = User;