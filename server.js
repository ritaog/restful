import express, { application, json } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import crmRouter from "./routes/crmRouter.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

//connect database
connectDB();

app.use(json());

//routes
app.use("/api", crmRouter);

//Serving static files (images, movies, pdf)
//to see the image in  the broswer : localhost:5000/sky.jpeg
app.use(express.static("public/img"));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
