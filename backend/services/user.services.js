import userModel from "../models/user.model.js";


export const createUser = async ({ email,password}) =>{
    if (!email || !password){
        throw new Error ('Email and Password required')
    }

    const hashPassword = await userModel.hashPassword(password)
    const user = await userModel.create({
        email,
        password:hashPassword
    })
    return user
}


export const getAllusers = async ({userId})=>{
    const users = await userModel.find({
        _id:{$ne:userId}

    })
    return users
}
