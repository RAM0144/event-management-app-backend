import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectViaMongoose from "./DB-Utils/mongoose.js";
import registerRouter from "./Routes/register.js";
import loginRouter from "./Routes/login.js";
import jwt from "jsonwebtoken"
import eventRouter from "./Routes/event.js";
import bookingRouter from "./Routes/booking.js";
import paymentRouter from "./Routes/payment.js";
import photoRouter from "./Routes/photo.js";
import videoRouter from "./Routes/video.js";
import resortRouter from "./Routes/resort.js";
import hotelRouter from "./Routes/hotel.js";
import caterersRouter from "./Routes/caterers.js";
import mehndiRouter from "./Routes/mehndi.js";
import makeupRouter from "./Routes/makeup.js";
import jewelleryRouter from "./Routes/jewellery.js";


const server = express();

// Body Parsing the Middleware
server.use(express.json());

server.use(cors());

const loger = (req, res, next) => {
    console.log(new Date().toString(), req.url, req.method);
    next();
}

server.use(loger);

dotenv.config();

// connecting to db before server Starts
// Top level await

await connectViaMongoose();

server.use("/register", registerRouter);
server.use("/login", loginRouter);

//middleware
const tokenVerify = (req, res, next) => {
    const token = req.headers["authorization"];

    try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
    } catch (error) {
        res.status(401).json({ msg: error.message })
    }
}

server.use("/events", tokenVerify, eventRouter);
server.use("/resorts", tokenVerify, resortRouter);
server.use("/hotels", tokenVerify, hotelRouter);
server.use("/photos", tokenVerify, photoRouter);
server.use("/videos", tokenVerify, videoRouter);
server.use("/caterers", tokenVerify, caterersRouter);
server.use("/mehndi", tokenVerify, mehndiRouter);
server.use("/makeup", tokenVerify, makeupRouter);
server.use("/jewellery", tokenVerify, jewelleryRouter);
server.use("/booking", tokenVerify, bookingRouter);
server.use("/payment", tokenVerify, paymentRouter);


const port = 3100;

server.listen(port, () => {
    console.log(Date().toString(), `Server is running on http://localhost:${port}`)
});

