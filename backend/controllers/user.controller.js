import { catchAsyncErrors } from "../errors/globalErrorHandler.js";
import {findUserById } from "../repositories/user.repo.js";

export const fetchUserDetails = catchAsyncErrors(async (req, res, next) => {
  // extract current logged in user from the req object
  const { currentUser } = req;

  const user = await findUserById(currentUser?._id);

  res.status(200).json({
    message: "user details fetched successfully",
    data: user,
  });
});



