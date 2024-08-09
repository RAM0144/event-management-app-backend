import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../DB-Utils/models.js";


const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email }, { _id: 0, });

        if (!user) {
            return res.status(400).send({ msg: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send({ msg: "Invalid UserName or Password" });
        }

        const userObj = user.toObject();

        delete userObj.password;

        const authToken = jwt.sign(userObj, process.env.JWT_SECRET,
            { expiresIn: process.env.EXPIRY_TIME });

        res.status(200).json({ msg: "Login successful", userToken: authToken });

    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ msg: "Internal Server Error" });
    }
});

export default loginRouter;