import { urlencoded } from "express";
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },
  price:{
    type:Number,
    required:true,
  },
  image:{
    url: {
      type: String,
      required: true,
    },
    public_id: {
      type: String,
      required: true,
    },
  },
});

export const Course = mongoose.model("Course", courseSchema); // Schema is converted into model