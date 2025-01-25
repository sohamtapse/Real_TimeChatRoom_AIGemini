import userModel from '../models/user.model.js'
import * as userService from '../services/user.services.js';
import {validationResult} from 'express-validator'
import redisClient from '../services/redis.service.js';

export const createUserController = async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try{
        const user = await userService.createUser(req.body);
        const token = await user.generateJWT();
        delete user._doc.password;
        res.status(201).json({user,token});
    } catch(error){
        res.status(400).send(error.message)
    }
}


export const loginController = async (req,res) =>{

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try{
        const {email,password}=req.body;
        const user = await userModel.findOne({email}).select('+password')
        if(!user){
            return res.status(400).json({
                errors: 'Invalind credentials'
            })
        }

        const isMatch = await user.isValidPassword(password)

        if(!isMatch){
            return res.status(401).json({
                errors:'Invalid Credentials'
            })
        }

        const token = await user.generateJWT();
        delete user._doc.password;
        res.status(200).json({user,token})
    }catch(err){
        console.log(err)
        res.status(400).send(err.message)
    }
}


export const profileController =async (req,res) => {
    console.log(req.user)
    res.status(200).json({user:req.user})
}


export const logoutController = async (req, res) => {
    try {
        // Safely access the token from cookies or headers
        const token = req.cookies?.token || (req.headers.authorization?.split(' ')[1]);

        if (!token) {
            return res.status(400).json({
                error: "Token not found",
            });
        }

        // Blacklist the token in Redis
        await redisClient.set(token, 'logout', 'EX', 60 * 60 * 24); // Set expiration to 24 hours

        // Respond with a success message
        res.clearCookie('token'); // Optional: Clear the token cookie
        res.status(200).json({
            message: "Logged out successfully",
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({
            error: err.message,
        });
    }
};
