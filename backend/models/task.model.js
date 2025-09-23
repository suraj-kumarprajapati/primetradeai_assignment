

import mongoose, { Mongoose } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "title is required"],
    },
    user : {
      type : mongoose.Schema.Types.ObjectId,
      ref : "User",
      required : true,
    },
    content: {
      type: String,
    },
    priority: {
      type : Number,
      default : 3, // 1 - high, 2 - medium, 3 - low
    },
    tags: [String], // Array of strings for tags
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
