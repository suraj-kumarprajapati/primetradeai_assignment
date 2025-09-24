

import { Router } from "express";
import { isUserAuthenticated } from "../middlewares/authMiddleware.js";
import { addTask, fetchCurrentUsersTasks, fetchTaskDetails, editTask, deleteTask } from "../controllers/task.controller.js";

const taskRoute = Router();


taskRoute.get("/:id", isUserAuthenticated, fetchTaskDetails);
taskRoute.get("", isUserAuthenticated, fetchCurrentUsersTasks);
taskRoute.post("", isUserAuthenticated, addTask);
taskRoute.put("/:id", isUserAuthenticated, editTask);
taskRoute.delete("/:id", isUserAuthenticated, deleteTask);

 
export default taskRoute;