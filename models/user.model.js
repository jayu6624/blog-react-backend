import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    index: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  fullname: { 
    type: String, 
    required: true 
  },
  token:{
    type:String,
    default:''
  } // Add fullname field
});

export const User = mongoose.model("User", UserSchema);
