import express from "express";
import bcrypt from "bcrypt";
import { User } from "../DB-Utils/models.js";
import { transporter, mailOption } from "../Mail-Utils/mail.js"

const registerRouter = express.Router();

registerRouter.post("/", async (req, res) => {
    try {
        const { name, phone, email, address, userType, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = Date.now().toString();

        const newUser = new User({
            name,
            userId,
            phone,
            email,
            address,
            userType,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).send({ msg: "User registered successfully!" });

        await transporter.sendMail({
            ...mailOption,
            to: [newUser.email],
        })

    } catch (error) {
        console.log("Error", error);
        res.status(500).send({ msg: "User already exists" });
    }
});

export default registerRouter;