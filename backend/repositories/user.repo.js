
import userModel from "../models/user.model.js"

export const saveUser = async (userData) => {
    const user = await userModel.create(userData)
    return await findUser({email : user.email});
}

export const findUser = async (userDetails) => {
    return await userModel.findOne(userDetails).select("-password");
}

export const findUserByEmail = async (email) => {
    return await userModel.findOne({email : email}).select("+password");
}

export const findUserById = async (id) => {
    return await userModel.findById(id).select("-password");
}