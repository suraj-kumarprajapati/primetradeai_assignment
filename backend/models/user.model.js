import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "first name can not be empty"],
      minlength: [3, "first name should be of atleast 3 characters"],
    },
    lastName: {
      type: String,
      required: [true, "last name can not be empty"],
      minlength: [3, "last name should be of atleast 3 chracters"],
    },
    email: {
      type: String,
      required: [true, "email field can not be empty"],
      unique: [true, "email must be unique"],
    },
    description : {
      type : String,
      default : "",
    },
    password: {
      type: String,
      required: [true, "password can not be empty"],
      minlength: [6, "password must be of atleast 6 characters"],
      select : false,
    },

  },
  { timestamps: true }
);




export default mongoose.model("User", userSchema);
