import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connection successfull");
  } catch (err) {
    console.log(err);
  }
}

connectDB();

app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use("/user", userRoutes);
app.use("/posts", postRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
