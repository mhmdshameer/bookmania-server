import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password, profile } = req.body;
  const secret = process.env.SECRET_STRING;

  try {
    const existUser = await User.findOne({ username });

    if (existUser)
      return (
        res.json({ message: "User already exist." }),
        console.log("User already exist", existUser)
      );

    const hashedPassword = await bcrypt.hash(password, 12);
    console.log(hashedPassword);

    const result = await User.create({
      username,
      email,
      profile,
      password: hashedPassword,
    });
    console.log("User created:", result);

    const token = jwt.sign(
      { username: result.username, id: result._id.toString() },
      secret,
      { expiresIn: "2hr" }
    );

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log("error in the finals:", error);
    res.status(500).json({ message: "Something went wrong in the sign up" });
  }
};

export const signin = async (req,res) => {
 const {email, password} = req.body;
 console.log("req",req.body)

 try {
  const existUser = await User.findOne({email});

 if(!existUser) return( res.status(404).json({message:"User doesn't exist."}) , console.log("User doesn't exist."))

  const isCorrectPassword = await bcrypt.compare(password,existUser.password);

  if(!isCorrectPassword) return (res.status(404).json({message: "Incorrect password."}), console.log("User doesn't exist."));

  const token = jwt.sign(
    {email: existUser.email,id: existUser._id},
    process.env.SECRET_STRING,
    {expiresIn: "2hr"} 
  )
  console.log("token:",token)
  res.status(200).json({result: existUser,token});
  console.log("token sent")
 } catch (error) {
   console.log("the error is:",error)
  res.status(500).json({message:"Something went wrong in signin"});
 }
 
}

export const getUsers = async (req,res) => {
  console.log("reached")
  try {
      const users = await User.find()
      console.log("Got users");
      res.status(200).json(users)        
  } catch (error) {
      console.log("getPosts:",error)
      res.status(400).json(error.message);
  }
}
