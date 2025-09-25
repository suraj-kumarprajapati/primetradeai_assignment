
import dotenv from "dotenv";
dotenv.config();


import express from "express";
import { FRONTEND_URL, PORT, PROJECT_NAME } from "./config/envConfig.js";
import { connectDB } from "./config/dbConfig.js";
import authRoute from "./routes/auth.routes.js";
import { errorDetector } from "./errors/globalErrorHandler.js";
import userRoute from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import taskRoute from "./routes/task.routes.js";
import cors from "cors";
import morgan from "morgan";




connectDB();
const app = express();





 
// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: FRONTEND_URL,
    credentials: true,  
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
}));


// Logging middleware
if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined')); 
} else {
    app.use(morgan('dev'));
}
 


app.get("/", (req, res) => {
    res.send("API is running... and project name is " + PROJECT_NAME);

});



app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/tasks", taskRoute);


// error detector middleware
app.use(errorDetector);


app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`);
})