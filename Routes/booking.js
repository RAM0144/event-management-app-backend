import express from "express";
import { v4 } from "uuid";
import { Booking } from "../DB-Utils/models.js";
import jwt from "jsonwebtoken";

const bookingRouter = express.Router();

bookingRouter.post("/booking-events", async (req, res) => {
    const token = req.headers["authorization"];
    try {
        const id = v4();
        const {bookings, bookingTotal} = req.body;
        const user = jwt.verify(token, process.env.JWT_SECRET);
        const body = {
            userId: user.userId,
            bookings,
            bookingTotal,
            bookingId: id,
            bookingTotal: bookings.reduce((p, c) => p + c.price,0),
        };
        const booking = new Booking(body);
        await booking.save();
        res.json({ msg: `BookingNo: ${id}Booking Successfully!!`,bookingNo: id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

export default bookingRouter;