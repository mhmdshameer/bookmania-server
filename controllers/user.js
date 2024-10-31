import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req,res) => {
    const {username,email,password} = req.body;
    const secret= process.env.SECRET
    console.log(req.body);

    try {
        const existUser = await User.findOne({username});

        if(existUser) return res.status(404).json({message:"User already exist."});

        const hashedPassword = await bcrypt.hash(password,12);

        const result = await User.create({
            username,
            email,
            password: hashedPassword
        })

        const token = jwt.sign(
            {username: result.username, id: result._id},secret,{expiresIn: "2hr"}
        );

        res.status(200).json({result: result, token});


    } catch (error) {
        res.status(500).json({message: "Something went wrong in the sign up"})
    }
};

