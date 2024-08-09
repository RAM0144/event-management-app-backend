import express from "express";
import { Mehndi } from "../DB-Utils/models.js";
import jwt from "jsonwebtoken";

const mehndiRouter = express.Router();

// 1.Get all Event 
mehndiRouter.get("/", async (req, res) => {
    try {
        const events = await Mehndi.find({}, { _id: 0 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get all the products of a particular seller irrespective of availability
mehndiRouter.get("/seller/:sellerId", async (req, res) => {
    try {
        const events = await Mehndi.find({
            "sellerInfo.userId": req.params.sellerId,
        });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//3.Create a Events 
mehndiRouter.post("/", async (req, res) => {
    try {
        const userInfo = jwt.verify(
            req.headers["authorization"],
            process.env.JWT_SECRET
        );

        if (userInfo.userType === "seller") {
            const eventBody = {
                ...req.body,
                sellerInfo: {
                    ...userInfo,
                },
            };

            const newEvent = new Mehndi(eventBody);
            const savedEvent = await newEvent.save();
            res.status(201).json(savedEvent);
        } else {
            res.status(400).json({ msg: "Only a seller can do the action" });
        }

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

//3.Update an existing event
mehndiRouter.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Mehndi.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedEvent) {
            return res.status(404).json({ error: "Event Not Found" });
        }
        res.json(updatedEvent);
    } catch (error) {
        res.status(400).json({ error: err.message });
    }
});

//4.Delete an existing event
mehndiRouter.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Mehndi.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event Not Found" });
        }
        res.json({ message: "Event Delete Successfully" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});
export default mehndiRouter;
