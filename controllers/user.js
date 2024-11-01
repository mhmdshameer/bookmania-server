import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

dotenv.config();

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
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
      password: hashedPassword,
    });
    console.log("User created:", result);


    const token = jwt.sign(
      { username: result.username, id: result._id.toString() },
      secret,
      { expiresIn: "2hr" }
    );

    console.log(token);

    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log("error in the finals:", error);
    res.status(500).json({ message: "Something went wrong in the sign up" });
  }
};
