const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      required: false,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      //regla a aplica en este campo   , mensaje de error en caso de no cumplir
      match: [/^\S+@\S+\.\S+$/,       'Please use a valid email address.'],
    },
    password: {
      type: String,
      required: true
    },
    // role:{
    //   type:String,
    //   enum:['Admin', 'User'],
    //   default: 'User'
    // },
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

const User = model("User", userSchema);

module.exports = User;