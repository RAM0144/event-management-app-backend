import express from "express";
import { Makeup } from "../DB-Utils/models.js";
import jwt from "jsonwebtoken";

const makeupRouter = express.Router();

// 1.Get all Event 
makeupRouter.get("/", async (req, res) => {
    try {
        const events = await Makeup.find({}, { _id: 0 });
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});

// 2. Get all the products of a particular seller irrespective of availability
makeupRouter.get("/seller/:sellerId", async (req, res) => {
    try {
        const events = await Makeup.find({
            "sellerInfo.userId": req.params.sellerId,
        });
        res.json(events);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//3.Create a Events 
makeupRouter.post("/", async (req, res) => {
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

            const newEvent = new Makeup(eventBody);
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
makeupRouter.put("/:id", async (req, res) => {
    try {
        const updatedEvent = await Makeup.findByIdAndUpdate(
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
makeupRouter.delete("/:id", async (req, res) => {
    try {
        const deletedEvent = await Makeup.findByIdAndDelete(req.params.id);
        if (!deletedEvent) {
            return res.status(404).json({ error: "Event Not Found" });
        }
        res.json({ message: "Event Delete Successfully" });
    } catch (error) {
        res.status(500).json({ error: err.message });
    }
});
export default makeupRouter;
