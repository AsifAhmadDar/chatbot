import mongoose, { Schema } from "mongoose";
import { database } from "../data";

const UserSchema = new Schema({
  name: { type: String, required: [true, 'name not provided']},
  email: { type: String, required: [true, 'email not provided'],unique:true },
  role:{type:String,enum:['user','agent'],default:'user'},
  status:{type:Boolean,default:true}
}, { timestamps: true }).index({name:1,email:-1})

export const UserModel = database.model('user', UserSchema);
