


import { Router } from "express";
import { loginUser, logout, registerUser } from "../controllers/auth.controller.js";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";


const authRoute = Router();


authRoute.post("/register", registerUser); 
authRoute.post("/login", loginUser);
authRoute.get("/logout", isUserAuthenticated, logout);





export default authRoute; 