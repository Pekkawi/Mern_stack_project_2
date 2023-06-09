import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();
import { UserModel } from "../models/Users.js";

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (user) {
    return res.json({ message: "User already exists!!" });
  }
  const hashedPassword = await bcrypt.hash(password, 10); //influneces hashing process 10 is default
  const newUser = new UserModel({ username, password: hashedPassword }); // you will return username and hashedpassword
  await newUser.save();
  res.json({ message: "user registered sucesfully" });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await UserModel.findOne({ username });

  if (!user) {
    return res.json({ message: "This dood doesn't exist!" });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password); //(password you wanna compare, original password)

  if (!isPasswordValid) {
    return res.json({ message: "Wrong password FOOL" });
  }

  const token = jwt.sign({ id: user._id }, "secret"); //you can assign data  LATER USER ENV VARIABLE INSTEAD OF "secret"
  res.json({ token, userID: user._id });
});

export { router as userRouter };

export const verifyToken = (req, res, next) => {
  //MIDDLEWARE
  const token = req.headers.authorization;

  if (token) {
    if (token) {
      jwt.verify(token, "secret", (err) => {
        if (err) {
          return res.sendStatus(403); //status quote | user not authorized
        }
        next();
      }); //verify if the token is true
    } else {
      res.sendStatus(401); //user not logged in aka no token
      //if you don't send a token from the front end it will return an error
    }
  }
};
