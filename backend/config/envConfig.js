
// import all the env variables
import {config} from "dotenv";
config();

// server configurations
export const PORT = process.env.PORT ;

// db configurations
export const MONGO_URI = process.env.MONGO_URI;

// jwt configurations
export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// cookie configurations
export const COOKIE_EXPIRES_TIME = process.env.COOKIE_EXPIRES_TIME;

export const FRONTEND_URL = process.env.FRONTEND_URL;


export const PROJECT_NAME = process.env.PROJECT_NAME;