

import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { addTask, fetchCurrentUsersTasks, fetchTaskDetails } from "../controllers/task.controller.js";

const taskRoute = Router();


taskRoute.get("/:id", isUserAuthenticated, fetchTaskDetails);
taskRoute.get("", isUserAuthenticated, fetchCurrentUsersTasks);
taskRoute.post("", isUserAuthenticated, addTask);

 
export default taskRoute;