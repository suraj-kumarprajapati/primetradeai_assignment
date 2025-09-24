

import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { fetchUserDetails, updateUser } from "../controllers/user.controller.js";


const userRoute = Router();



userRoute.get("/profile", isUserAuthenticated, fetchUserDetails);
userRoute.put("/profile/update", isUserAuthenticated, updateUser);



export default userRoute;