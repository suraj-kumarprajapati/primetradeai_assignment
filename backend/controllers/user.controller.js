import { InvalidResourceError } from "../errors/customErrors.js";
import { catchAsyncErrors } from "../errors/globalErrorHandler.js";
import {findUserById, updateUserById } from "../repositories/user.repo.js";

// get user details controller
export const fetchUserDetails = catchAsyncErrors(async (req, res, next) => {
  // extract current logged in user from the req object
  const { currentUser } = req;

  const user = await findUserById(currentUser?._id);

  res.status(200).json({
    message: "user details fetched successfully",
    data: user,
  });
});


// implement update user controller
export const updateUser = catchAsyncErrors(async (req, res, next) => {
  const { currentUser } = req;
  
  const userData = req.body;

  const user = await findUserById(currentUser?._id);

  if (!user) {
    throw new InvalidResourceError("User not found");
  }

  // update the user fields
  const updatedUser = await updateUserById(currentUser?._id, userData);

  res.status(200).json({
    message: "user updated successfully",
    data: updatedUser,
  });


});



