import { InvalidResourceError, UnAuthorizedError } from "../errors/customErrors.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/envConfig.js";
import { findUserById } from "../repositories/user.repo.js";
import { catchAsyncErrors } from "../errors/globalErrorHandler.js";


// it checks if the user is authenticated or not
export const isUserAuthenticated = catchAsyncErrors(

    async (req, res, next) => {

        // get the login token
        const { authToken } = req.cookies;
    
        // if token is not present, user is unauthorised
        if(!authToken) {
            throw new UnAuthorizedError("Login first to access this resource"); 
        }
    
        // if token is present then verify it it is valid or not
        const decodedTokenValue = jwt.verify(authToken, JWT_SECRET)
    
        // extract user id from the decodedTokenValue
        const id = decodedTokenValue?._id;
    
        // find the user based on the id
        const user = await findUserById(id);

        if(!user) {
            throw new InvalidResourceError("invalid user");
        }
        
        // set this user in the req object
        req.currentUser = user;
    
        // go to the next function
        next();
    }
)


