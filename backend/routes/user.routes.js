

import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { fetchUserDetails } from "../controllers/user.controller.js";


const userRoute = Router();



userRoute.get("/profile", isUserAuthenticated, fetchUserDetails);



export default userRoute;