import {
  findUser,
  findUserByEmail,
  saveUser,
} from "../repositories/user.repo.js";
import {
  AuthenticationFailedError,
  InvalidInputError,
} from "../errors/customErrors.js";
import { encrypt, matchPassword } from "../utils/passwordUtil.js";
import jwt from "jsonwebtoken";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  COOKIE_EXPIRES_TIME,
} from "../config/envConfig.js";
import {catchAsyncErrors} from "../errors/globalErrorHandler.js";




// register user controller
export const registerUser = catchAsyncErrors(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  // if any of this is absent
  if (!firstName || !lastName || !email || !password) {
    throw new InvalidInputError("All starred fields are compulsory");
  }

  // before saving the user, encrypt the password
  const encryptedPassword = await encrypt(password);

  // save user in the db
  const savedUser = await saveUser({
    firstName,
    lastName,
    email,
    password: encryptedPassword,
  });

  // send response
  res.status(201).json({
    message: "user registered successfully",
    data: savedUser,
  });
});

// login user controller
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // if email and password is not present
  if (!email || !password) {
    throw new InvalidInputError("Both email and password are required");
  }

  const dbUser = await findUserByEmail(email);

  if (!dbUser) {
    throw new AuthenticationFailedError("Invalid email or password");
  }

  const doesPasswordMatch = await matchPassword(password, dbUser.password);

  if (!doesPasswordMatch) {
    throw new AuthenticationFailedError("Invalid email or password");
  }

  // generate jwt token
  const token = jwt.sign({ _id: dbUser?._id }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

  // save this token as httpOnly cookie
  res.cookie("authToken", token, {
    httpOnly: true,
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
  });

  // send user data without password
  const user = await findUser({ email });

  res.status(200).json({
    message: "user login successfull",
    data: user,
  });
});





export const logout = catchAsyncErrors(

    (req, res, next) => {

        res.cookie("authToken", null, {
            expires : new Date(Date.now()),
            httpOnly : true,
        });
        
        res.status(200).json({
            message : "Logged Out successfully",
            data : null,
        });
    }
    
);