import express from "express"; // const express =require("express") SAME THING
//EXPRESS IS THE FRAMEWORK FOR THE API

import cors from "cors";
//SET RULES BETWEEN FRONTEND/BACKEND COMMUNICATION

import mongoose from "mongoose";
// WRITE QUERIES TO MONGODB
import { userRouter } from "./routes/user.js";
const app = express();

app.use(express.json()); // When you get data from the front end it will convert it into to json
//for every single request
app.use(cors());
app.use("/auth", userRouter); // all endpoints related to authentification will be in the users.js file

mongoose.connect(
  "mongodb+srv://eduard:Ichbincool123@receipt.1tlz94n.mongodb.net/"
);

app.listen(3001, () => {
  console.log("server started");
}); //application starts,specify port
