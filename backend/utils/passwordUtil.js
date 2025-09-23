
import {hash, compare} from "bcryptjs"

// hash the password
export const encrypt = async (password) => {
    return await hash(password, 10);
}


// compare password
export const matchPassword = async (password, hashedPassword) => {
    return await compare(password, hashedPassword)
}